import { useState } from "react";
import { CreateWorkspace } from "./CreateWorkspace";

export function CreateWorkspaceButton() {
  const [isOpened, setIsOpened] = useState(false);
  const handleClick = () => {
    setIsOpened(!isOpened);
  };
  return (
    <div className="flex justify-end mb-5">
      {isOpened && <CreateWorkspace setIsOpened={setIsOpened} />}
      <button
        className="w-40 rounded-lg py-1 px-2 pb-2 bg-blue-500 text-white"
        onClick={handleClick}
      >
        Create Workspace
      </button>
    </div>
  );
}
