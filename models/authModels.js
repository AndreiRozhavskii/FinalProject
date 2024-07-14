import {db} from '../config/db.js';

export const register =(username,email,password,role_id)=>{
    return db('users').insert({username,email,password,role_id},['user_id','email']);
};

export const login =(email)=>{
    return db('users').select('user_id','email','password','role_id').where({email})
    
};

export const getAllUsers=()=>{
    return db('users').select('users.user_id','users.email','users.password','users.username','roles.role_name')
        .from('users')
        .join('roles', 'roles.role_id', 'users.role_id');
}

export const deleteUser=(user_id)=>{
    return db('users').where({user_id}).del();
};

export const getUserByRole_1 = () => {
    return db('users').where('role_id',1).select('*');
};

export const getRoleName = (role_name) => {
    return db('roles').select('role_id').where({role_name})
}

