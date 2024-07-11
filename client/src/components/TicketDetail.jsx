import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../App";

const TicketDetail = () => {
  const { ticket_id } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    getTicketMessages();
    getTicket();
  }, []);

  const sendMessage = async () => {
    try {
      await axios.post(`${BASE_URL}/dashboard/messages/${ticket_id}`, {
        text: newMessage,
      }, {
        withCredentials: true,
      });
      setNewMessage("");
      getTicketMessages();
    } catch (error) {
      console.log(error);
    }
  };

  const getTicketMessages = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/dashboard/messages/${ticket_id}`, {
        withCredentials: true,
      });
      setMessages(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTicket = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/dashboard/${ticket_id}`, {
        withCredentials: true,
      });
      setTicket(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {ticket !== null && (
        <>
          <h2 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '24px', color: '#333' }}>Ticket Details</h2>
          <div style={{ backgroundColor: '#f0f0f0', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>Title:</h3>
            <p style={{ fontSize: '16px', marginBottom: '10px' }}>{ticket.title}</p>
            <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>Description:</h3>
            <p style={{ fontSize: '16px', marginBottom: '10px' }}>{ticket.description}</p>
            <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>Status:</h3>
            <p style={{ fontSize: '16px' }}>{ticket.status}</p>
          </div>
        </>
      )}
      <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>Messages:</h3>
      <ul style={{ listStyleType: 'none', padding: '0' }}>
        {messages.map(message => (
          <li key={message.message_id} style={{ marginBottom: '20px', border: '1px solid #ccc', borderRadius: '8px', padding: '15px' }}>
            <div><b>From:</b> {message.from_username}</div>
            <div><b>To:</b> {message.to_username}</div>
            <div><b>Text:</b> {message.text}</div>
            <div><b>Sending Time:</b> {new Date(message.created_at).toLocaleString()}</div>
          </li>
        ))}
      </ul>
      <textarea
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Enter your message"
        style={{ width: '100%', padding: '8px', fontSize: '16px', marginBottom: '20px', border: '1px solid #ccc', borderRadius: '4px' }}
      />
      <button onClick={sendMessage} style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '10px 20px', fontSize: '16px', borderRadius: '4px' }}>Send Message</button>
    </div>
  );
};

export default TicketDetail;
