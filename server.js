const express = require("express");
const routes = require("./routes");
const PORT = process.env.PORT || 3001;
const mongoose = require("mongoose")
const passport = require('passport')
const session = require('express-session');

const app = express();
require('./config/passport')(passport);

const db = require('./config/keys').mongoURI;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: false}));
app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Charity.findById(id, function(err, user) {
    done(err, user);
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}


app.use('/', routes);
app.use('/', require('./routes/index'))


mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/scraightUP',
   { useNewUrlParser: true , useUnifiedTopology: true});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});