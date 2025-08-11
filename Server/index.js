const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
    if (req.url === "/favicon.ico") return res.end();
    const log = `${Date.now()}: ${req.url} New Req. Recieved\n`;
    const myUrl = url.parse(req.url, true);
    console.log(myUrl);
    fs.appendFile("log.txt",log, (err, data) =>{
        switch(myUrl.pathname){
            // case `${data}`: res.end("data");
            // break;
            case '/': res.end("HomePage");
            break;
            case '/about': 
            const username=myUrl.query.myname; res.end(`hi ${username}`);
            break;
            case '/search':
                const search = myUrl.query.search_query;
                res.end("here are your result for "+ search ); 

            default: res.end("yoyoyo either / or about");
        }
    // res.end("hello from server again!");
    } );

});

myServer.listen(8000, ()=> console.log("server started..."));



