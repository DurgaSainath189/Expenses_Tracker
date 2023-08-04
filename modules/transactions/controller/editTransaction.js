const mongoose = require("mongoose");
const validator = require("validator");

const editTransaction = async (req, res) => {
  const transactionModel = mongoose.model("transactions");
  const userModel = mongoose.model("users");

  const { trans_id, remarks, amount } = req.body;

  if (!validator.isMongoId(trans_id.toString()))
    throw "Please Provide Valid Transaction ID";

  const getUserwithid = await transactionModel.findOne({ _id: trans_id });

  if (!getUserwithid) throw "No Transaction with that ID";

  console.log(getUserwithid);

  await transactionModel.updateOne(
    { _id: trans_id },
    { amount: amount, remarks: remarks },
    { runValidators: true }
  );

  if (getUserwithid.transaction_type === "income") {
    await userModel.updateOne(
      { _id: getUserwithid.user_id },
      { $inc: { balance: getUserwithid.amount }, remarks: remarks },
      { runValidators: true }
    );
  } else {
    await userModel.updateOne(
      { _id: getUserwithid.user_id },
      { $inc: { balance: -getUserwithid.amount }, remarks: remarks },
      { runValidators: true }
    );
  }

  res.status(200).json({
    status: "Success",
    message: "Transaction Edited Successfully",
  });
};
module.exports = editTransaction;
