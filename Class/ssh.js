import server from './Server'; 

server(host, port , ssh, power)

var path, node_ssh, ssh, fs

fs = require('fs')
path = require('path')
node_ssh = require('node-ssh')
ssh = new node_ssh()
async function checkAvaibleServer()
{
  
  // connect to master machine 
  ssh.connect({
    host: 'localhost',
    username: 'steel',
    privateKey: '/home/steel/.ssh/id_rsa'
  })

}

async function createServer (){
  


  return false 
}
deleteServer()

async function deleteServer (){
  console.log(await createServer(1, 2))
}

// manager
async function startServer (){


}

async function stopServer (){


}