const { type } = require("@hapi/joi/lib/extend");
const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");

const UserSchema = new mongoose.Schema({
  fullName: String,
  email: {
    type:String,
    
  },
  password: String,
  isVerified: { type: Boolean, default: false },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isLoggedIn:{
    type: Boolean,
    default: false,
  },

  todoInfo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todo",
    },
  ],
},
{ timestamps: true });

const UserModel = mongoose.model("TodoUser", UserSchema);

module.exports = UserModel;
