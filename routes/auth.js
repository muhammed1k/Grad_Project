var express = require("express");
var passport = require("passport");

var User = require("../models/user");

var router = express.Router();
var multer = require("multer");
var crypto = require("crypto");
var path = require("path")
var bcrypt = require("bcryptjs");

//signup

    router.post("/signup", function (req, res) {
      var fullname = req.body.fullname;
      var email = req.body.email;
      var password = req.body.password;
      console.log(req.body)
      User.findOne({ email: email }, function (err, user) {
         if (err) { return next(err); }
         if (user) {
            errors = "There's already an account with this email"
            
         }
   
         var newUser = new User({
            fullname: fullname,
            email: email,
            password: password,
            phone: ' ',
            address: ' ',
            totalride: '0',
            asdriver: '0',
            aspassnager: '0',
            rate: 'No-rating',
            brand: ' ',
            model: ' ',
            color: ' ',
            facebook: ' ',
            profileimg: ' '  
         });

         passport.authenticate('local', (err, user) => {
          console.log(user)
          req.logIn(user, (errLogIn) => {
            if (err) throw err;  
            if (errLogIn) {
                  return (errLogIn);
              }
              
          });
      })(req, res);

         newUser.save()

         .then(data => {
            res.json({data,"msg":"User Saved"})
           })
           .catch(error =>{
            res.json(errors)
           })
           

           
      });
   
   },passport.authenticate("login", {
      //successRedirect: "/",
      //failureRedirect: "/signup",
      //failureFlash: true
   }));


   router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user) res.status(404).json("user not found");
  
      else {
        req.logIn(user, (err) => {
          if (err) throw err;
          res.status(200).json(user)
        });
      } 
    })(req, res, next);
  });
    router.get("/loggeduser", (req, res) => {
      res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
    });

// logout 

router.get('/logout', function(req, res, next) {
   req.logOut(function(err) {
     if (err) { return next(err); }
   });

  
 });

 var storage = multer.diskStorage({
  destination:"./uploads/imgs",
  filename: function(req,file,cb){
    crypto.pseudoRandomBytes(16, function(err,raw){
      cb(null,raw.toString('hex') + Date.now() + path.extname(file.originalname));
    });
  }
 });

 var upload = multer({storage:storage});


  router.post("/edit_profile", async function(req,res){
    User.findOne({ _id: req.body.userId}, function (err, user) {
      if (err) { return next(err); }
      const edit = new User(req.body);

      try {
        const savededit = edit.save();
        res.status(200).json(savededit);
      } catch (err) {
        res.status(500).json(err);
      }
        
    });

});


 
 module.exports = router;