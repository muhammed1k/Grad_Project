var express = require("express");
var Notify = require("../models/notify");
var router = express.Router();


router.post("/notify_driver", async(req,res) => {
    const driver = req.body.driverid
    const msg = req.body.msg
    var newNotifaction = new Notify({
        driverid:driver,
        notifaction:msg
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
    const notify = await Notify.find({driverid:req.query.driverid}).populate({path:'driverid',model:'User'})
    res.status(200).json(notify);
})


module.exports = router;