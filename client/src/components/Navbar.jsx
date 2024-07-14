import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../App";

const Navbar = () => {
  const { token, setToken, userRole } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    navigate("/login");
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px',
      backgroundColor: '#f0f0f0',
      borderRadius: '5px',
      flexWrap: 'wrap'
    }}>
      <Link to="/dashboard" style={{ textDecoration: 'none', color: 'black', border: '1px solid black', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
        <div>Home</div>
      </Link>

      <Link to="/dashboard/createticket" style={{ textDecoration: 'none', color: 'black', border: '1px solid black', padding: '10px', borderRadius: '5px', marginBottom: '10px', marginLeft: '10px' }}>
        <div>Create Ticket</div>
      </Link>

      <Link to="/dashboard/knowledgebase" style={{ textDecoration: 'none', color: 'black', border: '1px solid black', padding: '10px', borderRadius: '5px', marginBottom: '10px', marginLeft: '10px' }}>
        <div>Knowledge Base</div>
      </Link>

      {userRole === 1 && (
        <>
          <Link to="/dashboard/register" style={{ textDecoration: 'none', color: 'black', border: '1px solid black', padding: '10px', borderRadius: '5px', marginBottom: '10px', marginLeft: '10px' }}>
            <div>User Registration</div>
          </Link>

          <Link to="/dashboard/users" style={{ textDecoration: 'none', color: 'black', border: '1px solid black', padding: '10px', borderRadius: '5px', marginBottom: '10px', marginLeft: '10px' }}>
            <div>Users</div>
          </Link>
        </>
      )}

      {token ? (
        <button onClick={handleLogout} style={{ border: '1px solid black', padding: '10px', borderRadius: '5px', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer', marginLeft: '10px', marginBottom: '10px' }}>
          Logout
        </button>
      ) : (
        <Link to="/login" style={{ textDecoration: 'none', color: '#007bff', border: '1px solid black', padding: '10px', borderRadius: '5px', marginLeft: '10px', marginBottom: '10px' }}>
          <div>Login</div>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
