const userDB = require('../models/users.js');
const bcrypt = require('bcrypt');
const passport = require('../config/passport');
const saltRounds = 10;
let transporter = require('../config/nodemailer');
const cartDB = require('../models/cart');

async function checkUserName(username){
    try{
        const user = await userDB.findOne({username: username});
        if (user == null)
            return true;
        return false;
    }
    catch(e)
    {
        throw (e);
    }
}

async function checkUserEmail(email){
    try{
        const user = await userDB.findOne({email: email});
        if (user == null)
            return true;
        return false;
    }
    catch(e)
    {
        throw (e);
    }
}

module.exports= {
    loginGet: function(req, res, next){
        let error = req.query.error;
        let reset = req.query.reset;
        if (reset === undefined)
            reset = 0;
        if (error === undefined)
            error = -1;

        if (req.isAuthenticated())
        {
            res.render('pages/login',{
                isAuthenticated: true,
                username: req.user.fullName,
                breadcrumbValue: "Trang chủ / Đăng nhập",
                error: error,
                reset: reset
            } );
        }
        else
        {
            res.render('pages/login', {
                isAuthenticated: false,
                username: null,
                breadcrumbValue: "Trang chủ / Đăng nhập",
                error: error,
                reset: reset
            });
        }
    },
    login: function (req, res, next){
        passport.authenticate('local', function(err, user, info){
            if (err)
                return next(err);
            if (!user){
                res.redirect('/user/login?error=' + info.error);
                return;
            }
            req.logIn(user, function (err){
                if (err) 
                    return next(err);
                return res.redirect('/');
            })
        })(req, res, next);
    },

    logout: function (req, res, next){
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

    register: async function(req, res, next){
        try{
        
            if(await checkUserName(req.body.username) == false)
            {
                res.render('pages/register',{
                    isSameUser: true,
                    isSameEmail: false
                });
                return;
            }

            if (await checkUserEmail(req.body.email) == false)
            {
                res.render('pages/register',{
                    isSameUser: false,
                    isSameEmail: true
                });
                return;
            }
            const hashPass = await bcrypt.hash(req.body.password, saltRounds);
            const registedUser = new userDB({
                fullName: req.body.fullName,
                email: req.body.email,
                username: req.body.username,
                password: hashPass,
                isActive: false,
                isBanned: false,
                role: "user"
            });
    
            await registedUser.save();
            await transporter.sendMail({
                form: 'Winter-Shop',
                to: registedUser.email,
                subject: 'Winter Shop Email Verification',
                html: '<p>Click <a href="' + process.env.DOMAIN_NAME +
                                'user/mail-verification?token=' + registedUser._id + '"' +
                                '> vào đây </a> để xác nhận email của bạn với Winter Shop </p>'
            });

            res.render('pages/registerOK',{isAuthenticated: req.isAuthenticated()});
        }
        catch(e){
            next(e);
        }    
    },

    verificateEmail: async function(req, res, next){
        if (req.isAuthenticated())
        {
            res.redirect('/');
        }
        else
        {
            const token = req.query.token;
            if (token === undefined)
            {
                res.status(404).send({message: 'Trang không tìm thấy'});
            }
            else
            {
                try{
                    const user = await userDB.findById(token);
                    if(user == null)
                    {
                        res.status(404).send({message: 'Trang không tìm thấy'});
                    }
                    else
                    {
                        if (user.isActive)
                            res.status(404).send({message: 'Trang không tìm thấy'});
                        else
                        {
                            user.isActive = true;
                            await user.save();
                            res.render('pages/mail-verification',{
                                isAuthenticated: false,
                                fullname: user.fullName
                            });
                        }
                        
                    }
                }
                catch(e){
                    next(e);
                }    
            }
        }
    },
    getCheckOutPage: async function(req, res, next){
        if (req.isAuthenticated())
        {
            const carts = await cartDB.find({userId: req.user._id});
            if (carts == null || carts.length == 0){
                res.redirect('/cart?empty=true');
                return;
            }
            res.render('pages/checkout',{
                breadcrumbValue: "Trang chủ / Thanh toán",
                isAuthenticated: true,
                username: req.user.fullName,
            } );
        }
        else
        {
            res.redirect('/user/login');
        } 
    },

    sendEmailForgorPass: async function(req, res, next){
        const user = await userDB.findOne({email: req.body.email});
        if (user != null && user.isActive == true)
        {
            await transporter.sendMail({
                form: 'Winter-Shop',
                to: user.email,
                subject: 'Winter Shop Reset Password',
                html: '<p>Click <a href="' + process.env.DOMAIN_NAME +
                                'user/create-password?token=' + user._id + '"' +
                                '> vào đây </a> để tạo lại mật khẩu cho tài khoản: ' + user.username + '</p>'
            });

            res.render('pages/forgot-password',{
                isAuthenticated: req.isAuthenticated(),
                breadcrumbValue: "Trang chủ / Quên mật khẩu",
                isEmailExist: true,
                isSendEmailDone: true
            });
        }
        else
        {
            res.render('pages/forgot-password',{
                isAuthenticated: req.isAuthenticated(),
                breadcrumbValue: "Trang chủ / Quên mật khẩu",
                isEmailExist: false,
                isSendEmailDone: false
            });
        }
    },

    getCreatePassPage: async function(req, res, next){
        if (req.isAuthenticated())
        {
            res.status(404).send({message: 'Trang không tìm thấy'});
        }
        else
        {
            const token = req.query.token;
            if (token === undefined)
            {
                res.status(404).send({message: 'Trang không tìm thấy'});
            }
            else
            {
                try{
                    const user = await userDB.findById(token);
                    if (user == null)
                    {
                        res.status(404).send({message: 'Trang không tìm thấy'});
                    }
                    else
                    {
                        res.render('pages/create-password',{
                            isAuthenticated: req.isAuthenticated(),
                            breadcrumbValue: "Trang chủ / Tạo mật khẩu"
                        });
                    }
                }
                catch(e){
                    next(e);
                }
            }
        }
    },

    postCreatePassPage: async function(req, res, next){
        try{
            const token = req.query.token;
            const user = await userDB.findById(token);
            if (user != null)
            {
                const hashPass = await bcrypt.hash(req.body.password, saltRounds);
                user.password = hashPass;
                await user.save();
                res.render('pages/create-passwordOK',{isAuthenticated: req.isAuthenticated()});
            }
            else
            {
                res.status(404).send({message: 'Trang không tìm thấy'});
            }
        }
        catch(e){
            next(e);
        }
    },

    getResetPasswordPage: function(req, res, next){
        let error = req.query.error;
        if (error === undefined)
            error = 0;
        if (req.isAuthenticated()){
            res.render('pages/reset-password',{
                isAuthenticated: req.isAuthenticated(),
                breadcrumbValue: "Trang chủ / Đặt lại mật khẩu",
                username: req.user.fullname,
                accname: req.user.username,
                error: error
            })
        }else{
            res.status(404).send({message: 'Trang không tìm thấy'});
        }
    },

    postResetPassword: async function(req, res, next){
        const oldPass = req.body.oldpassword;
        const pass = req.body.password;
        const username = req.user.username;

        const user = await userDB.findOne({username: username});
        const result = await bcrypt.compare(oldPass, user.password);
        if (result == true){
            const hashPass = await bcrypt.hash(pass, saltRounds);
            user.password = hashPass;
            await user.save();
            req.logOut();
            res.redirect('/user/login?reset=1');
        }else{
            res.redirect('/user/reset-password?error=1');
        }
    },

    getConfirmPage: function(req, res, next){
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
            res.redirect('/');
        } 
    },

    getEditInfoPage: function(req, res, next){
        if (req.isAuthenticated())
        {
            res.render('pages/edit-name',{
                breadcrumbValue: "Trang chủ / Xác nhận",
                isAuthenticated: true,
                username: req.user.fullName,
            } );
        }
        else
        {
            res.redirect('/');
        } 
    },

    postEditInfo: async function(req, res, next){
        if (req.isAuthenticated())
        {
            const newUsername = req.body.username;
            const user = await userDB.findById(req.user._id);
            console.log(newUsername);
            user.fullName = newUsername;
            req.user.fullName = newUsername;
            await user.save();
            res.redirect('/');
        }
        else
        {
            res.json({message: "Not Found"});
        } 
    }
}