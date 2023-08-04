const express = require("express");
const auth = require("../../middleware/auth");
const addIncome = require("./controller/addIncome");
const addExpense = require("./controller/addExpense");
const getTransactions = require("./controller/getTransactions");
const deleteTransactions = require("./controller/deleteTransaction");
const editTransaction = require("./controller/editTransaction");

const transactionRoutes = express.Router();

transactionRoutes.use(auth);

transactionRoutes.post("/addincome", addIncome);
transactionRoutes.post('/addexpense',addExpense);
transactionRoutes.get('/',getTransactions);
transactionRoutes.delete('/:trans_id',deleteTransactions);
transactionRoutes.patch('/',editTransaction)

module.exports = transactionRoutes;
