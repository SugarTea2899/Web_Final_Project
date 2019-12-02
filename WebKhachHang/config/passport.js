const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userDB = require('../models/users');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy(
  async function(username, password, done) {
    try{
        const user = await userDB.findOne({username: username});
        if (user == null)
            return done(null, false);
        const res = await bcrypt.compare(password, user.password);
        if (res == true && user.isActive == true)
            return done(null, user);
        else
            return done(null, false);
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