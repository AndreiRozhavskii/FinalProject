import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import ticketRouter from './routes/ticketsRoutes.js';
import authRouter from './routes/authRoutes.js';

const app=express();

app.use(cors({credentials:true, origin:['http://localhost:5173']}));
app.use(express.urlencoded({extended:true}))
app.use(express.json());

app.use(cookieParser())

app.use('/dashboard', ticketRouter);
app.use('/dashboard', authRouter);
app.use( authRouter);

app.listen(process.env.PORT||3002,()=>{
    console.log(`Running on ${process.env.PORT||3002}`);
});

