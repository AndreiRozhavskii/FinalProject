import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import ticketRouter from './routes/ticketsRoutes.js';
import authRouter from './routes/authRoutes.js';
import path from 'path';

const app=express();

app.use(cors({credentials:true, origin:[process.env.ORIGIN]}));
app.use(express.urlencoded({extended:true}))
app.use(express.json());

app.use(cookieParser())

app.use('/dashboard', ticketRouter);
app.use('/userdashboard', authRouter);
app.use( authRouter);

app.listen(process.env.PORT||3002,()=>{
    console.log(`Running on ${process.env.PORT||3002}`);
});

const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

