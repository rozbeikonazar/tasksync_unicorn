import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../utils/contexts/UserContext";
import useAlert from "../utils/hooks/useAlert";
import { API_URL } from "../config";

export function LogoutButton() {
  const userContextData = useContext(UserContext);
  const navigate = useNavigate();
  const { setAlert } = useAlert();

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_URL}/api/user/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        userContextData.setUserData((currentState) => ({
          ...currentState,
          isLoggedIn: false,
        })); // Update user context to reflect logout
        setAlert("Logout success!", "success");
        navigate("/");
      }
    } catch (error) {
      setAlert("Logout error. Try again", "error");
    }
  };

  return (
    <div className="bg-red-500 text-white py-1 px-2 rounded-lg">
      <button onClick={handleLogout} className="btn btn-link">
        Logout
      </button>
    </div>
  );
}
