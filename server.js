var express = require('express');
var app = express();

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
    res.status(200).send('hello world')
 
 })

var server = app.listen(3000, function () {
  var port = server.address().port;
  console.log('App listening at port %s', port);
});
module.exports = server;





