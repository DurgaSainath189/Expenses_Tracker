const mongoose = require("mongoose");

const usersSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Required"],
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
    },
    balance: {
      type: Number,
      required: [true, "Balance is Required"],
      default: 0,
    },
    reset_code:{
      type:Number,
    }
  },
  {
    timestamps:true,
  }
);

const usersModel = mongoose.model("users", usersSchema);

module.exports = usersModel;
