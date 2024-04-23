import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useUser } from './UserContext';
import './Login.css'
const Login = () => {
  const navigate = useNavigate();
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { loginUser } = useUser();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/user/getRegisteredUsers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: inputUsername,
          password: inputPassword,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.authenticated) {
          console.log("User authenticated successfully");
          console.log("Received user data:", data);
          loginUser({ username: data.name, token: data.token });
          localStorage.setItem("userName", data.name);
          localStorage.setItem("authToken", data.token);
          localStorage.setItem("loggedIn", true);
          setInputUsername("");
          setInputPassword("");
          setShowError(false);
          setTimeout(() => {
            navigate("/");
            window.location.reload(true); 
          }, 100);
        } else {
          setShowError(true);
          console.error("Incorrect username or password");
        }
      } else {
        setShowError(true);
        console.error("Authentication failed");
      }
    } catch (error) {
      setShowError(true);
      console.error("Error during authentication:", error);
    }

    setLoading(false);
  };

  return (
    <div className="sign-in__wrapper">
      <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
        <div className="h4 mb-2 text-center" style={{ color: '#1379b4' }}>Sign In</div>
        {showError && (
          <Alert className="mb-2" variant="danger" onClose={() => setShowError(false)} dismissible>
            Incorrect username or password. Please try again.
          </Alert>
        )}
        <Form.Group className="mb-2" controlId="username">
          <Form.Control
            type="text"
            value={inputUsername}
            placeholder="Email"
            onChange={(e) => setInputUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="password">
          <Form.Control
            type="password"
            value={inputPassword}
            placeholder="Password"
            onChange={(e) => setInputPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button className="w-100" variant="primary" type="submit" disabled={loading} style={{ backgroundColor: "#2fa4e7" }}>
          {loading ? "Logging In..." : "Log In"}
        </Button>
        <div className="mt-2 text-center">
          Not a user? <Link to="/register" style={{ color: "#2fa4e7" }}>Register</Link>
        </div>
      </Form>
    </div>
  );
};

export default Login;
