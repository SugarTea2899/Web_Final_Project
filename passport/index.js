const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userDB = require('../models/users');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy(
  async function(username, password, done) {
    try{
        const user = await userDB.findOne({username: username});
        const res = await bcrypt.compare(password, user.password);
        if (res == true)
            return done(null, user);
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
        const user = await userDB.findById(id);
        return done(null, user);
    }
    catch(e){
        done(null, false);
    }
});

module.exports = passport;