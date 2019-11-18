var express = require('express');
var router = express.Router();
var product = require('../model/product.js');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/index');
});

/* GET category page*/
router.get('/category', async function (req, res, next) {
  try
  {
    const type = req.query.type;
    const brand = req.query.brand;
    if (type === undefined && brand === undefined)
    {
      const docs = await product.find();
      res.render('pages/category', {products: docs});
    }
    else
    {
      if(type !== undefined)
      {
        const docs = await product.find({type: type});
        res.render('pages/category', {products: docs});
      }
      else
      {
        if(brand !== undefined)
        {
          const docs = await product.find({brand: brand});
          res.render('pages/category', {products: docs});
        }
      }
   }
  }
   catch(e)
   {
     console.log(e);
   }
});

/* GET login page*/
router.get('/login', function(req, res, next) {
  res.render('pages/login', {breadcrumbValue: "Trang chủ / Đăng nhập"});
});

/* GET tracking page*/
router.get('/tracking', function(req, res, next) {
  res.render('pages/tracking', {breadcrumbValue: "Trang chủ / Theo dõi"});
});

/* GET checkout page*/
router.get('/checkout', function(req, res, next) {
  res.render('pages/checkout', {breadcrumbValue: "Trang chủ / Thanh toán"});
});

/* GET cart page*/
router.get('/cart', function(req, res, next) {
  res.render('pages/cart', {breadcrumbValue: "Trang chủ / Giỏ hàng"});
});

/* GET confirmation page*/
router.get('/confirmation', function(req, res, next) {
  res.render('pages/confirmation', {breadcrumbValue: "Trang chủ / Xác nhận"});
});


/* GET about page*/
router.get('/about', function(req, res, next) {
  res.render('pages/about', {breadcrumbValue: "Home/about"});
});

/* GET contact page*/
router.get('/contact', function(req, res, next) {
  res.render('pages/contact', {breadcrumbValue: "Home/contact"});
});

module.exports = router;
