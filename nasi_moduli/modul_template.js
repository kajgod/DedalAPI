//#region ne dirati, sve je obavezno
const path = require('path');
const modul = path.parse(__filename).name; // ime modula u kojem se nalazim (ime projekta)
let socket = function(poruka) {
    console.log(socketIo);
    socketIo[modul].emit('poruka', poruka);
}
//#endregion

function get() {
    socket('Ovo je poruka koju šaljem');
    return {
        "get":{
            "parametri":[],
            "odgovor":[],
            "test":[]
        },
        "post":{
            "parametri":[],
            "odgovor":[],
            "test":[]
        },
        "put":{
            "parametri":[],
            "odgovor":[],
            "test":[]
        },
        "delete":{
            "parametri":[],
            "odgovor":[],
            "test":[]
        }
    };
}

function post() {
    return {};
}

function put() {
    return {};
}

function deleteMe() {
    return {};
}


//#region obavezni elementi
module.exports.get = get;
module.exports.post = post;
module.exports.put = put;
module.exports.delete = deleteMe;
//#endregion