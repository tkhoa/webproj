const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/Users');
const bcrypt = require('bcryptjs');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async(email, password, done) => {
    try {
        console.log('zz')
        let user = await User.findOne({ email: email });
        if (!user) {
            console.log('xx')
            return done(null, false, { message: 'Incorrect username.' });
        }
        console.log('yy')
        console.log(user)

        const resultAuth = await bcrypt.compare(password, user.password);
        if (!resultAuth) {
            console.log('zz')
            return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
    } catch (err) {
        return done(err);
    };
}));

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id)
        .then(function(user) {
            done(null, user);
        })
        .catch(e => done(e));
});

module.exports = passport;