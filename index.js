/*************************** MODULI *****************************/

//#region 3rd party moduli
const express=require('express');
const fileUpload = require('express-fileupload');
const app = express();
const http = require('http').Server(app);
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const io = require('socket.io')(http);
//#endregion

//#region 1st party moduli by vajz esis
let moduli={};
fs.readdirSync(__dirname+'/nasi_moduli').forEach(function(file) {
    if(path.extname(file)=='.js'){
        moduli[path.basename(file, '.js')]=require("./nasi_moduli/" + file);
    }
});
//#endregion

//#region postavljanje porta servera
http.listen(8080, function(){
    console.log('Aktiviran API server na portu 8080');
  });
//#endregion

/************************** KONFIGURACIJA *********************/

//#region bodyParser konfiguracija
app.use( bodyParser.json({limit:1024102420}));
app.use(bodyParser.urlencoded({ 
  extended: true,
  limit:1024102420
}));
app.use(fileUpload());
//#endregion

//#region sprječavanje CORSA zarad dostupnosti iz SVIH uređaja = API
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});
//#endregion

/************************* ROUTING ****************************/

//#region root vraća shemu cijelog apija
app.all('/', function(req, res){
    let shema={};
	for(i in moduli){
        shema[i]=moduli[i]['get']();
    }
    res.json(shema);
});
//#endregion

//#region otvara module
app.all('/:api', function(req, res){
    let projekt=req.params.api;
    let parametri=req.body;
    let metoda=req.method.toLowerCase();
    if (moduli.hasOwnProperty(projekt)) {
        if(moduli[projekt].hasOwnProperty(metoda)){
            res.json(moduli[projekt][metoda](parametri));
        }else{
            res.json({"error":"2", "modul":projekt, "metoda":metoda});
        }
    }else{
        if(projekt=='modulisocketres481011'){
            res.json(moduli);
        }else{
            res.json({"error":"1"});
        }        
    }
});
//#endregion


/************************** DOKUMENTACIJA **********************/
/**************************
 * A) ROUTING:
 * 1. bilo koji request na root vraća jednostavno true. svi ostali zahtjevi idu na url /imeprojekta
 * 2. dozvoljeni su upiti GET, POST, PUT, DELETE
 * 2.1. GET ne šalje nikakve parametre nikad. vraća META podatke u JSON formatu o samoj aplikaciji koja je requestana.
 * 2.2. POST se koristi za sve oblike čitanja podataka.
 * 2.3. PUT se koristi za sve oblike upisivanja podataka (i u slučajevima gdje se istovremeno piše i čita).
 * 2.4. DELETE se koristi za sve slučajeve ... pa ono ... dilitanja podataka :-)
 **************************/
/**************************
 * B) ERROR CODEOVI:
 * 1 - ne postoji traženi projekt npr. /projekt-koji-ne-postoji
 * 2 - za modul nije definirana metoda (mogu se projekt i metoda pročitati iz jsona)
 * ************************/
/**************************
 * C) SOCKET:
 * klijent se treba spojiti na URL/imeprojekta
 * npr. const socket = io.('https://dedal-api.appspot.com/ime-projekta');
 * onda se socket može primati u obliku 
 * socket.on('poruka', function(poruka){obradaPoruka(poruka);});
 **************************/