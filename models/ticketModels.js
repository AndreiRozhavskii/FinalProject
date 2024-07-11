import { db } from '../config/db.js'


// export const getAllTickets = async() =>{
//     return db('tickets').select('*');
// };

export const getUserTickets = async(user_id) =>{
    
    
    return  db('tickets').where({user_id}).select('ticket_id', 'title', 'description', 'status', 'priority', 'created_at');
};

export const getAdminTickets=async()=>{
    
    return db('tickets').where('status', 'not solved').select('*');
}


export const createTicket = async(title, description, priority,user_id) =>{
    
    return db('tickets').insert({ title, description, priority,user_id},['title', 'description', 'priority']);
};


export const resolveTicket = async(ticket_id,user_id)=>{
    return db('tickets').where({ticket_id}).update({status:'solved',resolved_at:new Date(),resolved_by:user_id})
}

//knowledgebase

export const getResolvedTicketsByStatus = async () => {
    return db('tickets')
        .select(
            'tickets.ticket_id',
            'tickets.title',
            'tickets.description',
            'tickets.status',
            'users.username as created_by_username',
            'tickets.created_at',
            'resolver.username as resolved_by_username',
            'tickets.resolved_at'
        )
        .join('users', 'tickets.user_id', 'users.user_id')
        .leftJoin('users as resolver', 'tickets.resolved_by', 'resolver.user_id')
        .where('tickets.status', 'solved');
};


  //CHAT
 

  export const addMessage = async (ticket_id, from_user_id, to_user_id, text) => {
    return db('messages').insert({
        ticket_id,
        from_user_id,
        to_user_id,
        text,
        created_at: new Date(),
    });
};

export const getTicketMessages = async (ticket_id) => {
    return db('messages').select(
          'messages.message_id',
          'messages.ticket_id',
          'users_from.username as from_username',
          'users_to.username as to_username',
          'messages.text',
          'messages.created_at'
        )
        .join('users as users_from', 'messages.from_user_id', 'users_from.user_id')
        .join('users as users_to', 'messages.to_user_id', 'users_to.user_id')
        .where({ ticket_id })
        .orderBy('created_at', 'asc');
};

// GET PARTICUALLY TICKET
export const getCurrentTicket = async(ticket_id)=>{
    return  db('tickets').where({ticket_id}).select('ticket_id', 'title', 'description', 'status');
};

