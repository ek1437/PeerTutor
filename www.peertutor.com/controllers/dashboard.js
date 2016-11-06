//var express = require('express');
//var router = express.Router();
//
//module.exports = {
//  registerRouter() {
//    const router = express.Router();
//
//    router.get('/', this.index);
//
//    return router;
//  },
//  index(req, res) {
//      res.send('User Dashboard');
//   // models.User.findAll().then((user) => {
//    //  res.render('users', {
//     //   user,
//     // });
//    //});
//  },
//};


const express = require('express');
const Redirect = require('../middlewares/redirect');

module.exports = {
  registerRouter() {
    const router = express.Router();

    router.get('/', Redirect.ifNotLoggedIn(), this.index);

    return router;
  },
  index(req, res) {
    //res.render('profile', { user: req.user, success: req.flash('success') });
      res.send('User Dashboard');
  },
};
