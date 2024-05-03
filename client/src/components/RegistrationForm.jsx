import { useState } from "react";
import "../App.css";

export function RegistrationForm() {
    const [registrationData, setRegistrationData] = useState({
        "username": "",
        "password": "",
        "display_name": ""
    });
    const [nameError, setNameError] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setNameError("");
        setUsernameError("");
        setPasswordError("");
        setError("");

        // Validation
        if (!registrationData.display_name) {
            setNameError("Please enter a name");
            return;
        }
        if (!registrationData.username || registrationData.username.length < 5) {
            setUsernameError("Username is too short");
            return;
        }
        if (!registrationData.password || registrationData.password.length < 8) {
            setPasswordError("Password is too short");
            return;
        }

        try {
            const response = await fetch('https://tasksync-unicorn-backend.onrender.com/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registrationData)
            });
            if (response.ok) {
                const data = await response.json();
                // registration successful
            } else {
                setError("Registration failed");
                console.log(data.message);
            }
        } catch (error) {
            console.error("Network error");
        }
    };

    return (
    <div className={"mainContainer"}>
        <div className={"titleContainer"}>
            <div>Registration</div>
        </div>
       
        <form onSubmit={handleSubmit}>
            <div className={"inputContainer"}>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    value={registrationData.display_name}
                    onChange={(e) => setRegistrationData((currentRegistrationData) => ({
                        ...currentRegistrationData,
                        display_name: e.target.value
                    }))}
                    placeholder="Enter your name here"
                    className={"inputBox"}
                />
                <label className="errorLabel">{nameError}</label>
            </div>

            <div className={"inputContainer"}>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    value={registrationData.username}
                    onChange={(e) => setRegistrationData((currentRegistrationData) => ({
                        ...currentRegistrationData,
                        username: e.target.value
                    }))}
                    placeholder="Enter your username here"
                    className={"inputBox"}
                />
                <label className="errorLabel">{usernameError}</label>
            </div>
            
            <div className={"inputContainer"}>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={registrationData.password}
                    onChange={(e) => setRegistrationData((currentRegistrationData) => ({
                        ...currentRegistrationData,
                        password: e.target.value
                    }))}
                    placeholder="Enter your password here"
                    className={"inputBox"}
                />
                <label className="errorLabel">{passwordError}</label>
            </div>

            <div>
                {error && <label className="errorLabel">{error}</label>}
            </div>
            
            <div className={"inputContainer"}>
                <button type="submit" className={"inputButton"}>Register</button>
            </div>
        </form>
    </div>
    );
}
