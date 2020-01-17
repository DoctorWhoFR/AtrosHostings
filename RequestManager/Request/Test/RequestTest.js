
class RequestTest {
   
    constructor( RequestManager) {
        
       RequestManager.AddEventHandler("/myApiLinkRequest", this.Test)
    }

    Test(base,query, response)
    {   
       var message = ""
       console.log(query)
       base.ServerManager.AddServerToCash()//exemple de call interne api ;)
       console.log(base.ServerManager)
          if (query.message) message = query.message; else message = "not found";//exemple return way ***
            response.writeHead(200, { "Content-Type": "text/html" });//exemple return way ***
            response.write(`message ${message}.`);//exemple return way ***
            response.end();//exemple return way ***
	}
   
    

}

exports.RequestTest = RequestTest