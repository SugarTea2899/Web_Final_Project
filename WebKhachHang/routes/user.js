var express = require('express');
var router = express.Router();
const userController = require('../controller/UserController');

router.get('/login', function(req, res, next) {
    userController.loginGet(req, res, next);
});

router.post('/login', function (req, res, next){
    userController.login(req, res, next);
});

 /* GET logout page*/
 router.get('/logout', function(req, res, next) {
    userController.logout(req, res, next);
});

/* GET register page*/
router.get('/register', function(req, res, next) {
    res.render('pages/register',{
        isSameUser: false,
        isSameEmail: false
    });
});

router.post('/register', async function(req, res, next){

    userController.register(req, res, next);
})


/* GET mail-verification page*/
router.get('/mail-verification', function(req, res, next) {
    userController.verificateEmail(req, res, next);
});

/* GET forgot-password page*/
router.get('/forgot-password', function(req, res, next) {
    res.render('pages/forgot-password',{
        isAuthenticated: req.isAuthenticated(),
        breadcrumbValue: "Trang chủ / Quên mật khẩu",
        isEmailExist: true,
        isSendEmailDone: false
    });
});

/* POST forgot-password page*/
router.post('/forgot-password', function(req, res, next) {
    userController.sendEmailForgorPass(req, res, next);
});

router.get('/create-password', function(req, res, next) {
    userController.getCreatePassPage(req, res, next);
});

/* POST create-password page*/
router.post('/create-password', function(req, res, next) {
    userController.postCreatePassPage(req, res, next);
});

/* GET checkout page*/
router.get('/checkout', function(req, res, next) {
  userController.getCheckOutPage(req, res, next);
});

router.get('/reset-password', function(req, res, next) {
    userController.getResetPasswordPage(req, res, next);
});

router.post('/reset-password', function(req, res, next) {
    userController.postResetPassword(req, res, next);
});

router.get('/confirmation', function(req, res, next) {
    userController.getConfirmPage(req, res, next);
});

router.get('/edit-info', function(req, res, next){
    userController.getEditInfoPage(req, res, next);
});

router.post('/edit-info', function(req, res, next){
    userController.postEditInfo(req, res, next);
});

module.exports = router;