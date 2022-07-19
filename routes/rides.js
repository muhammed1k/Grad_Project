var express = require("express");

var Ride = require("../models/rides");

var router = express.Router();

router.post("/offer_ride", async (req, res) => {
    const newRide = new Ride(req.body);
    try {
      const savedRide = await newRide.save();
      res.status(200).json(savedRide);
    } catch (err) {
      res.status(500).json(err);
    }
  });




router.get("/search_rides", async (req, res) => {
    try {

        
      const ride = await Ride.findOne({from:req.body.from,to:req.body.to});
      
      res.status(200).json(ride);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;