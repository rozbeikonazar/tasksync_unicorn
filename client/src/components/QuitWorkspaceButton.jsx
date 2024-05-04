import { useContext } from "react";
import { UserContext } from "../utils/contexts/UserContext";
import { useNavigate } from "react-router-dom";
import "../App.css";



export function QuitWorkspaceButton({workspaceID}) {
    const userContextData = useContext(UserContext)
    const navigate = useNavigate()

    const handleQuit = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/workspaces/${workspaceID}/quit`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include'

            });
            if (response.ok) {
                // show the message that quit is  sucessful
                navigate('/')
            }
            else if (response.status === 400) {
                const data = await response.json();
                console.log(data.error)
            }
            else if (response.status === 401) {
                // status code 401
                userContextData.setUserData((currentState) => ({
                    ...currentState,
                    isLoggedIn: false          
                  }));
            }

        }
        catch (err) {
            console.error('Network error', err)

        }
    }

    return (
        <button onClick={handleQuit} className={"btn"}> Quit </button>
    )
}