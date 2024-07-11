import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config();

export const verifyToken = (req,res,next)=>{
    const accessToken=req.cookies.token;

    if(!accessToken)return res.status(401).json({msg:'unauthorized'})

    jwt.verify(accessToken,process.env.ACCESS_TOKEN+'',(err,decode) => {
        if(err) return res.status(403).json({msg:'forbidden'})

        req.userid = decode.userid;
        req.useremail = decode.useremail;
        req.userrole = decode.userrole;
        
        next();
    });

    
}