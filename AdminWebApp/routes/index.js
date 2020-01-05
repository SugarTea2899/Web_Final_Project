var express = require('express');
const AdminController = require('../controller/AdminController');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  AdminController.loginGet(req, res, next);
});

router.get('/product', function(req, res, next) {
  AdminController.getProducts(req, res);
});

module.exports = router;