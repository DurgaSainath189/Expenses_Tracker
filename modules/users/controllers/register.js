const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwtManager = require("../../../managers/jwtManager");
const mailManager = require("../../../managers/mailManager");

const register = async (req, res) => {
  const usersModel = mongoose.model("users");

  const { name, email, password, confirm_password, balance } = req.body;

  if (!name) throw "Name must be Provided";
  if (!email) throw "Email must be Provided";
  if (!password) throw "Password must be Provided";
  if (password.length < 5) throw "Password must have atleast 5 characters";
  if (password != confirm_password)
    throw "Confirm Password doesnot match the password";

  const checkemail = await usersModel.findOne({ email: email });
  if (checkemail) throw "This email already exists";

  const hashedpassword = await bcrypt.hash(password, 12);
  const getUser = await usersModel.create({
    name: name,
    email: email,
    password: hashedpassword,
    balance: balance,
  });

  const accesstoken = jwtManager(getUser);

  await mailManager(
    getUser.email,
    "Welcome to expense tracker. We hope you can manage your expenses easily from our platform",
    "<h1>Welcome to expense tracker.</h1><br><br> We hope you can manage your expenses easily from our platform",
    "Welcome to expense tracker PRO"
  );

  res.status(200).json({
    status: "Success",
    message: "Registration Successful",
    accesstoken: accesstoken,
  });
};

module.exports = register;
