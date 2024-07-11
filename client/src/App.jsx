import { useState, createContext } from "react";
import { Routes, Route, Navigate} from "react-router-dom";
import axios from "axios";
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
  const [userRole,setUserRole] = useState();
  const [userID, setUserID]=useState();


  return (
    <AuthContext.Provider value={{ token, setToken,setUserRole, userRole, setUserID, userID }}>
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
                      <Route path="/dashboard/register" element={<Register />} />
                    )}
                    {userRole === 1 && (
                      <Route path="/dashboard/users" element={<Users />} />
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
// function App() {
//   const [token, setToken] = useState();

//   return (
//     <AuthContext.Provider value={{ token, setToken }}>
      
//       <Routes>
        
//       <Route
//         path="/"
//         element={
//           token ? (
//             <Auth>
//               <Navbar/>
//               <Home />
//             </Auth>
//           ) : (
//             <Navigate to="/login" />
//           )
//         }
//       />
//         <Route path='/login' element={<Login page="Login"/>}/> 
//         <Route path='/dashboard/knowledgebase' element={<Auth><Navbar/><KnowledgeBase /></Auth>}/>
//         <Route path='/dashboard/register' element={<Auth><Navbar/><Register /></Auth>}/>
//         <Route path='/dashboard/users' element={<Auth><Navbar/><Users /></Auth>}/>
//         <Route path='/dashboard/createticket' element={<Auth><Navbar/><CreateTicket /></Auth>}/>
//         <Route path='/dashboard' element={<Auth><Navbar/><Home /></Auth>}/>
//       </Routes>
      
//     </AuthContext.Provider>
//   );
// }

// export default App;
