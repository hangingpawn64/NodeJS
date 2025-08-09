const fs = require("fs");
const os = require("os")
console.log(1);
//Blocking...
// const result = fs.readFileSync('contacts.txt', 'utf-8');
// console.log(result);

console.log(os.cpus().length)

//Non-Blocking
fs.readFile('contacts.txt', 'utf-8', (err, result) => {
    console.log(result);
});

console.log(2);