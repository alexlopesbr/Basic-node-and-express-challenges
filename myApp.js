require('dotenv').config()
const { json } = require('body-parser');
var express = require('express');
var app = express();
var bodyParser = require('body-parser')

// permite que qualquer arquivo dentro da pasta public seja puxado
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended: false}))

// pega os parametros da rota do client side
/* app.use('/', (req, res, next)=>{
  console.log(req.method + " " + req.path + " - " + req.ip);
  next()
}) */

// pega input do client side
app.get('/name', (req, res)=>{
  // let firstName = req.query.first;
  // let lastname = req.query.last;
  let{first: firstName, last: lastName} = req.query;

  res.json({ name: `${firstName} ${lastName}`})
})

app.post("/name", (req, res)=> {  
  let fullName = req.body.first + " " + req.body.last;
  res.json({ name: fullName });
});

// pega os parametros da rota
app.get('/:word/echo', (req, res)=>{
  let {word} = req.params
  res.json({echo: word})
})

// cria uma rota usando o middleware - mostra a data atual

app.get('/now', (req, res, next)=>{
  req.time = new Date().toString()
  next()
}, (req, res)=>{
  res.json({time: req.time})
})

//cria uma rota para exibição do index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// cria uma rota para exibição de um json

app.get('/json', function(req, res) {  
let message = {"message": "Hello json"}

  if (process.env.MESSAGE_STYLE === "uppercase")
    res.json({"message": "HELLO JSON"})
  else
    res.json({"message": "Hello json"})
})

module.exports = app;
