const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const mailManager = require("../../../managers/mailManager");

const resetPassword = async (req, res) => {
  const usersModel = mongoose.model("users");

  const { email, new_password, reset_code } = req.body;
  if (!email) throw "Email is Required";
  if (!new_password) throw "New Password is Required";
  if (!reset_code) throw "Reset Code is Required";
  if (new_password.length < 5) throw "Password must be atleast 5 characters";

  const getUserWithResetCode = await usersModel.findOne({
    email: email,
    reset_code: reset_code,
  });

  if (!getUserWithResetCode) throw "Reset code doesnot exist";

  const hashednewpassword = await bcrypt.hash(new_password, 12);

  await usersModel.updateOne(
    { email: email },
    { password: hashednewpassword, reset_code: "" },
    { runValidators: true }
  );

  await mailManager(
    email,
    "You Password is Changed.If it is not you Please contact us",
    "<h3>You Password is Changed.</h3><br>If it is not you Please contact us",
    "Password Changed"
  );

  res.status(200).json({
    status: "Success",
    message: "Password is Changed Successfully",
  });
};

module.exports = resetPassword;
