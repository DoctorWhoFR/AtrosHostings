hetzner = require('./hetzner_func');

const express = require('express')
const app = express()
var request = require('request')
const uuidv1 = require('uuid/v1')
 
fs = require('fs')
path = require('path')
node_ssh = require('node-ssh')

var jwt = require('jsonwebtoken')


// admin api
app.get('/authentificate', function (req, res) {

    if(req.query.username != "admin" || req.query.password != "usingwithlove" || req.query.key != "5d194ec0-7704-4b8b-912f-991d705998fb"){
      var token = jwt.sign({exp: Math.floor(Date.now() / 1000) + (60 * 60), userid: '1', admin: false}, 'shhhhh');
    } else {
      var token = jwt.sign({exp: Math.floor(Date.now() / 1000) + (60 * 60), userid: '', admin: true}, 'shhhhh');
    }


    res.send({"result":token, "status": 200})
})

app.get('/servers', function(req, res){

    const token = req.get('authorization')
    console.log(token)
    jwt.verify(token, 'shhhhh', function(err, decoded) {
      if(decoded.admin === true){
        hetzner.getServers(res, decoded.userid, true)
      } else {
        hetzner.getServers(res, decoded.userid)
      }
      console.log("test");
    });

})

app.post('/servers', function(req, res, admin = false){
  hetzner.createServer(res, '1', null, "quantum_bronze");
})

app.delete('/servers/:serverid', function(req, res){

  const token = req.get('authorization')
  
  jwt.verify(token, 'shhhhh', function(err, decoded) {
    hetzner.deleteServer(res, req.params.serverid)
  });
  
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
