'use strict'

const app = require('express')();
const pino = require('pino-express');
const multistream=require('pino-multi-stream')

const fs = require ('fs');

if(!fs.existsSync('logs'))fs.mkdirSync('logs');

let streams=[
  {stream:process.stdout},
  {stream:fs.createWriteStream('logs/pino.json')}

];

let logger = multistream({streams:streams})

app.use(pino(logger))

app.get('/', function (req, res) {
   req.log.info('Logging request!')
   const error ={error:{message: 'foo bar'}};
   req.log.error(error, 'error occurred on page!')
   req.log.info('Error lasted', Date.now()/1000)
   res.send('hello world')

})





app.listen(3000)
