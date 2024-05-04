import React, { useContext} from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../utils/contexts/UserContext";

export function LogoutButton() {
  const userContextData = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/user/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      if (response.ok) {
        userContextData.setUserData((currentState) => ({
          ...currentState,
          isLoggedIn: false          
        })) // Update user context to reflect logout
        navigate('/')
        

      } else {
        console.error("Logout failed:", response.statusText);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div className={"inputContainer"}>
    <button onClick={handleLogout} className="btn">Logout</button>
    </div>
  );
}
