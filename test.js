var fs = require('fs');

var data = fs.readFileSync('data.json');
var k = JSON.parse(data);
console.log(k.length);
