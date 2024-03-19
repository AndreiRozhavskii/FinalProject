import { db } from '../config/db.js'

export const getAllTasks = async() =>{
    return await db('Tickets').select('*');
};

export const createTask = async() =>{
    return await db('Tickets').insert({title, description, priority, customerID})
};



