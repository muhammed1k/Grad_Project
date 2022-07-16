//requires
var express = require("express");
var path = require("path");
var mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
var passport = require("passport");
var session = require("express-session");
var flash = require("connect-flash");
var bodyParser = require("body-parser");
var dotenv = require("dotenv");
const cors = require("cors");
const routesUrls = require('./routes/routes')

//inits
var app = express();
dotenv.config()
mongoose.connect(process.env.DATABASECONNECTION, () => console.log("DB Connected"))



app.set("port",process.env.PORT || 5000);


app.use(cookieParser("secretcode"));
app.use(session({
    secret:"secretcode",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
require("./setuppassport")(passport);
app.use(flash());
app.use(express.json());
app.use(
    cors({
      origin: "http://localhost:3000", // <-- location of the react app were connecting to
      credentials: true,
    })
  );


app.use('/api',routesUrls)


app.listen(app.get("port"),function()
{
    console.log("Server Started on port " + app.get("port"));
});
