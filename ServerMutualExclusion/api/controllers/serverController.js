'use strict'


let token  = '';
let token2 = '';
let fila1  = [];
let fila2  = [];



function getRandomString(length) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}

//pedir token
exports.requestToken1 = function(req,res){
    if(token.valueOf('')){
        token = getRandomString(5);
        //res.json(token);
        print(token);
    }
    else{
        fila1.push(req);
    }
}

exports.requestToken2 = function(req,res){
    if(token.valueOf('')){
        token2 = getRandomString(5);
        res.json(token2);
    }
    else{
        fila2.push(req);
    }
}

//devolver token
exports.releaseToken1 = function(req,res){
    token == 0;
    
}

exports.releaseToken2 = function(req,res){
   token2 == 0;
}


//recurso
exports.recurso1 = function(req,res){
  return "usou recurso 1";
    
}

exports.recurso2 = function(req,res){
    return "Usou recurso 2";
    
}

