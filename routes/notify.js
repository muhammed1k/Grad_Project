var express = require("express");
var Notify = require("../models/notify");
var router = express.Router();


router.post("/notify_driver", async(req,res) => {
    const driver = req.body.driverid
    const rider = req.body.riderid
    const msg = req.body.msg
    const rideid = req.body.rideid
    var newNotifaction = new Notify({
        driverid:driver,
        riderid:rider,
        notifaction:msg,
        rideid:rideid
        })
    
   
    newNotifaction.save()

         .then(data => {
            res.json({data})
           })
           .catch(error =>{
            res.json(errors)
           })

  })
  
router.get("/get_notify", async(req,res) => {
    const notify = await Notify.find({driverid:req.query.driverid})
    .populate({path:'driverid',model:'User'})
    .populate({path:'riderid',model:'User'})
    res.status(200).json(notify);
})


module.exports = router;