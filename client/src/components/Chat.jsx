// import React, { useEffect, useState, useContext } from 'react';
// import io from 'socket.io-client';
// import { AuthContext } from '../App';
// const socket = io(BASE_URL);

// const Chat = ({ ticket_id }) => {
//   const { userRole, userId } = useContext(AuthContext);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');

//   useEffect(() => {
//     socket.emit('joinTicketRoom', ticket_id);

//     socket.on('loadMessages', (loadedMessages) => {
//       setMessages(loadedMessages);
//     });

//     socket.on('message', (message) => {
//       setMessages((prevMessages) => [...prevMessages, message]);
//     });

//     return () => {
//       socket.off('message');
//       socket.emit('leaveTicketRoom', ticket_id);
//     };
//   }, [ticket_id]);

//   const sendMessage = () => {
//     if (newMessage.trim() !== '') {
//       socket.emit('message', {
//         ticket_id,
//         user_id: userId,
//         message: newMessage,
//       });
//       setNewMessage('');
//     }
//   };

//   return (
//     <div>
//       <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
//         {messages.map((msg, index) => (
//           <div key={index}>
//             <strong>{msg.user_id === userId ? 'You' : msg.user_id}:</strong> {msg.message} <em>{new Date(msg.timestamp).toLocaleTimeString()}</em>
//           </div>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={newMessage}
//         onChange={(e) => setNewMessage(e.target.value)}
//         style={{ width: '80%', padding: '10px', marginRight: '10px' }}
//       />
//       <button onClick={sendMessage} style={{ padding: '10px 20px' }}>
//         Send
//       </button>
//     </div>
//   );
// };

// export default Chat;
