const mongoose = require("mongoose");
const validator = require("validator");

const addExpense = async (req, res) => {
  const userModel = mongoose.model("users");
  const transactionsModel = mongoose.model("transactions");

  const { amount, remarks } = req.body;

  if (!amount) throw "Amount is Required";
  if (!remarks) throw "Remarks is Required";
  if (remarks.length < 5) throw "Remarks must be atleast 5 characters";
  if (!validator.isNumeric(amount.toString()))
    throw "Amount must be a valid number";
  if (amount < 1) throw "Please Enter valid amount";

  await transactionsModel.create({
    user_id: req.user._id,
    amount: amount,
    transaction_type: "expenses",
    remarks: remarks,
  });

  await userModel.updateOne(
    { _id: req.user._id },
    { $inc: { balance: -amount } },
    { runValidators: true }
  );

  res.status(200).json({
    status: "Success",
    message: "Amount Depicted Successfully",
  });
};

module.exports = addExpense;
