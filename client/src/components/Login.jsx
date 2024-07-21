import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, TextField, Button, Typography, Link as MuiLink } from "@mui/material";
import { AuthContext } from "../App";
import { BASE_URL } from "../App";

const Login = ({ page }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const { setToken } = useContext(AuthContext);

  const navigate = useNavigate();

  const login = async () => {
    if (page === "Login") {
      try {
        const response = await axios.post(
          BASE_URL + "/login",
          {
            email,
            password,
          },
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          setToken(response.data);
          setMessage("");
          navigate("/");
        }
      } catch (error) {
        setMessage(error.response.data.msg);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      login();
    }
  };

  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to HelpDesk App
      </Typography>
      <Box 
        component="form" 
        sx={{ 
          width: '300px', 
          margin: '20px 0', 
          display: 'flex', 
          flexDirection: 'column' 
        }} 
        autoComplete='off'
      >
        <TextField
          sx={{ mb: 2 }}
          id='email'
          type='email'
          label='Enter your email'
          variant='outlined'
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <TextField
          sx={{ mb: 2 }}
          id='password'
          type='password'
          label='Enter your password'
          variant='outlined'
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button onClick={login} variant='contained'>
          {page}
        </Button>
      </Box>
      {message && (
        <Typography variant="body2" color="error">
          {message}
        </Typography>
      )}
      <Box 
        sx={{
          position: 'absolute',
          bottom: 20,
          right: 20,
        }}
      >
        <Typography variant="body2" color="textSecondary">
          2024 &copy; by{' '}
          <MuiLink href="https://github.com/AndreiRozhavskii" target="_blank" rel="noopener">
            AndreiR
          </MuiLink>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
