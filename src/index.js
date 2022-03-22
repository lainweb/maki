const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const validator = require('express-validator');
const passport = require('passport');
const flash = require('connect-flash');
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');

const multer=require('multer');
const upload=multer({ dest:'public/img'});



const { database } = require('./key');
const helpers = require('./lib/helpers');


// Intializations
const app = express();
require('./lib/passport')


// Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: require('./lib/handlebars')
  ,
  helpers:{
    calculation:function(value){
      return value *5;
    },
    decicion:function(a, b) {
      if(a == b) // Or === depending on your needs
          return true;
      else
          return false;
    }

  }

}))


app.set('view engine', '.hbs');



// Middlewares
app.use(session({
  secret: 'leonel',
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());




// Global variables
  app.use((req, res, next) => {
  app.locals.success = req.flash('success');
  app.locals.message = req.flash('message');



  //app.locals.usuario = req.user;//el req.user no cambia y siempre se usa, principal
  //app.locals.administrador = req.user;
  //console.log(req.user);

  


  //const string=JSON.stringify(req.user);




  app.locals.usuario = req.user;









  next();
})

// Routes

app.use(require('./routes/index'));
app.use(require('./routes/authentication'));
//app.use(require('./routes/servicio'));


app.use('/links', require('./routes/links'));
app.use('/carpetaPersonas', require('./routes/personas'));
app.use('/carpetaTipoEmpresa', require('./routes/tipoEmpresa'));
app.use('/carpetaEmpresa', require('./routes/empresa'));
app.use('/carpetaTipoPersona', require('./routes/tipoPersona'));

app.use('/carpetaEmpresa', require('./routes/servicio'));
app.use('/carpetaServicio', require('./routes/servicio'));
app.use('/vistas', require('./routes/vistas'));

// Public
app.use(express.static(path.join(__dirname, 'public')));

// Starting
app.listen(app.get('port'), () => {
  console.log('Server is in port  4000');
});