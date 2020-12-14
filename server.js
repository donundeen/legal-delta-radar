// server.js
// where your node app starts

// init project
var express = require("express");
var helmet = require("helmet");
var session = require('express-session');
var app = express();
var PouchDB = require("pouchdb");
var flash = require("connect-flash");
var passport = require("passport");

app.use(helmet());
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(flash());

// Configure view engine to render nunjucks templates.
var nunjucks = require('nunjucks');
nunjucks.configure('views', {
    autoescape: true,
    express: app
});


// create pouchdb database in .data
var TempPouchDB = PouchDB.defaults({ prefix: ".data" });
var db = new TempPouchDB('deltaradar');

require('./config/passport')(passport, db); // pass passport for configuration

app.use(passport.initialize());
app.use(passport.session());


//require("config/database.js")(db);
//require("app/models/user.js")(db);
//var User = require("./app/models/user")(db);

//User.findOrCreate();


// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));
app.use(session({ resave: true, saveUnitialized: true, secret: 'olhosvermelhoseasenhaclassica', maxAge:null })); //session secret



require('./app/routes.js')(app, passport, db); // load our routes and pass in our app and fully configured passport



app.use("/", require("express-pouchdb")(TempPouchDB));

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your pouchdb is listening on port " + listener.address().port);
});



