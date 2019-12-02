var express = require('express');
const passport = require('../passport/index');
const admin = require('../models/admin');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const AdminController = require('../controller/AdminController');
var router = express.Router();

router.get('/login', function(req,res,next) {
  res.render('pages/login');
});

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.isAuthenticated()) {
    res.render('pages/index', {
      isAuthenticated: true,
      username: req.user.fullName,  
    });
  }
  else {
    res.redirect('/login');
  }
});

router.post('/login',passport.authenticate('local', {successRedirect: '/', failureRedirect: '/login'}));

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

/* GET register page. */
router.get('/register', function(req, res, next) {
  if (req.isAuthenticated()) {
    res.render('pages/register', {
      isSameUser:false  
    });
  }
  else {
    res.redirect('/login');
  }
});

router.post('/register', async function(req, res, next){
  try{
      if(await AdminController.checkUserInfo(req.body.username) == false)
      {
          res.render('pages/register',{isSameUser: true});
          return;
      }
      const hashPass = await bcrypt.hash(req.body.password, saltRounds);
      const registedUser = new admin({
          fullName: req.body.fullName,
          email: req.body.email,
          username: req.body.username,
          password: hashPass
      });
      
      await registedUser.save();
      res.redirect('/');
  }
  catch(e){
      next(e);
  }
});

/* GET table page. */
router.get('/table', function(req, res, next) {
  res.render('pages/table');
});

module.exports = router;