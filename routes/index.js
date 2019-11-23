var express = require('express');
var router = express.Router();
const categoryController = require('../controller/CategoryController.js');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('pages/index');
});

/* GET category page*/
router.get('/category', async function(req, res, next) {
    categoryController.getListProducts(req, res);
});

/* GET login page*/
router.get('/login', function(req, res, next) {
    res.render('pages/login', { breadcrumbValue: "Trang chủ / Đăng nhập" });
});

/* GET tracking page*/
router.get('/tracking', function(req, res, next) {
    res.render('pages/tracking', { breadcrumbValue: "Trang chủ / Theo dõi" });
});

/* GET checkout page*/
router.get('/checkout', function(req, res, next) {
    res.render('pages/checkout', { breadcrumbValue: "Trang chủ / Thanh toán" });
});

/* GET cart page*/
router.get('/cart', function(req, res, next) {
    res.render('pages/cart', { breadcrumbValue: "Trang chủ / Giỏ hàng" });
});

/* GET confirmation page*/
router.get('/confirmation', function(req, res, next) {
    res.render('pages/confirmation', { breadcrumbValue: "Trang chủ / Xác nhận" });
});


/* GET about page*/
router.get('/about', function(req, res, next) {
    res.render('pages/about', { breadcrumbValue: "Home/about" });
});

/* GET contact page*/
router.get('/contact', function(req, res, next) {
    res.render('pages/contact', { breadcrumbValue: "Home/contact" });
});

module.exports = router;