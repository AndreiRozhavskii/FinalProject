
// import { Server } from "socket.io";
// import { addTicketResponse, getTicketResponses } from "./models/ticketModels.js";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// dotenv.config();

// const verifyToken = (token) => {
//   return new Promise((resolve, reject) => {
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(decoded);
//       }
//     });
//   });
// };

// export const initializeSocket = (server) => {
//   const io = new Server(server, {
//     cors: {
//       origin: "http://localhost:5173",
//       credentials: true
//     }
//   });

//   io.use(async (socket, next) => {
//     const token = socket.handshake.auth.token;

//     try {
//       if (!token) {
//         throw new Error("No token provided");
//       }

//       const decoded = await verifyToken(token);
//       socket.user = {
//         user_id: decoded.userid,
//         user_email: decoded.useremail,
//         user_role: decoded.userrole
//       };
//       next();
//     } catch (error) {
//       console.error("Socket authentication error:", error.message);
//       next(new Error("Authentication error"));
//     }
//   });

//   io.on("connection", (socket) => {
//     console.log("New client connected");

//     socket.on("joinTicketRoom", async ({ ticket_id }) => {
//       socket.join(ticket_id);
//       const messages = await getTicketResponses(ticket_id);
//       socket.emit("loadMessages", messages);
//     });

//     socket.on("message", async ({ ticket_id, message }) => {
//       const newMessage = {
//         ticket_id,
//         user_id: socket.userid,
//         response_text: message,
//         responded_at: new Date()
//       };
//       await addTicketResponse(ticket_id, message, socket.userid);
//       io.to(ticket_id).emit("message", newMessage);
//     });

//     socket.on("disconnect", () => {
//       console.log("Client disconnected");
//     });
//   });

//   return io;
// };
