import React, { useState } from "react";
import useAlert from "../utils/hooks/useAlert";

export function ManageWorkspace({ workspaceObj, setIsOpened }) {
  const { setAlert } = useAlert();
  const [workspaceName, setWorkspaceName] = useState(workspaceObj.name);
  const [invintationLink, setInvintationLink] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newWorkspace = { ...workspaceObj, name: workspaceName };
    try {
      const response = await fetch(
        `http://localhost:3000/api/workspaces/${workspaceObj._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newWorkspace),
          credentials: "include",
        }
      );
      if (response.ok) {
        setIsOpened(false);
        setAlert("Update success. Refresh page", "success");
      }
    } catch (err) {
      setAlert("Update failed", "error");
    }
  };
  const handleDelete = async (event) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/workspaces/${workspaceObj._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        setIsOpened(false);
        setAlert("Deletion success. Refresh page", "success");
      }
    } catch (err) {
      setAlert("Deletion failed", "error");
    }
  };
  const handleGenerate = async (event) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/workspaces/${workspaceObj._id}/generate_invintation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (response.status === 201) {
        const data = await response.json();
        setInvintationLink(data.link.url);
        setAlert("Generation success. Refresh page", "success");
      }
    } catch (err) {
      setAlert("Generation failed", "error");
      console.log(err);
    }
  };

  return (
    <div className="fixed top-0 left-0 min-h-screen w-full flex items-center justify-center">
      <div
        className="cursor-pointer absolute top-0 left-0 min-h-screen w-full bg-black/40 backdrop-blur-sm"
        onClick={() => setIsOpened(false)}
      ></div>
      <div className="bg-white p-5 rounded-lg z-10">
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <label htmlFor="name" className="flex gap-3">
            <span className="text-xl">Workspace Name:</span>
            <input
              className="border border-black/60 rounded px-1 text-lg"
              value={workspaceName}
              onChange={(e) => {
                setWorkspaceName(e.target.value);
              }}
            />
          </label>

          <button
            type="submit"
            className="bg-blue-500 text-white rounded-lg text-lg py-1 px-3"
          >
            Update
          </button>
        </form>

        {invintationLink && (
          <span>
            Link:{" "}
            <a className="text-blue-500" href={invintationLink}>
              {invintationLink}
            </a>
          </span>
        )}
        <div className="flex gap-3 mt-5">
          <button
            className="bg-green-500 text-white rounded-lg text-lg py-1 px-3"
            onClick={handleGenerate}
          >
            Generate Invintation Link
          </button>

          <button
            className="bg-red-500 text-white rounded-lg text-lg py-1 px-3"
            onClick={handleDelete}
          >
            Delete Workspace
          </button>
        </div>
      </div>
    </div>
  );
}
