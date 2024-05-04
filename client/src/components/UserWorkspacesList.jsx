import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../utils/contexts/UserContext";
import "../styles/workspace.css";
import { QuitWorkspaceButton } from "./QuitWorkspaceButton";

export function UserWorkspacesList() {
  const userContextData = useContext(UserContext);
  const [userWorkspaces, setUserWorkspaces] = useState([]);
  const [joinedWorkspaces, setJoinedWorkspaces] = useState([]);

  useEffect(() => {
    async function fetchWorkspaces() {
      try {
        const response = await fetch("http://localhost:3000/api/workspaces", {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          const userWorkspaces = data.filter(workspace => workspace.creator_id == userContextData.id);
          const joinedWorkspaces = data.filter(workspace => workspace.creator_id != userContextData.id);
          setUserWorkspaces(userWorkspaces);
          setJoinedWorkspaces(joinedWorkspaces);
        } else {
          userContextData.setUserData((currentState) => ({
            ...currentState,
            isLoggedIn: false          
          }))
        }
      } catch (error) {
        console.error("Network error: ");
      }
    }

    fetchWorkspaces();
  }, []);

  return (
    <div>
      <h3>User Workspaces</h3>
      <div className="workspace-list-container">      
        {userWorkspaces.map((workspace) => (
          <div key={workspace._id} className="user-workspace-container">
            <h3>{workspace.name}</h3>
            <Link to={`/workspace/${workspace._id}`} className="btn">
              Join
            </Link>
            
          </div>
        ))}
        <h2> Joined workspaces</h2>
        {joinedWorkspaces.map((workspace) => (
          <div key={workspace._id} className="user-workspace-container">
            <h3>{workspace.name}</h3>
            <Link to={`/workspace/${workspace._id}`} className="btn">
              Join
            </Link>
            <QuitWorkspaceButton workspaceID={workspace._id} />

          </div>
        ))}
      </div>
    </div>
  );
}
