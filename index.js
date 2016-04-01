`use strict`;
var gm = require('gm');
var debug = require('debug')('gm:drawImage');

function get_size(img){
  return new Promise(function(resolve, reject){
    gm(img).size(function(err, value){
      if(err) return reject(err);
      var img_size = { w: value.width, h: value.height };
      return resolve(img_size);
    });
  });
}

exports = module.exports = function drawImage(img, logo){
  return new Promise(function(resolve, reject){
    get_size(logo).then(function(logo_size){
      debug('logo size', logo_size);
      get_size(img).then(function(img_size){
      debug('source imagesize', img_size);
        // Compute draw point
        var draw_point = {
          x: (img_size.w - logo_size.w) / 2,
          y: (img_size.h - logo_size.h) / 2
        };
        debug('draw point', draw_point);
        var obj = gm(img)
          .draw(`image Over ${draw_point.x},${draw_point.y} 0,0 ${logo}`)
          .quality(95);
        resolve(obj);
      }, reject);
    }, reject);
  });
};
