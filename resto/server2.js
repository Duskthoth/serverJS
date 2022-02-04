const express = require('express');
const bodyParser = require('body-parser');
const res = require('express/lib/response');

//Server stuff
//========================================================================================================

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/status', (request, response) => response.json({ clients: clients.length }));

const PORT = 3000;

let clients = [];

app.listen(PORT, () => {
    console.log(`Service listening at http://localhost:${PORT}`)
})

//========================================================================================================
//Event callback handling stuff
function eventsHandler(request, response, next) {
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    };
    response.writeHead(200, headers);

    const clientId = Date.now();

    const newClient = {
        id: clientId,
        response
    };

    clients.push(newClient);

    request.on('close', () => {
        console.log(`${clientId} Connection closed`);
        clients = clients.filter(client => client.id !== clientId);
    });
}
//========================================================================================================
// Event endpoint
app.get('/events', eventsHandler);
//for posting
function callbackFunction(id) {
    clients.forEach()}

async function callback(request, respsonse, next) {
    const resposta = request.body;
    const idCliente = resposta.body.id
    return sendEventsToAll(idCliente);
  }
  
 // app.post('/fact', addFact);












 
  //the rest of this drit
var token1 = 0;
var token2 = 0;
var fila  = [];
var fila2 = [];

var EventSource = require("eventsource");
var source = new EventSource('URL_TO_EVENT_STREAM');
source.onopen = function() {
   console.log('connection to stream has been opened');
};
source.onerror = function (error) {
  console.log('An error has occurred while receiving stream', error);
};
source.onmessage = function (stream) {
  console.log('received stream', stream);

};




//metod for giving the token
//request access
app.get("/exMutua",(req,res) => 
{
    const id = req.get({id});
    res.send('aaaaa')

});

//release access
app.post('/exMutua', (req,res) => {
 
});



