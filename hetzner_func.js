
function filterByValue(array, value) {
    return array.filter((data) =>  JSON.stringify(data).toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }
   
async function getServers(res, userid, admin = false){

  var options = {
    'method': 'GET',
    'url': 'https://api.hetzner.cloud/v1/servers',
    'headers': {
      'Authorization': 'Bearer 83U8OOtux8cx0kv9HvLTOT6e2tbjb3eVwCRRyBiRquABiUnyKd66JXxhCkLvaq4l',
      'content-type': 'application/json'
    }
  };

  request(options, function (error, response) { 
    if (error) throw new Error(error);
    
    var jresponse = JSON.parse(response.body)

    if(admin == true){
      var servers = jresponse.servers
    } else {
      var servers = jresponse.servers.filter(server => server.labels.userid === "1")
    }
    
    console.log(servers)
    // set the response type
    res.type('json')  

    response_model = {id: '', name: '', status: '', ip: '', package: '', userid: ''}
    var serverslists = []

    var count = 0;
    
    servers.forEach(element => {
      response_model.id = element.id;
      response_model.name = element.name;
      response_model.status = element.status;
      response_model.ip = element.public_net;
      response_model.userid = element.labels.userid

      var server_type = element.server_type.name
      if(server_type === "cx11")
      {
      response_model.package = "quantum_bronze"
      }
      serverslists[count] = response_model
      count = count + 1;
    
      response_model = {id: '', name: '', status: '', ip: '', package: ''}
    });

    // send the response
    return serverslists; // bar response.body
  });

}

function deleteServer(res, serverid){

  var options = {
    'method': 'DELETE',
    'url': 'https://api.hetzner.cloud/v1/servers/' + serverid,
    'headers': {
      'Authorization': 'Bearer 83U8OOtux8cx0kv9HvLTOT6e2tbjb3eVwCRRyBiRquABiUnyKd66JXxhCkLvaq4l'
    }
  };

  request(options, function (error, response) { 
    if (error) throw new Error(error);
    res.type('json');
    res.send(response.body);
  });
  
}

function createServer(res, userid, snapshot = null, pack)
{
  var server_type = ""
  switch (pack) {
    case "quantum_bronze":
      server_type = "cx11"
      break;
  
    default:
      break;
  }

  var options = {
    'method': 'POST',
    'url': 'https://api.hetzner.cloud/v1/servers',
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 83U8OOtux8cx0kv9HvLTOT6e2tbjb3eVwCRRyBiRquABiUnyKd66JXxhCkLvaq4l'
    },
    body: JSON.stringify({"name":"atros-"+"pack-"+server_type+"-uuid-"+uuidv1(),"server_type":server_type,"location":"nbg1","start_after_create":true,"image":"10993852","volumes":[3882152],"user_data":"#cloud-config\nruncmd:\n- [touch, /root/cloud-init-worked]\n","automount":false,"labels":{"userid":userid}})

  };
  request(options, function (error, response) { 
    if (error) throw new Error(error);
    res.type('json');
    res.send(response.body)
  });


}