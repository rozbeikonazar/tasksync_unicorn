import React, { useState } from "react";
import { ManageWorkspace } from "./ManageWorkspace";
import { Link } from "react-router-dom";

export function UserWorkspace({ workspace }) {
  const [isOpened, setIsOpened] = useState(false);
  const [workspaceObj, setWorkspaceObj] = useState();

  const handleClick = () => {
    setIsOpened(!isOpened);
    setWorkspaceObj(workspace);
  };

  return (
    <div className="rounded-lg border border-black p-4">
      {isOpened && (
        <ManageWorkspace
          workspaceObj={workspaceObj}
          setIsOpened={setIsOpened}
        />
      )}
      <div key={workspace._id} className="">
        <h3 className="mb-3 text-xl font-semibold">{workspace.name}</h3>
        <div className="flex gap-2">
          <Link
            to={`/workspace/${workspace._id}`}
            className="rounded-lg py-1 px-2 bg-green-500 text-white"
          >
            Access Workspace
          </Link>
          <button
            className="w-24 rounded-lg py-1 px-2 bg-blue-500 text-white"
            onClick={handleClick}
          >
            Manage
          </button>
        </div>
      </div>
    </div>
  );
}
