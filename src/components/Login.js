import React, {useContext, useState} from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import UserContext from "../context/UserContext";

const Login =(props)=> {
  const {onLogin} = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const handleLogin = (e) => {
      e.preventDefault();
      console.log(email, password);
      onLogin(email, password)
      
    };
  
    return (
      <form className="container" name="login" onSubmit={handleLogin}>
        <p>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </p>
        <p>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </p>
        <p>
          <button type="submit" disabled={!email && !password}>
            Login
          </button>
        </p>
      </form>
    );
  };
  export default Login;


