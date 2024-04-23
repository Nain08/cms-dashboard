import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "./Register.css"; 
import { useNavigate } from "react-router-dom"; 
import { Link } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [group, setGroup] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      
      const response = await fetch('http://localhost:8080/user/addNewUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          group
        }),
      });

      if (response.ok) {
        console.log('User registered successfully');
        setName("");
        setGroup("");
        setEmail("");
        setPassword("");
        window.alert("Registered successfully. Kindly login")
        navigate("/login"); 
      } 
    //   else if (response.status === 400) {
    //     const errorData = await response.json();
    //     setShowError(true);
    //     setErrorMessage(errorData.message);
    //     console.error('Registration failed:', errorData.message);
    //   }
      else {
        const errorData = await response.json();
        setShowError(true);
        setErrorMessage(errorData.message);
        console.error('Registration failed:', errorData.message);
      }
    } catch (error) {
      setShowError(true);
      setErrorMessage('Error during registration. Please try again.');
      console.error('Error during registration:', error);
    }

    setLoading(false);
  };

  return (
    <div className="registration__wrapper" >
      <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
        <div className="h4 mb-2 text-center" style={{color:'#1379b4'}}>Register</div>
        {showError && (
          <Alert className="mb-2" variant="danger" onClose={() => setShowError(false)} dismissible>
            {errorMessage}
          </Alert>
        )}
        <Form.Group className="mb-2" controlId="name">
          <Form.Control
            type="text"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
 
        <Form.Group className="mb-2" controlId="email">
          <Form.Control
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="password">
          <Form.Control
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="group">
          <Form.Control
            as="select"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            required
          >
            <option value="">Select Group</option>
            <option value="Admin">Admin</option>
            <option value="Registered" >Registered</option>
          </Form.Control>
        </Form.Group>
        {!loading ? (
          <Button className="w-100" variant="primary" type="submit" style={{backgroundColor: "#2fa4e7"}}>
            Register
          </Button>
        ) : (
          <Button className="w-100" variant="dark" type="submit" disabled>
            Registering...
          </Button>
        )}
        <div className="mt-2 text-center">
          Already a user? <Link to="/login" style={{color: "#2fa4e7"}}>Login</Link>
        </div>
      </Form>
    </div>
  );
};

export default Register;

