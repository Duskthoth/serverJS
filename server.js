const express = require("express")
const bodyParser = require("body-parser")
const res = require("express/lib/response")
const req = require("express/lib/request")
const { param } = require("express/lib/request")
const cors = require("cors")
const { Hub, sseHub } = require("@toverux/expresse")

//Server stuff
//========================================================================================================
//calma q tem gente falando aqui
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/status', (request, response) => response.json({clients: clients.length}));

const PORT = 3000;

let clients = [];

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

//========================================================================================================
// Event endpoint

//========================================================================================================================
//REQUISITA TOKEN PARA ACESSO
app.get("/server/requestToken", function (req, res) {
  //recepe parametros pela URL
  var parametros = req.originalUrl.split("?")
  parametros = parametros[1].split("&")
 

  //Utiliza os parametros para decidir qual recurso deve ser gerado o token
  if (parametros[0].localeCompare("recurso=1") == 0) {
    if (token1 == null) {
      token1 = getRandomString(5)
      res.send(token1) //envia para o cliente
    } else if (!fila1.includes(res)) {
      fila1.push(res)
    } //adiciona a fila de espera
  } else if (parametros[0].localeCompare("recurso=2") == 0) {
    if (token2 == null) {
      token2 = getRandomString(5)
      res.send(token2) //envia ao cliente
    } else if (!fila2.includes(res)) {
      fila2.push(res)
      //adiciona o cliente a fila de espera
    }
  }
  clients.push(parametros[1])
  res.send('Finalizado')
    
  
  console.log("=================REQUEST TOKEN====================== ")
  console.log("Token1: " + token1)
  console.log("Token2: " + token2)
  console.log("Fila 1: " + fila1)
  console.log("Fila 2: " + fila2)
})

//========================================================================================================================
//LIBERA O TOKEN CRIADO
app.get("/server/releaseToken", function(req,res){
  var parametros = req.originalUrl.split("?")
  parametros = parametros[1].split("&")

  if (parametros[0].localeCompare("recurso=1") == 0) {
    console.log(req.hostname)
  } else if (parametros[0].localeCompare("recurso=2") == 0) {
    console.log(req.headers.origin)
    
  }
  clients.push(parametros[1])
  res.send('Finalizado')
})

//========================================================================================================================
//RECURSOS DO SERVIDOR, DEVOLVEM APENAS UMA STRING
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
