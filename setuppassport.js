const User = require("./models/user");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  passport.use(
    new localStrategy((email, password, done) => {
      User.findOne({ email: email }, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err, user) => {
      const userInformation = {
        id:user.id,
        fullname:user.fullname,
        email: user.email,
        phone:user.phone,
        address:user.address,
        totalride: user.totalride,
        asdriver:user.asdriver,
        aspassnager:user.aspassnager,
        rate: user.rate,
        brand:user.brand,
        model:user.model,
        color: user.color,
        facebook:user.facebook,
        profileimg: user.profileimg
      };
      cb(err, userInformation);
    });
  });
};
