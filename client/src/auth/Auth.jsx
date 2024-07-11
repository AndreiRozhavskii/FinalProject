import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../App";
import { BASE_URL } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from 'jwt-decode'

const Auth = (props) => {
  const { setToken, setUserRole, setUserID } = useContext(AuthContext);
  
  const [redirect, setRedirect] = useState(false);
  
  const navigate = useNavigate();

  useEffect(()=>{
    verify()
  },[])

  const verify = async () => {
    try {
      const response = await axios.get(BASE_URL + "/verify", {
        withCredentials: true,
      });
      
      if (response.status === 200) {
        setToken(response.data);
        if (response.data.token){
          const decoded=jwtDecode(response.data.token);
          
          setUserID(decoded.userid);
          setUserRole(decoded.userrole);
        }
        
        
        setRedirect(true);
      }
    } catch (error) {
      console.log(error);
      setRedirect(false);
      navigate("/login");
    }
  };

  return redirect ? props.children : null;
};
export default Auth;
