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
const multer = require("multer");
var morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const routesAuth = require('./routes/auth')
const ridesAuth = require('./routes/rides')
const usersinfo = require('./routes/users')
const notifyinfo = require('./routes/notify')

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
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use("/uploads", express.static(path.join(__dirname, "uploads/imgs")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/imgs");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

app.use('/api/auth',routesAuth)
app.use('/api/rides',ridesAuth)
app.use('/api/users/',usersinfo)
app.use('/api/notify/',notifyinfo)


app.listen(app.get("port"),function()
{
    console.log("Server Started on port " + app.get("port"));
});
