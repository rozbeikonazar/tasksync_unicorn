import { useState } from "react";
import { JoinWorkspace } from "./JoinWorkspace";

export function JoinWorkspaceButton() {
  const [isOpened, setIsOpened] = useState(false);
  const handleClick = () => {
    setIsOpened(!isOpened);
  };
  return (
    <div className="flex justify-start mb-5">
      {isOpened && <JoinWorkspace setIsOpened={setIsOpened} />}
      <button
        className="w-40 rounded-lg py-1 px-2 pb-2 bg-blue-500 text-white"
        onClick={handleClick}
      >
        Join Workspace
      </button>
    </div>
  );
}
