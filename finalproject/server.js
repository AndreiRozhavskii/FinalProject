import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

const app=express();

app.use(express.urlencoded({extended:true}))
app.use(express.json());

app.use(cookieParser())
app.listen(process.env.PORT||3001,()=>{
    console.log(`Running on ${process.env.PORT||3001}`);
})

