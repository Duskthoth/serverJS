const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var waitingList = [];
var waitingList2 = [];
var token = 0; // 0 - liberado | 1 - em uso
var token2 = 0;

//Recursos
function recurso1(){
    return "Usou recurso 1";
}

function recurso2(){
    return "Usou recurso 2";
}

//Metodos HTTP REST
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});


app.post("/requestAcess", (req, res) => {
    const {name,recurso} = req.body;
    if(this.token == 1){
        if(recurso == 1){
            waitingList.push(req);
        }
        else{
            waitingList2.push(req);
        }
    
    }
    else{
        if(recurso == 1){
            res.send({token:1});
            token = 1;
        }
        else{
            res.send({token:1});
            token2 = 1;
        }
        
    }
});

app.post("/releaseRequest",(req,res) =>{
    const {recurso} = req.body;
    if(recurso == 1){
        token = 0;
        respondOldRest(1);
    }
    else{
        token2 = 0;
        respondOldRest(2);
    }
});


function respondOldRest(recurso){
    if(recurso == 1){
     var cli = waitingList.at(1);
     
        
    }
}


app.listen(5000, () => {
  console.log(`Server is running on port 5000.`);
});
