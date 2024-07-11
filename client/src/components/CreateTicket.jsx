import { useState, useEffect } from "react";
import { BASE_URL } from "../App";
import axios from "axios";

const CreateTicket =(props)=>{
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [priority, setPriority] = useState("low");
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");
        setSuccessMessage("");
    
        try {
          const response = await axios.post(
            BASE_URL + "/dashboard/createticket",
            {
              title,
              description,
              priority,
            },
            { withCredentials: true }
          );
          
          if (response.status === 201) {
            setSuccessMessage("Ticket created successfully.");
            setTitle("");
            setDescription("");
          }
        } catch (error) {
          setErrorMessage("Failed to create ticket. Please try again later.");
          console.error("Error creating ticket:", error);
        } finally {
          setIsLoading(false);
        }
      };
      return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Create Ticket</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <label htmlFor="title" style={{ marginBottom: '5px' }}>Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{ padding: '8px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
    
            <label htmlFor="description" style={{ marginBottom: '5px' }}>Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={{ padding: '8px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px', minHeight: '100px' }}
            />
    
            <label htmlFor="priority" style={{ marginBottom: '5px' }}>Priority:</label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              style={{ padding: '8px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px' }}
            >
              <option value="high">High</option>
              <option value="middle">Middle</option>
              <option value="low">Low</option>
            </select>
    
            <button
              type="submit"
              disabled={isLoading}
              style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              {isLoading ? "Creating..." : "Create Ticket"}
            </button>
          </form>
    
          {errorMessage && (
            <div style={{ marginTop: '10px', padding: '10px', borderRadius: '4px', backgroundColor: '#ffcaca', color: '#d8000c', textAlign: 'center' }}>
              {errorMessage}
            </div>
          )}
    
          {successMessage && (
            <div style={{ marginTop: '10px', padding: '10px', borderRadius: '4px', backgroundColor: '#d4edda', color: '#155724', textAlign: 'center' }}>
              {successMessage}
            </div>
          )}
        </div>
      );
    };
    
    export default CreateTicket;
    