var express = require('express');
var router = express.Router();
var models = require('../models');


module.exports = {
  registerRouter() {
    const router = express.Router();

    router.get('/', this.index);
    router.get('/:username', this.show);

    return router;
  },
  index(req, res) {
    models.User.findAll().then((user) => {
      res.render('users', {
        user,
      });
    });
  },
  show(req, res) {
    models.User.findOne({
      where: { username: req.params.username },
    }).then((user) => {
      models.Post.findAll({
        where: { email: user.email },
      }).then((post) => {
        res.render('users/single', {
          user,
          post,
        });
      });
    }).catch(() => {
      res.render('users/single');
    });
  },
};


//// middleware that is specific to this router (We did not cover this in class)
//// It applies to all routes defined in this controller
//router.use(function timeLog(req, res, next) {
//  console.log('Tutors Controller :: Time: ', Date.now());
//  next();
//});
//
//
//// define the root articles route
//router.get('/', function(req, res) {
//    models.Tutor.findAll({})
//        .then(function(tutors){
//        if(tutors != null){
//            res.send('Tutors: <br /><pre>' + JSON.stringify(tutors, null, 4)+ '</pre>');
//        } else {
//            res.send('No tutor found');
//        }
//    });
//});
//
//// define the specific article route
//// Note: 'slug' is how we refer to document titles in url's
//// For some history checkout: http://stackoverflow.com/a/4230937
////router.get('/:first', function(req, res) {
//  //res.send('The firsttutor is: ' + req.params.first);
////});
//
////router.get('/:first:&:last', function(req, res) {
//  //res.send('You chose: ' + req.params.last + ', ' + req.params.first + ' as your tutor.');
////});
//
//router.get('/:name', function(req, res) {
//    if(req.params.name.indexOf('.') > -1)
//        {
//            var index = req.params.name.indexOf('.');
//            var firstname = req.params.name.substr(0, index);
//            var lastname = req.params.name.substr(index+1);
//            var lastnameIndex = lastname.indexOf('.');
//            
//            if(lastnameIndex > -1)
//                lastname = lastname.substr(0,lastnameIndex);
//            
//            res.send('<h1>You chose <span style="color:red;">' + lastname + ', ' + firstname + '</span> as your tutor.</h1>');
//        }
//    else
//        res.send('<h1>You chose <span style="color:red;">' + req.params.name + '</span> as your tutor.</h1>');
//  
//});
//
//module.exports = router;