var express = require("express");

var Ride = require("../models/rides");
var User = require("../models/user");

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

        console.log(req.body)
      const ride = await Ride.find({from:req.query.from,to:req.query.to})
      .where('seats').gte(req.query.availbleSeats).where('date').gte(req.query.date)
      .populate({path:'userid',model:'User'})

      //const user = await User.findOne({_id:ride[0].userid})
      res.status(200).json(ride);
      //res.status(200).json({user,ride});
    } catch (err) {
      res.status(500).json(err);
    }
  });


router.put("/join_ride", async(req,res) => {
  try {

    const ride = await Ride.findOneAndUpdate({userid:req.body.driverid,_id:req.body.rideid},
      { $push: { joinedusers :  req.body.riderid } }, {new:true})
    ride.seats -= 1           
    
    ride.save()
    res.status(200).json(ride);
  } catch (err) {
    res.status(500).json(err);
  }
})





module.exports = router;