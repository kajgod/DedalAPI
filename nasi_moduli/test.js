function get() {
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

function post(parametri) {
    return 'krema';
}

function put(parametri) {
    
}

function deleteMe(parametri) {
    
}

module.exports.get = get;
module.exports.post = post;
module.exports.put = put;
module.exports.delete = deleteMe;