const mongoose = require("mongoose");

const dashboard = async (req, res) => {
  const usersModel = mongoose.model("users");
  const transactionModel = mongoose.model("transactions");

  const userData = await usersModel
    .findOne({ _id: req.user._id })
    .select("-password -__v");
  const transaction = await transactionModel
    .find({ user_id: req.user._id })
    .sort("-createdAt")
    .limit(3);

  res.status(200).json({
    status: "Success",
    userData: userData,
    transaction_detials: transaction,
  });
};

module.exports = dashboard;
