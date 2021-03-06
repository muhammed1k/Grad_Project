var mongoose = require("mongoose");



var userSchema = mongoose.Schema({
    
    from:{type:String, required:true},
    to:{type:String, required:true},
    gender:{type:String, required:true},
    air_condition:{type:String, default:Date.now},
    smoking:{type:String, required:true},
    pet:{type:String, required:true},
    seats:{type:Number, required:true},
    payment:{type:String, required:true},
    fare:{type:String, required:true},
    date:{type:Date, required:true},
    time:{type:String, required:true},
    created:{type:Date, required:true},
    distance:{type:String, required:true},
    duration:{type:String, required:true},
    joinedusers:{type:Array,required:false},
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'users'}
    
});



var Rides = mongoose.model("Rides", userSchema);

module.exports = Rides;