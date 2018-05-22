/*************************** MODULI *****************************/

//#region 3rd party moduli
const express=require('express');
const fileUpload = require('express-fileupload');
const app = express();
const http = require('http').Server(app);
const path = require('path');
const fs=require('fs');
const bodyParser = require('body-parser');
const io = require('socket.io')(http);
//#endregion

//#region 1st party moduli by vajz esis
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


/************************** DOKUMENTACIJA **********************/
/**************************
 * 
 * 
 **************************/