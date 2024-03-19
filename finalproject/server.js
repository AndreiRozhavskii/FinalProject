import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import router from './routes/routes.js';

const app=express();

app.use(express.urlencoded({extended:true}))
app.use(express.json());

app.use(bodyParser.json());
app.use(cors());
app.use(router);
app.use(cookieParser())

app.listen(process.env.PORT||3001,()=>{
    console.log(`Running on ${process.env.PORT||3001}`);
});

