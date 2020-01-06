var express = require('express');
var router = express.Router();
const indexController = require('../controller/IndexController');


/* GET home page. */
router.get('/', function(req, res, next) {
    indexController.getHomePage(req, res, next);
});


/* GET cart page*/
router.get('/cart', function(req, res, next) {
    indexController.getCartPage(req, res, next);
});

/* GET confirmation page*/
router.get('/confirmation', function(req, res, next) {
    indexController.getConfirmPage(req, res, next);
});


module.exports = router;