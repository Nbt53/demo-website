if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const session = require('express-session');
const ejsMate = require('ejs-mate');
const path = require('path');
const ExpressError = require('./utils/ExpressError');
const flash = require('connect-flash')
const methodOverride = require('method-override');
const mongoSanitize = require('express-mongo-sanitize');
// passport for log in
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/users');
const joi = require('joi');
const helmet = require("helmet");
const { whiteList } = require('./whiteList');
const dbUrl = 'mongodb://127.0.0.1:27017/art' || process.env.DB_URI;

const port = 3000;

secret = 'Smidgion';

// to parse objects
app.use(express.urlencoded({ extended: true }));

//config up sessions
const sessionConfig = {
  secret: secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure:true,
    expires: Date.now() + 604800000,
    maxAge: 604800000
  }
}

app.use(session(sessionConfig));
app.use(methodOverride('_method'))
app.use(mongoSanitize());




app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: [],
      connectSrc: ["'self'", ...whiteList],
      scriptSrc: ["'self'", ...whiteList],
      styleSrc: ["'self'", ...whiteList],
      workerSrc: ["'self'", "blob:"],
      objectSrc: [],
      imgSrc: [
        "'self'",
        "blob:",
        "data:",
        "https://res.cloudinary.com/djj2nhj8d/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT!
        "https://images.unsplash.com/"
      ],
      fontSrc: ["'self'","https://fonts.gstatic.com/"],
      mediaSrc: ["https://res.cloudinary.com/dv5vm4sqh/"],
      childSrc: ["blob:"]
    }
  })
);

//flash middleware
app.use(flash());

// passport strategy
app.use(passport.initialize());
app.use(passport.session());   // allows consistent log in sessions so you don't have to log in every request, make sure session is used first
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser()); // how we store user in the session
passport.deserializeUser(User.deserializeUser());

//locals for access in all templates
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next()
})

//set view engine
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//to use css and js
app.use(express.static(__dirname + '/public'));

//import routes
const infoRoutes = require('./routes/info');
const artRoutes = require('./routes/art');
const userRoutes = require('./routes/users');

// mongoose setup
mongoose.connect(dbUrl), {
  addNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('database connected')
})

/// use routes
app.use('/', infoRoutes);
app.use('/art', artRoutes);
app.use('/', userRoutes);


app.all('*', (req, res, next) => {
  next(new ExpressError('Page not found', 404))     /// throws error on any url that is'nt correct(404)
})

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = 'Something is wrong here'
  res.status(statusCode).render('error', { err })

})


app.listen(port, () => { console.log(` Serving on ${port}. Press ctl + c to exit`) })
