const mongoose=require('mongoose');
const validator=require('validator');

const deleteTransactions=async (req,res)=>{

    const transactionModel=mongoose.model('transactions');
    const userModel=mongoose.model('users');

    const {trans_id}=req.params;

    if(!validator.isMongoId(trans_id.toString())) throw "Please enter proper transaction ID";

    const getTransaction=await transactionModel.findOne({_id:trans_id})

    if(!getTransaction) throw "No Transcation with that ID to delete";

    console.log(getTransaction);

    if(getTransaction.transaction_type==="income"){
        await userModel.updateOne({_id:getTransaction.user_id},{$inc:{balance:getTransaction.amount*-1}},{runValidators:true})
    }else{
        await userModel.updateOne({_id:getTransaction.user_id},{$inc:{balance:getTransaction.amount}},{runValidators:true})
    }

    await transactionModel.deleteOne({_id:trans_id});


    res.status(200).json({
        status:"Success",
        message:"Transaction deleted successfully"
    })
}
module.exports=deleteTransactions;