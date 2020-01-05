var express = require('express');
const passport = require('../config/passport');
const AdminController = require('../controller/AdminController');
const UploadController = require('../controller/UploadController');
const ProductController = require('../controller/ProductController');
var router = express.Router();

router.get('/login', function(req,res,next) {
    AdminController.getLogin(req, res, next);
});

router.post('/login',function(req, res, next){
    passport.authenticate('local', function(err, user, info){
        console.log("123");
        if (err)
            return next(err);
        if (!user){
            res.redirect('/admin/login?error=' + info.error);
            return;
        }
        req.logIn(user, function(err){
            if (err)
                return next(err);
            return res.redirect('/')
        });
    })(req, res, next);
});

/* GET logout page*/
router.get('/logout', function(req, res, next) {
    AdminController.logout(req, res, next);
});

/* GET register page. */
router.get('/register', function(req, res, next) {
    AdminController.registerAccount(req, res, next);
});

router.post('/register', async function(req, res, next){
    AdminController.postUserInfoToDatabase(req, res, next);
});

router.post('/register', async function(req, res, next){
    AdminController.postUserInfoToDatabase(req, res, next);
});

/* GET table page. */
router.get('/table', function(req, res, next) {
    AdminController.getListUsers(req, res);
});

module.exports = router;
