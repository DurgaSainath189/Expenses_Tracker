const express=require('express');
const register = require('./controllers/register');
const login = require('./controllers/login');
const auth = require('../../middleware/auth');
const dashboard = require('./controllers/dashboard');
const forgotPassword = require('./controllers/forgotPassword');
const resetPassword=require('./controllers/resetPassword');
const userRoutes=express.Router();

userRoutes.post('/register',register);
userRoutes.post('/login',login);
userRoutes.post('/forgotpassword',forgotPassword);
userRoutes.post('/resetpassword',resetPassword)

userRoutes.use(auth);   

userRoutes.get('/dashboard',dashboard);//this is a protected route

module.exports=userRoutes;