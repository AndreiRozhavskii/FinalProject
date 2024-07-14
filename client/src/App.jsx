import { useState, createContext, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Auth from "./auth/Auth";
import Navbar from "./components/Navbar";
import Register from "./components/Registration";
import Users from "./components/Users";
import CreateTicket from "./components/CreateTicket";
import "./App.css";
import KnowledgeBase from "./components/KnowledgeBase";
import TicketDetail from "./components/TicketDetail";

export const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
export const AuthContext = createContext();

function App() {
  const [token, setToken] = useState();
  const [userRole, setUserRole] = useState();
  const [userID, setUserID] = useState();

  return (
    <AuthContext.Provider value={{ token, setToken, setUserRole, userRole, setUserID, userID }}>
      <Routes>
        <Route path="/login" element={<Login page="Login" />} />
        <Route
          path="*"
          element={
            <Auth>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Home />} />
                <Route path="/dashboard/knowledgebase" element={<KnowledgeBase />} />
                <Route path="/dashboard/:ticket_id" element={<TicketDetail />} />
                <>
                  {userRole === 1 && (
                    <>
                      <Route path="/dashboard/register" element={<Register />} />
                      <Route path="/dashboard/users" element={<Users />} />
                    </>
                  )}
                  <Route path="/dashboard/createticket" element={<CreateTicket />} />
                </>
              </Routes>
            </Auth>
          }
        />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
