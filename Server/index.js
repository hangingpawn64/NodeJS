const http = require("http");
const fs = require("fs");
const myServer = http.createServer((req, res) => {
    const log = `${Date.now()}: ${req.url} New Req. Recieved\n`;
    fs.appendFile("log.txt",log, (err, data) =>{
        switch(req.url){
            // case `${data}`: res.end("data");
            // break;
            case '/': res.end("HomePage");
            break;
            case '/about': res.end("Hello This is Akshit");
            break;
            default: res.end("yoyoyo either / or about");
        }
    // res.end("hello from server again!");
    } );

});

myServer.listen(8000, ()=> console.log("server started..."));



