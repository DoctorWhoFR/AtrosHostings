require(`../index.js`);
const url = require('url');
const http = require('http');
var qs = require('querystring');
var _ = require('lodash');



  var EventHandler = []
  var  base 
class RequestManagerMain {
    
    
   // EventHandler// shoud be EventHandler["myeventName"](query)
    
   
    WebServer 
    constructor(Base, ListenPort) {
        
        base = Base
        this.WebServer = http.createServer(this.ExectuteEvent);// on créer le server web avec le call back pour gérer les request async !
        this.WebServer.listen(ListenPort);//port du server web api
        
    }

    async ExectuteEvent(request, response) {
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
                        // use post['blah'], etc.
                    });

               } else { // if the request is get

                    // /test/
                    // stat = fezfez
                    const love = new URL(request.url, "http://" + request.headers.host)
                    console.log( EventHandler)
                    if( EventHandler[love.pathname] != null)      
                    {
                
                          EventHandler[love.pathname](base,query, response)
                
                    }
            }
         } catch (error) {
             console.log(error)
          }
        
        /*if (query.stat) {
            stat = query.stat;//exemple return way ***
            response.writeHead(200, { "Content-Type": "text/html" });//exemple return way ***
            response.write(`ready`);//exemple return way ***
            response.end();//exemple return way ***
        } else {
            if (query.message) message = query.message; else message = "not found";//exemple return way ***
            response.writeHead(200, { "Content-Type": "text/html" });//exemple return way ***
            response.write(`message ${message}.`);//exemple return way ***
            response.end();//exemple return way ***
        }
        */
        // need to undersetud that exemple to know what they do in future
        //shoud be EventHandler[request](query)
       // console.log(query)
    }

    AddEventHandler(request, Function) {

        console.log(request + Function)
        EventHandler[request] = Function    
        console.log(EventHandler)
    }

}

exports.RequestManagerMain = RequestManagerMain