var express = require('express');
const passport = require('../config/passport');
const AdminController = require('../controller/AdminController');
var router = express.Router();

router.get('/login', function(req,res,next) {
    AdminController.getLogin(req, res, next);
});

router.post('/login',passport.authenticate('local', {successRedirect: '/', failureRedirect: '/admin/login?error=1'}));

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

/* GET table page. */
router.get('/table', function(req, res, next) {
    AdminController.getListUsers(req, res);
});

module.exports = router;