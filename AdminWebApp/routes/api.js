var express = require('express');
var router = express.Router();
const api = require('../api/api.js');

router.get('/list-user', function(req, res, next){
  api.loadAccounts(req, res, next);
});

router.get('/ban-user', function(req, res, next) {
  api.banAccount(req, res, next);
});

router.get('/list-product', function(req, res, next){
  api.loadProducts(req, res, next);
});

router.get('/remove-product', function(req, res, next) {
  api.deleteProduct(req, res, next);
});

router.get('/top-ten',function(req, res, next) {
  api.findTopTen(req, res, next);
});

router.get('/sales-date', function(req, res, next) {
  api.getSales(req, res, next);
});

router.get('/list-bill', function(req, res, next) {
  api.loadBills(req, res, next);
});



module.exports = router;
