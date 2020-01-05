const passport = require('../config/passport');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const userDB = require('../models/user');
const admin = require('../models/admin');

async function checkUserInfo(username){
    try{
        const user = await userDB.findOne({username: username});
        if (user == null)
            return true;
        return false;
    }
    catch(e)
    {
        throw(e);
    }
}


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
            ero = -1;
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
            const registedUser = new userDB({
                fullName: req.body.fullName,
                email: req.body.email,
                username: req.body.username,
                password: hashPass,
                isBanned: false,
                role: "admin"
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
        const userAccounts = await userDB.find();
        if (req.isAuthenticated()) {
            res.render('pages/table',{                          
                loginname: req.user.username,
                isAuthenticated: true,
                username: req.user.fullName,
                id: req.user._id,
                role: req.user.role
            });
        }
        else
        {
            res.redirect('/admin/login');
        }
    },
}
