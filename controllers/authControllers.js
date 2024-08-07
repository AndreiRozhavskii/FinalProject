import {login, register, getAllUsers, deleteUser, getRoleName} from '../models/authModels.js';
import  bcrypt  from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();


export const _login=async(req,res)=>
{

    try {
        const {email,password}=req.body;
        const user = await login(email.toLowerCase());

        if (user.length===0) 
        return res.status(404).json({msg:'email not found'});
        
        const match=bcrypt.compareSync(password + "",user[0].password);
        if (!match)
        
         return res.status(404).json({msg:'wrong password'});

        const userid = user[0].user_id;
        const useremail=user[0].email;
        const userrole=user[0].role_id;
        
        const secret = process.env.ACCESS_TOKEN+'';

        const accessToken=jwt.sign({userid,useremail,userrole},secret,{expiresIn:'7d'})

        res.cookie("token", accessToken, {
            maxAge:60*60*24*7*1000,
            httpOnly:true,
        } )
        res.json({token:accessToken});

    } catch (error) {
        console.log(error);
        res.status(404).json({msg:"smth get wrong"})
        
    }

}

export const _register = async (req, res) => {
  const { username, email, password, role_name } = req.body;
  
  const loweremail = email.toLowerCase();

  try {
    
    const role = await getRoleName(role_name);

    if (!role) {
      return res.status(404).json({ msg: 'Role not found' });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password + '', salt);

   
    const user = await register(username, loweremail, hash, role.role_id);

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};



export const _logout = (req,res)=>{
    res.clearCookie('token');
    req.userid = null;
    req.useremail=null;
    res.sendStatus(200);
};

export const _getAllUsers = async(req,res)=>{
        try {
            const users = await getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            console.log(error);
        }
};

export const _deleteUser = async(req,res) => {
    try {
        const {id}=req.params;
        const user = await deleteUser(id);
        // res.status(200).json(user);
        _getAllUsers(req,res);
    } catch (error) {
        console.log(error);
    }
}


