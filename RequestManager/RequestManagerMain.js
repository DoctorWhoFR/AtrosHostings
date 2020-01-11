require(`../index.js`);
const url = require('url');
const http = require('http');

class RequestManagerMain
{
	base;
    WebServer 
    EventHandler = [] // shoud be EventHandler["myeventName"](query)


    
	constructor(Base, ListenPort) {
       
		this.base = Base
        this.WebServer = http.createServer(this.ExectuteEvent );// on créer le server web avec le call back pour gérer les request async !
        this.WebServer.listen(ListenPort);//port du server web api
    }

    async ExectuteEvent(request, response)
    { 
        var stat, query, message;
         query = url.parse(request.url, true).query;
        //shoud be EventHandler[request](query)
        console.log(request)
        console.log(query)
	}
    
    AddEventHandler(request, Fucntion)
    {
         this.EventHandler[request] = Fucntion
	}

}

exports.RequestManagerMain = RequestManagerMain