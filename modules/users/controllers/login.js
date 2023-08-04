const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jsonwebtoken=require('jsonwebtoken');
const jwtManager = require("../../../managers/jwtManager");

const login = async (req, res) => {
  const usersModel = mongoose.model("users");

  const { email, password } = req.body;

  const getUser = await usersModel.findOne({ email: email });

  if (!getUser) throw "Email doesnot exist. Please Register and then login";

  const checkpassword = await bcrypt.compare(password, getUser.password);

  if (!checkpassword) throw "Email and password doesnot exist";

  const accesstoken=jwtManager(getUser);

  res.status(200).json({
    status: "Success",
    message: "Login Successful",
    accesstoken:accesstoken
  });
};

module.exports = login;
