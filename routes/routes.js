var express = require("express");
var passport = require("passport");

var User = require("../models/user");

var router = express.Router();

//signup



    router.post("/signup", function (req, res, next) {
      var username = req.body.username;
      var email = req.body.email;
      var password = req.body.password;
      console.log(req.body)
      User.findOne({ email: email }, function (err, user) {
         if (err) { return next(err); }
         if (user) {
            req.flash("error", "There's already an account with this email");
            return res.redirect("/signup");
         }
   
         var newUser = new User({
            username: username,
            password: password,
            email: email
         });
   
         newUser.save(next);
   
      });
   
   }, passport.authenticate("login", {
      successRedirect: "/",
      failureRedirect: "/signup",
      failureFlash: true
   }));

// logout 

router.get('/logout', function(req, res, next) {
   req.logout(function(err) {
     if (err) { return next(err); }
     res.redirect('/');
   });
 });

//login 
router.post("/login", passport.authenticate("login", {
   successRedirect: "/",
   failureRedirect: "/login",
   failureFlash: true
}));

 
 module.exports = router;