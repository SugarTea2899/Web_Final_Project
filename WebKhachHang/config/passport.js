const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userDB = require('../models/users');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy(
  async function(username, password, done) {
    try{
        const user = await userDB.findOne({username: username});
        if (user == null)
            return done(null, false, {error: 0});
        const res = await bcrypt.compare(password, user.password);
        if (res == true && user.isActive == true && user.role == "user" && user.isBanned == false)
            return done(null, user);
        else
        {
            if (res == false)
                return done(null, false, {error: 1});
            if (user.isActive == false)
                return done(null, false, {error: 2});
            if (user.role == "admin")
                return done(null, false, {error: 0});
            if (user.isBanned == true)
                return done(null, false, {error: 3});
        }
    }
    catch(e){
        throw (e);
    } 
  }
));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try
    {
        const user = await userDB.findById(id);
        return done(null, user);
    }
    catch(e){
        done(null, false);
    }
});

module.exports = passport;