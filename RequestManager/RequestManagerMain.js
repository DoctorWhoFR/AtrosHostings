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


        if (query.stat){ stat = query.stat;//exemple return way ***
  
           response.writeHead(200, {"Content-Type": "text/html"});//exemple return way ***
           response.write(`ready`);//exemple return way ***
           response.end();//exemple return way ***
        }else {
           if (query.message) message = query.message; else message = "not found";//exemple return way ***
           response.writeHead(200, {"Content-Type": "text/html"});//exemple return way ***
           response.write(`message ${message}.`);//exemple return way ***
           response.end();//exemple return way ***
        }

        // need to undersetud that exemple to know what they do in future
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