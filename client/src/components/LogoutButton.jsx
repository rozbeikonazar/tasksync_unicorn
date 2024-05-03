import React, { useContext } from "react";
import { UserContext } from "../utils/contexts/UserContext";

export function LogoutButton() {
  const userContextData = useContext(UserContext);

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
        console.log("Logged out successfully!");
      } else {
        console.error("Logout failed:", response.statusText);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}
