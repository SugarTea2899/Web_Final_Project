var express = require('express');
var router = express.Router();
const product = require('../model/product');

product.find().then(function (docs){
  docs.forEach(function (doc){
    router.get('/' + doc.no, function(req, res, next){
      res.render('pages/single-product',{product: doc});
    })
  })
})
module.exports = router;