import React, {useState} from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

const Login =()=> {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const handleLogin = async(event) => {
      event.preventDefault();
      console.log(email, password);
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User logged in:", userCredential.user);
      } catch (error) {
        console.error("Error logging in:", error.message);
      }
    };
  
    return (
      <form className="container" name="login" onSubmit={handleLogin}>
        <p>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </p>
        <p>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            onChange={(event) => setPassword(event.target.value)}
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


