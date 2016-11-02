const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const express = require('express');
const expressSession = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const models = require('./models/');
const passport = require('./middlewares/authentication');
const viewHelpers = require('./middlewares/viewHelpers');

const app = express();
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession(({ secret: 'keyboard cat', resave: false, saveUninitialized: true })));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('./public'));

app.engine('handlebars', exphbs({
  layoutsDir: './views/layouts',
  defaultLayout: 'main',
}));

app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views/`);

app.use(viewHelpers.register());

app.use(require('./controllers/'));

////Home Page
//app.get('/', function(req, res){
//  res.send('<center><h1>Welcome to PeerTutoring</h1></center> <br />'+
//          '<ul>'+
//            '<li><a href="http://192.168.33.10:8080">Home</a></li>'+
//            '<li><a href="http://192.168.33.10:8080/login">Login</a></li>'+
//            '<li><a href="http://192.168.33.10:8080/signup">Sign Up</a></li>'+
//            '<li><a href="http://192.168.33.10:8080/tutors">Tutors</a></li>'+
//          '</ul>');
//});
//
////Login
//app.get('/login', function(req, res){
//   res.send("Login Page"); 
//});
//
////SignUp
//app.get('/signup', function(req, res){
//   res.send("Signup Page"); 
//});
//
////Load the tutors controller
//const tutors = require('./controllers/tutors');
//app.use('/tutors', tutors);

// catch 404 and forward to error handler
app.use(function(req, res) {
  var err = new Error('Not Found');
  err.status = 404;
  res.render('errors/404');
});

models.sequelize.sync().then(() => {
  app.listen(8080);
});
//app.listen(8080);