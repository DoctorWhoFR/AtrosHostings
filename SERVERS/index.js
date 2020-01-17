function test(response) {
    response.writeHead(200, { "Content-Type": "text/html" });//exemple return way ***
    response.write("test");//exemple return way ***
    response.end();//exemple return way ***
}

exports.ServerAPI = test