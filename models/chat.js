import { db } from '../config/db.js'

export const saveChatMessage = async({ ticket_id, user_id, message, timestamp }) => {
    return db('chat_messages').insert({
        ticket_id,
        user_id,
        message,
        timestamp
    })
  };

  export const getChatMessages = async (ticket_id) => {
    return await db('chat_messages').where({ ticket_id }).orderBy('timestamp', 'asc');
  };