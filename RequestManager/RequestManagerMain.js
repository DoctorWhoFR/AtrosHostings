const url = require('url');
const http = require('http');
var qs = require('querystring');

const { RequestTest } = require('./Request/Test/RequestTest.js');

class RequestManagerMain {    
    base 
    EventHandler = []
    WebServer 
    constructor(Base, ListenPort) {
        
        this.base = Base
        this.WebServer = http.createServer(async (request, response) => {
             this.RunEvent(request, response)
        });// on créer le server web avec le call back pour gérer les request anonyme (pour rester dans le main thread) async  !
        this.WebServer.listen(ListenPort);//port du server web api
        
		new RequestTest( this)
    }

    RunEvent(request, response){
             try {              
                   var stat, query, message;
                    query = url.parse(request.url, true).query;

                   if (request.method == 'POST') {

                        var body = '';
    
                        request.on('data', function (data) {
                            body += data;
    
                            // Too much POST data, kill the connection!
                            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
                            if (body.length > 1e6)
                                request.connection.destroy();
                        });
    
                        request.on('end', function () {
                            var post = qs.parse(body);
                            console.log(post['efzfez'])                       
                        });

                   } else { // if the request is get

                        const love = new URL(request.url, "http://" + request.headers.host)
                       if(this.EventHandler[love.pathname] != null)      
                       {
                            this.EventHandler[love.pathname]( this.base, query, response)
                       }
                   }
              } catch (error) {
                 console.log(error)
              }
	}

    
    AddEventHandler(request, Function) {
        this.EventHandler[request] = Function    
    }

}

exports.RequestManagerMain = RequestManagerMain