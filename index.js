/*************************** MODULI *****************************/

//#region 3rd party moduli
const express=require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const io = require('socket.io')(http);
//#endregion

//#region postavljanje porta servera
http.listen(8080, function(){
    console.log('Aktiviran HTTP to Socket server na portu 8080');
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
//#endregion


/***************************** SOCKET ************************/
//#region socket otvaranje
global.socketIo = {};
for(i in moduli){
    let projekt=i;
    global.socketIo[projekt] = io.of('/'+projekt);
    global.socketIo[projekt].on('connection', function(socket){
        console.log('Otvoren socket za projekt: ' + projekt);
    });
}
//#endregion
