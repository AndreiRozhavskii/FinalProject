import { Router } from "express";
import { _getTickets, _createTicket,_resolveTicket, _getResolvedTicketsByStatus, _addMessage, _getTicketMessages,_getCurrentTicket } from '../controllers/ticketControllers.js';
import { verifyToken } from "../middleware/verifyToken.js";


const ticketRouter = Router();

ticketRouter.get("/", verifyToken, _getTickets);


ticketRouter.post("/createticket", verifyToken, _createTicket);
ticketRouter.put('/:ticket_id',verifyToken, _resolveTicket);
ticketRouter.get('/messages/:ticket_id',verifyToken, _getTicketMessages);
ticketRouter.post('/messages/:ticket_id', verifyToken, _addMessage);
ticketRouter.get('/knowledgebase', verifyToken, _getResolvedTicketsByStatus);
ticketRouter.get('/:ticket_id',verifyToken, _getCurrentTicket )

export default ticketRouter;