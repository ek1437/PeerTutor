const express = require('express');
const passport = require('../middlewares/authentication');
const Redirect = require('../middlewares/redirect');

module.exports = {
  registerRouter() {
    const router = express.Router();

    router.get('/', Redirect.ifLoggedIn('/dashboard'), this.index);
    router.post('/', this.login);

    return router;
  },
  index(req, res) {
    //res.render('login', { error: req.flash('error') });
    res.send('abc');
  },
  login(req, res) {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/',
      failureFlash: true,
      successFlash: true,
    })(req, res);
  },
};
