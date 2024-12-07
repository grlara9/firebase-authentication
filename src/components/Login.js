import React, {useContext, useState} from "react";
import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";

const Login =(props)=> {
    const { onLogin, handleGoogleSignIn } = useContext(UserContext)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (event) => {
      event.preventDefault();
      console.log(email, password)
      onLogin(email, password);
    }

    
    return (
      <div className="form-container">
      <form className="container" name="login" onSubmit={handleLogin}>
        <p>
          <label htmlFor="email">Email:</label>
          <input
            id='email'
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </p>
        <p>
          <label htmlFor="password">Password:</label>
          <input
          id='password'
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </p>
        <p>
          <button type="submit" disabled={!email || !password}>
            Login
          </button>
        </p>
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </form>
          <button onClick={handleGoogleSignIn}>Google</button>
          </div>
    );
  };
  export default Login;


