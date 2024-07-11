import express from "express";
import { _login, _logout, _register, _getAllUsers, _deleteUser } from "../controllers/authControllers.js";
import {verifyToken} from "../middleware/verifyToken.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const authRouter = express.Router();


authRouter.post('/register', _register);
authRouter.post('/login', _login);
authRouter.get('/logout', _logout);
authRouter.get('/users', _getAllUsers);
authRouter.delete('/delete/:id', _deleteUser);
authRouter.get('/verify', verifyToken,(req,res)=>{

    const userid = req.userid;
    const useremail=req.useremail;
    const userrole=req.userrole;
    const secret = process.env.ACCESS_TOKEN_SECRET;

    const accessToken=jwt.sign({userid,useremail,userrole},secret,{expiresIn:'36000s'})

    res.cookie("token", accessToken, {
        maxAge:600*1000*60,
        httpOnly:true,
    } )
    res.json({token:accessToken});

})

export default authRouter;