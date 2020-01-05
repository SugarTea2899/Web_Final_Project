var express = require('express');
var router = express.Router();
const api = require('../api/api.js');
/* GET users listing. */
//router.get('/', function(req, res, next) {
//  //code->res
//  api.test(req, res, next);
//});

//router.get('/get-list', function(req, res, next) {
//  //code->res
//  api.getList(req, res, next);
//});

router.get('/list-user', function(req, res, next){
  //code->res
  api.loadAccounts(req, res, next);
});

router.get('/ban-user', function(req, res, next) {
  api.banAccount(req, res, next);
});

router.get('/list-product', function(req, res, next){
  //code->res
  api.loadProducts(req, res, next);
});

router.get('/remove-product', function(req, res, next) {
  api.deleteProduct(req, res, next);
});

module.exports = router;
