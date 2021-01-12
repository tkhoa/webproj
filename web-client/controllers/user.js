const passport = require('../config/passport');
const { create } = require('../models/Users');
const Users = require('../models/Users');
const bcrypt = require('bcryptjs')

module.exports.getLoginPage = async(req, res, next) => {
    res.render('login');
}

module.exports.getSignupPage = async(req, res, next) => {
    res.render('signup');
}

module.exports.logout = async(req, res, next) => {
    req.logout();
    res.redirect('users/login');
}

module.exports.login = async(req, res, next) => {
    passport.authenticate('local', async(err, user, info) => {
        if (err) {
            return next(err)
        } else if (!user) {
            console.log(req.body)
            return res.redirect('/users/login')
        } else {
            req.logIn(user, async(err) => {
                if (err) {
                    return next(err);
                }
                res.redirect('/users/profile');
            });
        }
    })(req, res, next);
}

module.exports.signup = async(req, res, next) => {
    try {
        const { password, email } = req.body;
        const salt = await bcrypt.genSalt(10);
        passwordEncrypt = await bcrypt.hash(password, salt);
        const user = await Users.create({
            email: email,
            password: passwordEncrypt
        });
        console.log(user);
        await user.save();
        res.redirect('/');
    } catch (e) {
        throw e;
    }
}

module.exports.getProfilePage = async(req, res, next) => {
    res.send('Đã đăng nhập thành công, đây là trang profile');
}