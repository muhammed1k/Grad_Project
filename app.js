//requires
var express = require("express");
var path = require("path");
var mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
var passport = require("passport");
var session = require("express-session");
var flash = require("connect-flash");
var bodyParser = require("body-parser");
var setUpPassport = require("./setuppassport");
var dotenv = require("dotenv");
const cors = require("cors");
const routesUrls = require('./routes/routes')

//inits
var app = express();
dotenv.config()
mongoose.connect(process.env.DATABASECONNECTION, () => console.log("DB Connected"))
setUpPassport();


app.set("port",process.env.PORT || 5000);


app.use(cookieParser());
app.use(session({
    secret:"dsakdhiwq41312sdad",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.json());
app.use(cors());


app.use('/api',routesUrls)


app.listen(app.get("port"),function()
{
    console.log("Server Started on port " + app.get("port"));
});
