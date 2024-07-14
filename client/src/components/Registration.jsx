import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../App";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role_name, setRoleName] = useState(""); // Состояние для выбранной роли
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        BASE_URL + "/userdashboard/register",
        {
          username,
          email,
          password,
          role_name, // Передаем role_name в запросе
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setMessage("User registered successfully");
        navigate("/dashboard/register");
      }
    } catch (error) {
      console.log(error);
      setMessage("Check all registration forms");
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        backgroundColor: "#f9f9f9",
        boxSizing: "border-box",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        User Registration
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <label htmlFor="username" style={{ marginBottom: "5px" }}>
          User name:
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            padding: "8px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />

        <label htmlFor="email" style={{ marginBottom: "5px" }}>
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "8px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />

        <label htmlFor="password" style={{ marginBottom: "5px" }}>
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "8px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <label htmlFor="role_name" style={{ marginBottom: "5px" }}>
          Role:
        </label>
        <select
          id="role_name"
          value={role_name}
          onChange={(e) => setRoleName(e.target.value)} // Обработчик изменения выбора роли
          style={{
            padding: "8px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          <option value="">Select role</option>
          <option value="Admin">Admin</option> {/* Измененные значения option */}
          <option value="User">User</option> {/* Измененные значения option */}
        </select>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Register
        </button>
      </form>

      {message && (
        <div
          style={{
            marginTop: "10px",
            padding: "10px",
            borderRadius: "4px",
            backgroundColor: "#d4edda",
            color: "#155724",
            textAlign: "center",
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default Register;
