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
        if (!user) res.send("No User Exists");
        else {
          req.logIn(user, (err) => {
            if (err) throw err;
            res.send("Successfully Authenticated");
            console.log(req.user);
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


  router.post("/edit_profile",upload.single(), async function(req,res){
    User.findOne({ email: req.body.email }, function (err, user) {
      if (err) { return next(err); }
      user.profileimg = req.file.path
      user.fullname = req.body.fullname
      user.phone = req.body.phone
      user.email = req.body.email
      user.address = req.body.address
      user.facebook = req.body.facebook
      /*bcrypt.compare(req.body.oldpassword, user.password, (err, result) => {
        if (err) throw err;
        if (result === true) {
          console.log("Pass Match")
          bcrypt.genSalt(10, function(err,salt){
            if(err){return done(err);}
            bcrypt.hash(req.body.newpassword, salt, function(err, hashedPassword){
                if(err) {return done(err);}
                console.log(hashedPassword)
                user.password = hashedPassword;
                
            });
        });
        } else {
          return done(null, false);
        }})
        console.log(user.password)*/

      user.save()
    
      .then(data => {
         res.json({data,"msg":"User Saved"})
        })
        .catch(error =>{
         res.json(errors)
        })
        
    });

});
 
 module.exports = router;