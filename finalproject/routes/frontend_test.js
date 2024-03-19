import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:3001/register', { username, password, role });
      alert('Registration successful');
    } catch (error) {
      console.error('Error registering user', error);
      alert('Error registering user');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/login', { username, password });
      setToken(response.data.token);
      setLoggedIn(true);
    } catch (error) {
      console.error('Error logging in', error);
      alert('Error logging in');
    }
  };

  const handleCreateTicket = async () => {
    try {
      // Дополнительная логика для создания тикета
      alert('Ticket created');
    } catch (error) {
      console.error('Error creating ticket', error);
      alert('Error creating ticket');
    }
  };

  const handleMarkAsSolved = async (ticketId) => {
    try {
      await axios.put(`http://localhost:3001/tickets/${ticketId}`, null, {
        headers: { Authorization: token }
      });
      alert('Ticket marked as solved');
    } catch (error) {
      console.error('Error marking ticket as solved', error);
      alert('Error marking ticket as solved');
    }
  };

  const handleSendEmail = async () => {
    try {
      // Дополнительная логика для отправки email
      alert('Email sent successfully');
    } catch (error) {
      console.error('Error sending email', error);
      alert('Error sending email');
    }
  };

  return (
    <div>
      {!loggedIn ? (
        <div>
          <h1>Register</h1>
          <label>Username: <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} /></label><br />
          <label>Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label><br />
          <label>Role: <input type="text" value={role} onChange={(e) => setRole(e.target.value)} /></label><br />
          <button onClick={handleRegister}>Register</button><br />
          <h1>Login</h1>
          <label>Username: <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} /></label><br />
          <label>Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label><br />
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div>
          <h1>Create Ticket</h1>
          <button onClick={handleCreateTicket}>Create Ticket</button><br />
          <h1>Send Email</h1>
          <button onClick={handleSendEmail}>Send Email</button>
        </div>
      )}
    </div>
  );
}

export default App;