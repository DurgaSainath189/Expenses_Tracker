const mongoose = require("mongoose");
const mailManager = require("../../../managers/mailManager");

const forgotPassword = async (req, res) => {
  const usersModel = mongoose.model("users");

  const { email } = req.body;

  if (!email) throw "Email is Required";

  const getUser = await usersModel.findOne({ email: email });

  const resetcode = Math.floor(10000 + Math.random() * 90000);

  await usersModel.updateOne(
    { email: email },
    { reset_code: resetcode },
    { runValidators: true }
  );

  await mailManager(
    getUser.email,
    "Your code for Reset Password is " + resetcode,
    "Your code for Reset Password is " + resetcode,
    "Reset Your Password - Expense Tracker"
  );

  if (!getUser) throw "This email is not registered";
  res.status(200).json({
    status: "Success",
    message: "Reset code has been sent to your mail",
  });
};
module.exports = forgotPassword;
