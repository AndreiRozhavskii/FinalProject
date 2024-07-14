import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../App";
import { BASE_URL } from "../App";

const Users = () => {
  const [users, setUsers] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(BASE_URL + "/userdashboard/users", {
            withCredentials: true, 
          });
        setUsers(response.data);
        
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, [token]);

  const handleDeleteUser = async (user_id) => {
    try {
      const data = await axios.delete(BASE_URL + `/userdashboard/delete/${user_id}`, {
        withCredentials: true, 
      });
      
      setUsers(data.data);
    
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9', display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ marginBottom: '20px' }}>User List</h2>
      {users.map(user => (
        <div key={user.user_id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ flex: '1', marginRight: '10px' }}>
            <strong>{user.username}</strong> ({user.email})
          </div>
          <button
            onClick={() => handleDeleteUser(user.user_id)}
            style={{ padding: '8px 12px', fontSize: '14px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Users;
