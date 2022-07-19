var express = require("express");

var User = require("../models/user");

var router = express.Router();

router.get("/userinfo", async (req, res) => {  
    try {
      const user = await User.findOne({ userid: req.body.userid });
      
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;