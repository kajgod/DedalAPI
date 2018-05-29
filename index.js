/*************************** MODULI *****************************/

//#region 3rd party moduli
const express=require('express');
const app = express();
const httpovi = require('http');
const http=httpovi.Server(app);
const bodyParser = require('body-parser');
const io = require('socket.io')(http);
//#endregion

//#region postavljanje porta servera
http.listen(8081, function(){
    console.log('Aktiviran HTTP to Socket server na portu 8081');
  });
//#endregion

/************************** KONFIGURACIJA *********************/

//#region bodyParser konfiguracija
app.use( bodyParser.json({limit:1024102420}));
app.use(bodyParser.urlencoded({ 
  extended: true,
  limit:1024102420
}));
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
app.get('/', function(req, res){
    res.json({poslano:req.params});
});
app.all('/:poruka', function(req, res){
    let projekt=req.params.poruka;
    let parametri=req.body;
    posaljiPoruku(projekt, parametri);
});
//#endregion


/***************************** SOCKET ************************/
//#region socket otvaranje
/* prvo uzimamo popis modula sa API stranice */
httpovi.get('http://localhost:8080', (resp) => {
  let data = '';
  resp.on('data', (chunk) => {
    data += chunk;
  });
  resp.on('end', () => {
    otvoriSockete(JSON.parse(data));
  }); 
}).on("error", (err) => {
  console.log("Greška u čitanju sa API servisa (http.get): " + err.message);
});
/* onda otvaramo sockete u skladu s tim */
socket = {};
function otvoriSockete(moduli){
    for(i in moduli){
        let projekt=i;
        socket[projekt] = io.of('/'+projekt);
        socket[projekt].on('connection', function(socket){
            console.log('Otvoren socket za projekt: ' + projekt);
        });
    }
}
/* server je spreman, prosljeđujemo rikvestove */
function posaljiPoruku(projekt, parametri){
    socket[projekt].emit('poruka', parametri);
}
//#endregion
