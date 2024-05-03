import React, { useContext } from "react";
import { UserContext } from "../utils/contexts/UserContext";

export function LogoutButton() {
  const { setIsLoggedIn } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      const response = await fetch("https://tasksync-unicorn-backend.onrender.com/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      if (response.ok) {
        setIsLoggedIn(false); // Update user context to reflect logout
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
