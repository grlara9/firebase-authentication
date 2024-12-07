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
    <form onSubmit={handleSignUp}>
      <label htmlFor="email">Email:</label>
      <input
        id='email'
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        id="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
       {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit" disabled={!email || !password}>Sign Up</button>
    </form>
  );
};

export default Register;
