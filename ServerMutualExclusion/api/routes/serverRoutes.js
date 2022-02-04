'use strict'
module.exports = function(app){
    var serverME = require('../controllers/serverControllers');
    
    //server routes
    app.route('/requestToken/1').get(serverME.requestToken1);
    app.route('/requestToken/2').get(serverME.requestToken2);

    app.route('/releaseToken/1').post(serverME.releaseToken1);
    app.route('/releaseToken/2').post(serverME.releaseToken2);

    app.route('/resource/1').get(serverME.recurso1);
    app.route('/resource/2').get(serverME.recurso2);

   
};