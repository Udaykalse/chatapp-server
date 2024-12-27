// const express = require('express');
import express from 'express'; 
import dotenv from 'dotenv';
import {connectDB} from './lib/db.js';
import authRoutes from './routes/auth.route.js';

const app =express();
dotenv.config();
const PORT = process.env.PORT;


app.use(express.json());

app.use("/app/auth", authRoutes); 

app.listen (PORT,()=>{
    console.log(`server is running on port ${PORT}`);
    connectDB();
})