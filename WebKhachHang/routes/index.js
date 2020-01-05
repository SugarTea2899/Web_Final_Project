var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
    
    if (req.isAuthenticated())
    {
        res.render('pages/index',{
            isAuthenticated: true,
            username: req.user.fullName,
            id: req.user._id
        } );
    }
    else
    {
        res.render('pages/index', {
            isAuthenticated: false,
            username: null,
            id: null
        });
    }
});



/* GET tracking page*/
router.get('/tracking', function(req, res, next) {
    if (req.isAuthenticated())
    {
        res.render('pages/tracking',{
            breadcrumbValue: "Trang chủ / Theo dõi",
            isAuthenticated: true,
            username: req.user.fullName,
        } );
    }
    else
    {
        res.render('pages/tracking', {
            breadcrumbValue: "Trang chủ / Theo dõi",
            isAuthenticated: false,
            username: null,
        });
    }
});


/* GET cart page*/
router.get('/cart', function(req, res, next) {
    if (req.isAuthenticated())
    {
        res.render('pages/cart',{
            breadcrumbValue: "Trang chủ / Giỏ hàng",
            isAuthenticated: true,
            username: req.user.fullName,
        } );
    }
    else
    {
        res.render('pages/cart', {
            breadcrumbValue: "Trang chủ / Giỏ hàng",
            isAuthenticated: false,
            username: null
        });
    } 
    
});

/* GET confirmation page*/
router.get('/confirmation', function(req, res, next) {
    if (req.isAuthenticated())
    {
        res.render('pages/confirmation',{
            breadcrumbValue: "Trang chủ / Xác nhận",
            isAuthenticated: true,
            username: req.user.fullName,
        } );
    }
    else
    {
        res.render('pages/confirmation', {
            breadcrumbValue: "Trang chủ / Xác nhận",
            isAuthenticated: false,
            username: null,
        });
    } 
});


/* GET about page*/
router.get('/about', function(req, res, next) {
    if (req.isAuthenticated())
    {
        res.render('pages/about',{
            breadcrumbValue: "Trang chủ / about",
            isAuthenticated: true,
            username: req.user.fullName,
        } );
    }
    else
    {
        res.render('pages/about', {
            breadcrumbValue: "Trang chủ / about",
            isAuthenticated: false,
            username: null,
        });
    } 
});

/* GET contact page*/
router.get('/contact', function(req, res, next) {
    if (req.isAuthenticated())
    {
        res.render('pages/contact',{
            breadcrumbValue: "Trang chủ / liên lạc",
            isAuthenticated: true,
            username: req.user.fullName,
        } );
    }
    else
    {
        res.render('pages/contact', {
            breadcrumbValue: "Trang chủ / liên lạc",
            isAuthenticated: false,
            username: null,
        });
    } 
});

module.exports = router;