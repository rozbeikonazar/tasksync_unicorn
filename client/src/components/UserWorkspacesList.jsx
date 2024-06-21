import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../utils/contexts/UserContext";
import { UserWorkspace } from "./UserWorkspace";
import { JoinedWorkspace } from "./JoinedWorkspace";
import { JoinWorkspaceButton } from "./JoinWorkspaceButton";
import { CreateWorkspaceButton } from "./CreateWorkspaceButton";
import { API_URL } from "../config";
export function UserWorkspacesList() {
  const userContextData = useContext(UserContext);
  const [userWorkspaces, setUserWorkspaces] = useState([]);
  const [joinedWorkspaces, setJoinedWorkspaces] = useState([]);

  useEffect(() => {
    async function fetchWorkspaces() {
      try {
        const response = await fetch(`${API_URL}/api/workspaces`, {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          const userWorkspaces = data.filter(
            (workspace) => workspace.creator_id == userContextData.id
          );
          const joinedWorkspaces = data.filter(
            (workspace) => workspace.creator_id != userContextData.id
          );
          setUserWorkspaces(userWorkspaces);
          setJoinedWorkspaces(joinedWorkspaces);
        } else {
          userContextData.setUserData((currentState) => ({
            ...currentState,
            isLoggedIn: false,
          }));
        }
      } catch (error) {
        console.error("Network error: ");
      }
    }

    fetchWorkspaces();
  }, []);

  return (
    <div className="">
      <div className="flex justify-between mb-5">
        <JoinWorkspaceButton />
        <CreateWorkspaceButton />
      </div>

      <h3 className="text-2xl font-semibold mb-5">User Workspaces</h3>
      <div className="grid grid-cols-4 gap-3 mb-10">
        {userWorkspaces.map((workspace) => (
          <div key={workspace._id}>
            <UserWorkspace workspace={workspace} />
          </div>
        ))}
      </div>

      <h3 className="text-2xl font-semibold mb-5">Joined Workspaces</h3>
      <div className="grid grid-cols-4 gap-3 mb-10">
        {joinedWorkspaces.map((workspace) => (
          <div key={workspace._id}>
            <JoinedWorkspace workspace={workspace} />
          </div>
        ))}
      </div>
    </div>
  );
}
