const mongoose =require("mongoose");
mongoose.connect('mongodb://localhost:27017',{useNewUrlParser: true, useUnifiedTopology: true});
const Schema = mongoose.Schema;

const WishSchema = new Schema({

    username:String,
    friendname:String,
    email:String
})

const wishdata = mongoose.model("wishdata" , WishSchema)
module.exports = wishdata
