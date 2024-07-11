import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { BASE_URL } from "../App";
import { AuthContext } from "../App";
import { Link } from "react-router-dom";

const Home = () => {
  const { userRole } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    getTickets();
  }, []);

  const getTickets = async () => {
    try {
      const response = await axios.get(BASE_URL + "/dashboard", {
        withCredentials: true,
      });
      setTickets(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const solveTicket = async (ticket_id) => {
    try {
      const response = await axios.put(
        BASE_URL + `/dashboard/${ticket_id}`,
        { status: "solved" },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      getTickets();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Your Tickets
      </h2>
      <ol style={{ listStyle: "none", padding: "0" }}>
        {tickets.map((ticket) => (
          <li
            key={ticket.ticket_id}
            style={{
              border: "1px solid black",
              margin: "10px",
              padding: "10px",
              borderRadius: "4px",
              backgroundColor: "#fff",
            }}
          >
            <div>
              <b>Title:</b> {ticket.title}
            </div>
            <div>
              <b>Description:</b> {ticket.description}
            </div>
            <div>
              <b>Status:</b> {ticket.status}
            </div>
            <div>
              <b>Priority:</b> {ticket.priority}
            </div>
            <div>
              <b>Created at:</b>{" "}
              {new Date(ticket.created_at).toLocaleString()}
            </div>
            <Link to={`/dashboard/${ticket.ticket_id}`}>
              TicketDetail
            </Link>
            <button
              onClick={() => solveTicket(ticket.ticket_id)}
              style={{
                marginLeft: "10px",
                padding: "8px 16px",
                fontSize: "14px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Solve Ticket
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Home;


