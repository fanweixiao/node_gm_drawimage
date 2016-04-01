`use strict`;
var _gm = require('./index');
var path = require('path');

var src_img = path.join(__dirname, './src.jpg');
var logo_img = path.join(__dirname, './logo.png');

_gm(src_img, logo_img).then(function(p){
  p.write(path.join(__dirname, "/output.jpg"), function(err, res){
    console.log(err, 'done');
  });
}).catch(function(e){
  setImmediate(function(){
    throw e;
  });
});
