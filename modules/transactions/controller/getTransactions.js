const mongoose=require('mongoose');

const getTransactions=async (req,res)=>{

    const transactionModel=mongoose.model('transactions');

    // console.log(req.query);

    const transactions=await transactionModel.find({user_id:req.user._id,...req.query})

    res.status(200).json({
        status:"Success",
        message:"Transaction details fetched",
        transaction_details:transactions
    })
}
module.exports=getTransactions;