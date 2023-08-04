require("express-async-errors");

const express = require("express");
const cors=require('cors')
const mongoose = require("mongoose");
const errorHandler = require("./handlers/errorHandler");
const userRoutes = require("./modules/users/users.routes");
const transactionRoutes = require("./modules/transactions/transactions.routes");
require("dotenv").config();


mongoose
  .connect(process.env.mongodb_conn, {})
  .then(() => {
    console.log("MongoDB connections is Successful");
  })
  .catch((err) => {
    console.log("Something Went wrong! Unable to connect to the mongoDB",err);
  });


require('./models/users.model');
require('./models/transactions.model');

const app = express();
app.use(cors());

app.use(express.json());

app.use('/users',userRoutes);
app.use('/transactions',transactionRoutes);

app.all("*",(req,res,next)=>{
  res.status(404).json({
    status:"Failed",
    message:"Page Not Found"
  })
})

app.use(errorHandler);

app.listen(4000, () => {
  console.log("Server listening on port");
});
