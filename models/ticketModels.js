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
// async (ticket_id, resolutionDescription, resolvedBy) => {
    
//     return db.transaction(async trx => {
      
//       const ticket = await trx('tickets').where({ ticket_id }).first();
  
//       if (!ticket) {
//         throw new Error(`Ticket with id ${ticket_id} not found`);
//       }
  
//       if (ticket.status !== 'solved') {
//         throw new Error(`Ticket status is not solved`);
//       }
  
      
//       await trx('resolvedtickets').insert({
//         ticket_id: ticket.ticket_id,
//         resolution_description: resolutionDescription,
//         resolved_by: resolvedBy,
//         resolved_at: new Date(), 
//       });
  
//       // Удаляем тикет из таблицы tickets
//       await trx('tickets').where({ ticket_id }).del();

//       await trx.commit()
//     });
//   };





//knowledgebase

export const getResolvedTicketsByStatus = async () => {
        return db('tickets').select('title','description','status','resolved_by', 'resolved_at').where('status','solved')
        
};


  //CHAT
  export const getTicketByID = async (ticket_id) => {
    return db('tickets').where({ticket_id}).first()
  }

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
// export const getCurrentTicket = async(ticket_id)=>{
//     return db('tickets')
//     .select(
//         'tickets.title', 
//         'tickets.description', 
//         'tickets.status',
//         'messages.text',
//         'messages.created_at',
//         'messages.from_user_id ',
//         'messages.to_user_id '
//       )
//       .from('tickets')
//       .join('messages', 'tickets.ticket_id', 'messages.ticket_id')
//       .join('users as from_user', 'messages.from_user_id', 'from_user.user_id')
//       .join('users as to_user', 'messages.to_user_id', 'to_user.user_id')
// };
