const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models').User;

function passwordsMatch(passwordSubmitted, storedPassword) {
  return bcrypt.compareSync(passwordSubmitted, storedPassword);
}

passport.use(new LocalStrategy({
    emailField: 'email',
},
  (email, password, done) => {
    console.log('test12345')
    User.findOne({
      where:{ email },
    }).then((user) => {
        console.log('tes');
      if (user) {
        if (passwordsMatch(password, user.password) === false) {
          return done(null, false, { message: 'Incorrect password.' });
        }
      } else if (user == null) {
        return done(null, false, { message: 'Incorrect email.' });
      }

      return done(null, user, { message: 'Successfully Logged In!' });
    });
  })
);

//passport.serializeUser((user, done) => {
//  done(null, user.id);
//});
//
//passport.deserializeUser((email, done) => {
//  User.findById(email).then((user) => {
//    if (user == null) {
//      return done(null, false);
//    }
//
//    return done(null, user);
//  });
//});
passport.serializeUser(function(user, done) {
    console.log('seri');
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
      console.log('des');
    done(err, user);
  });
});
//passport.redirectIfLoggedIn = (route = '/dashboard') =>
//  (req, res, next) => (req.user ? res.redirect(route) : next());
//
//passport.redirectIfNotLoggedIn = (route = '/') =>
//  (req, res, next) => (req.user ? next() : res.redirect(route));

module.exports = passport;
