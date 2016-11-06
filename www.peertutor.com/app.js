////////////////////////////
//Includes
////////////////////////////
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const express = require('express');
const expressSession = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const models = require('./models/');
const passport = require('./middlewares/authentication');
const viewHelpers = require('./middlewares/viewHelpers');

////////////////////////////
//Init app
////////////////////////////
const app = express();
app.use(methodOverride('_method'));

//BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Express Session
app.use(expressSession(({ secret: 'keyboard cat', resave: false, saveUninitialized: true })));

//Connect Flash Middleware
app.use(flash());

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Set static Folder for CSS, images, jquery, etc...
app.use(express.static('./public'));

////////////////////////////
//View Engine
////////////////////////////
app.engine('handlebars', exphbs({
  layoutsDir: './views/layouts',
  defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views/`);
app.use(viewHelpers.register());

//Routes
app.use(require('./controllers/'));

// catch 404 and forward to error handler
app.use(function(req, res) {
  var err = new Error('Not Found');
  err.status = 404;
  res.render('errors/404');
});

////////////////////////////
//Run the server
////////////////////////////
app.set('port', (process.env.PORT || 8080));                    //Set the port
models.sequelize.sync().then(() => {                            
  app.listen(app.get('port'), function(){                       //Start listening
      console.log('Server started on port '+app.get('port'));   //Log the server started
  });
});