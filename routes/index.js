var express = require('express');
var router = express.Router();
const user = require('../models/users');
const passport = require('../passport/index');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const categoryController = require('../controller/CategoryController.js');
const userController = require('../controller/UserController');


/* GET home page. */
router.get('/', function(req, res, next) {
    let isRegisted = req.query.isRegisted;

    if (isRegisted === undefined)
        isRegisted = false;
    else
        isRegisted = true;

    if (req.isAuthenticated())
    {
        res.render('pages/index',{
            isAuthenticated: true,
            username: req.user.fullName,
            isRegisted: isRegisted
        } );
    }
    else
    {
        res.render('pages/index', {
            isAuthenticated: false,
            username: null,
            isRegisted: isRegisted
        });
    }
});

/* GET category page*/
router.get('/category', async function(req, res, next) {
    categoryController.getListProducts(req, res);
});

/* GET login page*/
router.get('/login', function(req, res, next) {
    if (req.isAuthenticated())
    {
        res.render('pages/login',{
            isAuthenticated: true,
            username: req.user.fullName,
            breadcrumbValue: "Trang chủ / Đăng nhập"
        } );
    }
    else
    {
        res.render('pages/login', {
            isAuthenticated: false,
            username: null,
            breadcrumbValue: "Trang chủ / Đăng nhập"
        });
    }
});

router.post('/login',passport.authenticate('local', {successRedirect: '/',
                                                     failureRedirect: '/login'}));

 /* GET logout page*/
 router.get('/logout', function(req, res, next) {
    if (req.isAuthenticated())
    {
        req.logOut();
        res.redirect('/');
    }
    else
    {
        res.redirect('/');
    }
});

/* GET register page*/
router.get('/register', function(req, res, next) {
    res.render('pages/register',{isSameUser: false});
});

router.post('/register', async function(req, res, next){
    try{
        
        if(await userController.checkUserInfo(req.body.username) == false)
        {
            res.render('pages/register',{isSameUser: true});
            return;
        }
        const hashPass = await bcrypt.hash(req.body.password, saltRounds);
        const registedUser = new user({
            fullName: req.body.fullName,
            email: req.body.email,
            username: req.body.username,
            password: hashPass
        });

        await registedUser.save();
        res.redirect('/?isRegisted='+ 1);
    }
    catch(e){
        next(e);
    }
    
    
})

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

/* GET checkout page*/
router.get('/checkout', function(req, res, next) {
    if (req.isAuthenticated())
    {
        res.render('pages/checkout',{
            breadcrumbValue: "Trang chủ / Thanh toán",
            isAuthenticated: true,
            username: req.user.fullName,
        } );
    }
    else
    {
        res.render('pages/checkout', {
            breadcrumbValue: "Trang chủ / Thanh toán",
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
            username: null,
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