
const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    title:String,

   content:String,
   
    userInfo: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"TodoUser"
    }
},
{ timestamps: true })

const TodoModel = mongoose.model("Todo", TodoSchema); 

module.exports = TodoModel; 
 