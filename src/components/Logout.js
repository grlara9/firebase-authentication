import React, { useContext } from "react";
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import UserContext from "../context/UserContext";

const Logout = () => {
  const { logout } = useContext(UserContext)

    const handleLogout = async () =>{
        try { 
            await signOut(auth);
            logout();
            console.log("User logged out");
          } catch (error) {
            console.error("Error logging out:", error.message);
          } 
    }
    return <button onClick={handleLogout}>Logout</button>;
}

export default Logout