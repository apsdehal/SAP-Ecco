var i = 1;
var final = 200;

var newArr = [];
for(i; i < final; i++) {
	newArr.push({data: {id: i.toString()}});
}

console.log(JSON.stringify(newArr));
