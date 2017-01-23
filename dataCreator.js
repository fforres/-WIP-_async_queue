var fs = require('fs');
var length = 10;
var data = [];
for (var i = 0; i < length; i++) {
  data.push(Math.floor(Math.random()*100));
}

fs.writeFile('./data.json', JSON.stringify(data), function(err, data){
  console.log(err);
  console.log(data);
})
