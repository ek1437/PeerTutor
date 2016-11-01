const express = require('express');
const models = require('../models');

module.exports = {
  registerRouter() {
    const router = express.Router();

    router.get('/', this.index);
    router.post('/', this.submit);

    return router;
  },
  index(req, res) {
    //res.render('sign-up');
      //res.send('error');
      res.redirect('/');
  },
  submit(req, res) {
      var email = req.body.email;
      var cemail = req.body.cemail;
      var password = req.body.password;
      var cpassword = req.body.cpassword;
      
    
      models.user.create({
          fname: req.body.fname,
          lname: req.body.lname,
          email: req.body.email,
          password: req.body.password,
      }).then((user) => {
//          req.login(user, () =>
//                    res.redirect('/dashboard')
//                   );
          res.render('homepage', {signup_success: true, SignUpResultMessage: "Your registration was successful!"});
      }).catch(() => {
          //res.render('sign-up');
          res.send('error');
      });
  },
};
