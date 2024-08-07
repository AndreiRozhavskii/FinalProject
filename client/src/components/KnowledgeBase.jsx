import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../App";
import { Link } from "react-router-dom";

const KnowledgeBase = (props) => {
  const [resolvedtickets, setResolvedtickets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date_desc"); 

  useEffect(() => {
    getTickets();
  }, []);

  const getTickets = async () => {
    try {
      const response = await axios.get(BASE_URL + "/dashboard/knowledgebase", {
        withCredentials: true,
      });
      setResolvedtickets(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const filteredTickets = resolvedtickets.filter((ticket) => {
    return (
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  if (sortBy === "date_asc") {
    filteredTickets.sort((a, b) => new Date(a.resolved_at) - new Date(b.resolved_at));
  } else if (sortBy === "date_desc") {
    filteredTickets.sort((a, b) => new Date(b.resolved_at) - new Date(a.resolved_at));
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>KnowledgeBase</h2>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search Tickets"
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ width: '100%', padding: '8px', fontSize: '16px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        <label htmlFor="sort-by" style={{ marginRight: '10px' }}>Sort by:</label>
        <select id="sort-by" value={sortBy} onChange={handleSortChange} style={{ padding: '8px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px' }}>
          <option value="date_asc">Date Ascending</option>
          <option value="date_desc">Date Descending</option>
        </select>
      </div>
      <ol style={{ listStyle: 'none', padding: '0' }}>
        {filteredTickets.map((ticket) => (
          <li key={ticket.ticket_id} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#fff' }}>
            <div style={{ marginBottom: '10px' }}>
              <strong>Title:</strong> {ticket.title}
            </div>
            <div style={{ marginBottom: '10px' }}>
              <strong>Description:</strong> {ticket.description}
            </div>
            <div style={{ marginBottom: '10px' }}>
              <strong>Status:</strong> {ticket.status}
            </div>
            <div style={{ marginBottom: '10px' }}>
              <strong>Resolved by:</strong> {ticket.resolved_by_username}
            </div>
            <div>
              <strong>Resolved at:</strong> {new Date(ticket.resolved_at).toLocaleString()}
            </div>
            <Link to={`/dashboard/${ticket.ticket_id}`} style={{ marginTop: '10px', display: 'inline-block', padding: '8px 16px', fontSize: '14px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', textDecoration: 'none' }}>Ticket History</Link>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default KnowledgeBase;
