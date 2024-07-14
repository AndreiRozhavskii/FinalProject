import { getAdminTickets, getUserTickets,getTicketByID, createTicket, resolveTicket, getResolvedTicketsByStatus,addMessage, getTicketMessages, getCurrentTicket } from "../models/ticketModels.js";
import { getUserByRole_1 } from "../models/authModels.js";

//get all tickets

// export const _getAllTickets = async (req, res) => {
//     try {
//         const tasks = await getAllTickets();
//         res.status(200).json(tasks);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

export const _getTickets = async(req,res)=>{
    
    if (req.userrole==2){
        try {
            const user_id = req.userid;
            const tasks = await getUserTickets(user_id);
            res.status(200).json(tasks);
        } 
        catch (error) {
            res.status(error).json({ error: error.message });
        }
    }
    else {
        try {
            const tasks = await getAdminTickets();
            res.status(200).json(tasks);
        } 
        catch (error) {
            res.status(error).json({ error: error.message });
        }
    }
}





//create ticket 

export const _createTicket = async (req, res) => {
    const { title, description, priority} = req.body;
    const user_id=req.userid;
    try {
    
        const newTask = await createTicket(title, description, priority,user_id);
        console.log('new task',newTask);
        res.status(201).json(newTask);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

//resolve ticket 

export const _resolveTicket = async (req, res) => {
    const { ticket_id } = req.params;
    const user_id = req.userid
    
    try {
        await resolveTicket(ticket_id,user_id);
        res.status(200).json({ message: 'Ticket resolved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while resolving ticket' });
    }
};

//get resolved ticket

export const _getResolvedTicketsByStatus = async (req, res) => {
    
    try {
        const resolvedTickets = await getResolvedTicketsByStatus();
        res.status(200).json(resolvedTickets);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching resolved tickets' });
    }
};

// MESSAGES

export const _addMessage = async (req, res) => {
    const { ticket_id } = req.params;
    const { text } = req.body;
    const from_user_id = req.userid;

    try {
        
        const ticket = await getTicketByID(ticket_id);
        const to_user_id = ticket.user_id;

        if (from_user_id === to_user_id) {
            
            const usersWithRole_1 = await getUserByRole_1();

            for (const user of usersWithRole_1) {
                await addMessage(ticket_id, from_user_id, user.user_id, text);
            }
            
        } else {
            
            await addMessage(ticket_id, from_user_id, to_user_id, text);
        }

        _getTicketMessages(req, res);

    } catch (error) {
        res.status(500).json({ message: 'An error occurred while adding the message.', error });
    }
};

// Working controller
export const _getTicketMessages = async (req, res) => {
    const { ticket_id } = req.params;

    try {
        const messages = await getTicketMessages(ticket_id);
        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching ticket messages' });
    }
};



export const _getCurrentTicket = async (req,res) =>{
    const {ticket_id} = req.params;
    try{
        const ticket = await getCurrentTicket(ticket_id);
        res.status(200).json(ticket);
    }  catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching ticket messages' });
    }
};   
