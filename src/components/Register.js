import React, { useState, useContext } from "react";
import UserContext from "../context/UserContext";


const Register = (props) => {
  const { onRegister } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  
  const validateInput = () => {
    
    // Password validation
    if (password.length < 12) {
      setError("Password must be at least 12 characters long.");
      return false;
    }

    // Clear errors if validation passes
    setError(null);
    return true;
  };

  const handleSignUp = async(e) => {
    e.preventDefault();
     // Validate inputs
    if(!validateInput()) return;
    onRegister(email, password)
  };

  return (
    <div className="form-container">
        <form  onSubmit={handleSignUp}>
          <h1>Register</h1>
          <label htmlFor="email">Email:</label>
          <input
            id='email'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
           <label htmlFor="password">Email:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit" disabled={!email || !password}>Sign Up</button>
        </form>
    </div>
  );
};

export default Register;
