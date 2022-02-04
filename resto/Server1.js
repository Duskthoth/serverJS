'use strict';
module.exports = function(app){
    //Servidor Mutual Exclusion
    var sME = require('');

    //Client`s list
    app.route('/clientes').get(sME)
}