const express = require("express")
const bodyParser = require("body-parser")
const res = require("express/lib/response")
const req = require("express/lib/request")
const { param } = require("express/lib/request")

//Server stuff
//========================================================================================================

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get("/status", (request, response) =>
  response.json({ clients: clients.length })
)

const PORT = 3000

let clients = []

app.listen(PORT, () => {
  console.log(`Service listening at http://localhost:${PORT}/server`)
})
//========================================================================================================
//variables
let token1 = null
let token2 = null
let fila1 = []
let fila2 = []

//========================================================================================================
//Event callback handling stuff
function eventsHandler(request, response, next) {
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  }
  response.writeHead(200, headers)

  const clientId = Date.now()

  const newClient = {
    id: clientId,
    response,
  }

  clients.push(newClient)

  request.on("close", () => {
    console.log(`${clientId} Connection closed`)
    clients = clients.filter((client) => client.id !== clientId)
  })
}
//========================================================================================================
// Event endpoint
app.get("/events", eventsHandler)
//Posting the resource on the client
function callbackFunction(parametros) {
    console.log('=================CALLBACK FUNCTION====================== ')
  console.log(parametros)
  console.log(token2)
  if(clients.length != 0){
  if (parametros[0].localeCompare("recurso=1") == 0) {
    clients.forEach((client) => {
      if (client == fila1.at(0)) {
        client.response.write("Liberado")
      }
    })
    fila1.pop()
    token1 = null;
  } else {
    clients.forEach((client) => {
        if (client == fila2.at(0)) {
          client.response.write("Liberado")
        }
      })
      fila2.pop()
      token2 = null;
  }

}else{
    if (parametros[0].localeCompare("recurso=1") == 0){
        token1 = null;
    }
    else{
        token2 = null;
    }
    console.log(token1)
    console.log(token2)
    console.log('ENDED')
}}
async function releaseToken(request, respsonse, next) {
  console.log('=================RELEASE TOKEN====================== ')
  var parametros = request.originalUrl.split("?")
  parametros = parametros[1].split("&")
  return callbackFunction(parametros)
}

app.get("/server", function (req, res) {
  res.send("Server RUNNING  aaaaaaa!")
})
//========================================================================================================================
//rest

app.get("/server/requestToken", function (req, res) {
  //const rec = req.parac
  var parametros = req.originalUrl.split("?")
  parametros = parametros[1].split("&")

  console.log(parametros)
  if (parametros[0].localeCompare("recurso=1") == 0) {
    if (token1 == null) {
      token1 = getRandomString(5)
      //res.json(token);
      res.send(token1)
    } else {
      fila1.parametros[1]
    }
  } else if (parametros[0].localeCompare("recurso=2") == 0) {
    if (token2 == null) {
      token2 = getRandomString(5)
      //res.json(token);
      res.send(token2)
    } else {
      fila2.push(parametros[1])
    }
  }
  console.log('=================REQUEST TOKEN====================== ')
  console.log(token1)
  console.log(token2)
  console.log(fila1)
  console.log(fila2)
})

app.patch("/server/releaseToken", releaseToken)

app.get("/server/resource/1", function (req, res) {
  res.send("usou recurso 1")
})

app.get("/server/resource/2", function (req, res) {
  res.send("usou recurso 2")
})

//========================================================================================================================
//Funcoes auxiliares
function getRandomString(length) {
  var randomChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  var result = ""
  for (var i = 0; i < length; i++) {
    result += randomChars.charAt(Math.floor(Math.random() * randomChars.length))
  }
  return result
}
