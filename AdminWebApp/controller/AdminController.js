const passport = require('../config/passport');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const AdminController = require('../controller/AdminController');
const admin = require('../models/admin');
const user = require('../models/user')

async function checkUserInfo(username){
    try{
        const Admin = await adminDB.findOne({username: username});
        if (Admin == null)
            return true;
        return false;
    }
    catch(e)
    {
        throw(e);
    }
}

adminDB = require('../models/admin.js');
module.exports= {
    loginGet: function(req, res, next) {
        if (req.isAuthenticated()) {
            res.render('pages/index', {
                isAuthenticated: true,
                username: req.user.fullName,
                loginname: req.user.username,
            });
          }
          else {
            res.redirect('/admin/login');
          }
    },

    getLogin: function(req, res, next) {
        let ero = req.query.error;
        if (ero === undefined) {
            ero = false;
        }
        else {
            ero = true;
        }
        if (req.isAuthenticated()) {
            res.redirect('/');
        }
        else {
            res.render('pages/login', {
                ero: ero
            })
        }
    },

    logout: function(req, res, next) {
        if (req.isAuthenticated())
        {
            req.logOut();
            res.redirect('/');
        }
        else
        {
            res.redirect('/');
        }
    },

    registerAccount: function(req, res, next) {
        if (req.isAuthenticated()) {
            res.render('pages/register', {
                isSameUser:false  
            });
        }
        else {
            res.redirect('/admin/login');
        }
    },

    postUserInfoToDatabase: async function(req, res, next) {
        try{
            if(await checkUserInfo(req.body.username) == false)
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
    },

    getListUsers: async function(req, res) {
        const adminAccounts = await admin.find();
        const userAccounts = await user.find();
        if (req.isAuthenticated()) {
            res.render('pages/table',{
                adminAccounts: adminAccounts,
                userAccounts: userAccounts,
                loginname: req.user.username,
                isAuthenticated: true,
                username: req.user.fullName
            });
        }
        else
        {
            res.redirect('/admin/login');
        }
    },
}