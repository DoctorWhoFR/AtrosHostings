//================================ 
//======= ADMIN A.P.I ============
app.get('/admins/authentificate', async  (req, res) => {

    if(req.query.username != "admin" || req.query.password != "usingwithlove" || req.query.key != "5d194ec0-7704-4b8b-912f-991d705998fb"){
      var token = "INVALID REQUEST PARAMS"
    } else {
      var token = jwt.sign({exp: Math.floor(Date.now() / 1000) + (60 * 60), userid: '1'}, 'shhhhh');
    }

    res.send({"result":token, "status": 200})
})



const getServers = async () => {
  var req = await unirest('GET', 'https://api.hetzner.cloud/v1/servers')
    .headers({
      'Authorization': 'Bearer 83U8OOtux8cx0kv9HvLTOT6e2tbjb3eVwCRRyBiRquABiUnyKd66JXxhCkLvaq4l'
    })
    .end(function (res) { 
      if (res.error) throw new Error(res.error); 
      return res.raw_body;
    });

}

app.get('/admins/servers', async (req, res) => {

    const token = req.get('authorization')
    console.log(token)
    jwt.verify(token, 'shhhhh', async (err, decoded) => {
      if(err){
        res.send(err);
        return;
      }
      res.json(await getServers())
    });

})

app.post('/admins/servers', function(req, res, admin = false){
  createServer(res, '1', null, "quantum_bronze");
})

app.delete('/admins/servers/:serverid', function(req, res){

  const token = req.get('authorization')
  
  jwt.verify(token, 'shhhhh', function(err, decoded) {
    deleteServer(res, req.params.serverid)
  });
  
})
//================================

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

//================================

function filterByValue(array, value) {
  return array.filter((data) =>  JSON.stringify(data).toLowerCase().indexOf(value.toLowerCase()) !== -1);
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