import { useContext, useState } from "react";
import "../App.css";
import { UserContext } from "../utils/contexts/UserContext";
import { useNavigate } from 'react-router-dom';

export function LoginForm() {
  const userContextData = useContext(UserContext)
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  });
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Reset error messages
    setUsernameError("");
    setPasswordError("");
    setError("");

    if (!loginData.username || loginData.username.length < 5) {
      setUsernameError("Username is too short")
      return
    }

    if (!loginData.password || loginData.password.length < 8) {
      setPasswordError("Password is too short")
      return
    }

    try {
      const response = await fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData),
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        userContextData.setUserData((currentState) => ({
          ...currentState,
          id: data.user._id,
          displayName: data.user.display_name,
          username: data.user.username,
          isLoggedIn: true          
        }))
        navigate("/");
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      console.error("Network error");
    }
  };

  return (
    <div className={"mainContainer"}>
      <div className={"titleContainer"}>
        <div>Login</div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className={"inputContainer"}>
          <input
            type="text"
            value={loginData.username}
            onChange={(e) =>
              setLoginData((currentLoginData) => ({
                ...currentLoginData,
                username: e.target.value
              }))
            }
            placeholder="Enter your username here"
            className={"inputBox"}/>
            <label className="errorLabel">{usernameError}</label>
        </div>
        <div className={"inputContainer"}>
          <input
            type="password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData((currentLoginData) => ({
                ...currentLoginData,
                password: e.target.value
              }))
            }
            placeholder="Enter your password here"
            className={"inputBox"}/>
            <label className="errorLabel">{passwordError}</label>
        </div>
        <div>
        {error && <label className="errorLabel">{error}</label>}

        </div>
        <div className={"inputContainer"}>
          <button type="submit" className={"btn"}>
            Log in
          </button>
        </div>
      </form>
    </div>
  );
}
