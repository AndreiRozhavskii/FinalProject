import { getAllTasks, createTask, } from "../models/models.js";

export const _getAllTasks = async (req, res) => {
    try {
        const tasks = await getAllTasks();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const _createTask = async (req, res) => {
    const { subject } = req.body;
    try {
        const newTask = await createTask(subject);
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const _editTask = async(req,res)=>{
    try {
        const ticketId = req.params.id;
        const { title, description, priority, customerID, supportAgentID } = req.body;
        const queryText = 'UPDATE Tickets SET title = $1, description = $2, priority = $3, customerID = $4, supportAgentID = $5 WHERE ticketID = $6 RETURNING *';
        const values = [title, description, priority, customerID, supportAgentID, ticketId];
        const result = await pool.query(queryText, values);
        if (result.rowCount === 0) {
          return res.status(404).send('Ticket not found');
        }
        res.json(result.rows[0]);
      } catch (error) {
        console.error('Error executing query', error);
        res.status(500).send('Internal Server Error');
      }
};

export const _deleteTicket = async(res,req) =>{
    try {
        const ticketId = req.params.id;
        const queryText = 'DELETE FROM Tickets WHERE ticketID = $1 RETURNING *';
        const result = await pool.query(queryText, [ticketId]);
        if (result.rowCount === 0) {
          return res.status(404).send('Ticket not found');
        }
        res.json({ message: 'Ticket deleted successfully' });
      } catch (error) {
        console.error('Error executing query', error);
        res.status(500).send('Internal Server Error');
      }
}