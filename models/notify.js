var mongoose = require("mongoose");



var userSchema = mongoose.Schema({
    
    notifaction:{type:String},
    date:{type:Date,default:Date.now},
    driverid: { type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    
    
});

var Notify = mongoose.model("Notify", userSchema);

module.exports = Notify;