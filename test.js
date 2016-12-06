let fs = require('fs');

let data = fs.readFileSync('data.json');
let k = JSON.parse(data);
console.log(k.length);
