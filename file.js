const fs = require("fs");

// //Syncronous... Blocking Request
// fs.writeFileSync('./test.txt',  'helo, World!');

// //Asyncronous... Non-Blocking Request
// fs.writeFile('./test.txt',  'hello, World! Async',(err)=> {});

//     const result = fs.readFileSync('./contacts.txt', 'utf-8'); //--> Sync kuch return krta hai like here result
//      console.log(result);

//     fs.readFile("./contacts.txt","utf-8", (err, result) =>{  // --> Async doesn't return it always expects a callback function
//         err ? console.log('Error') : console.log(result)
//     }
// );

// fs.appendFileSync("./test.txt", new Date().getDate().toLocaleString());
fs.appendFileSync("./test.txt", "\nhey there\n")

// fs.cpSync("./test.txt", "./copy.txt")

// fs.unlinkSync("./copy.txt") // ->delete file

console.log(fs.statSync("./test.txt"));

// fs.mkdirSync("my-docs");

fs.mkdirSync("my-docss/a/b" ,{recursive: true});