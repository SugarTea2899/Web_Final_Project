const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const adminDB = require('../models/admin');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy(
  async function(username, password, done) {
    try{
        const admin = await adminDB.findOne({username: username});
        const res = await bcrypt.compare(password, admin.password);
        if (res == true)
            return done(null, admin);
        else
            return done(null, false);
    }
    catch(e){
        return done(null, false);
    } 
  }
));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try
    {
        const admin = await adminDB.findById(id);
        return done(null, admin);
    }
    catch(e){
        done(null, false);
    }
});

module.exports = passport;