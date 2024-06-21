import { useState } from "react";
import useAlert from "../utils/hooks/useAlert";
import { API_URL } from "../config";
export function CreateWorkspace({ setIsOpened }) {
  const [workspaceName, setWorkspaceName] = useState("");
  const { setAlert } = useAlert();
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!workspaceName) {
      setAlert("Enter a name", "error");
      return;
    }
    const newWorkspace = { name: workspaceName };
    try {
      const response = await fetch(`${API_URL}/api/workspaces/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newWorkspace),
        credentials: "include",
      });
      if (response.status === 201) {
        setAlert("Workspace Created. Refresh a page", "success");
        setIsOpened(false);
      }
    } catch (err) {
      setAlert("Creation failed. Try again later");
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
            <span className="text-xl">Enter a name </span>
            <input
              className="border border-black/60 rounded px-1 text-lg"
              onChange={(e) => {
                setWorkspaceName(e.target.value);
              }}
            />
          </label>

          <button
            type="submit"
            className="bg-blue-500 text-white rounded-lg text-lg py-1 px-3"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
