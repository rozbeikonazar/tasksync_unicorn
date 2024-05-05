import useAlert from "../utils/hooks/useAlert";
import { Link } from "react-router-dom";

export function JoinedWorkspace({ workspace }) {
  const { setAlert } = useAlert();

  const handleQuit = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/workspaces/${workspace._id}/quit`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        setAlert("Successfully quited. Reload a page", "success");
      }
    } catch (err) {
      setAlert("Could not quit. Try again later", "error");
    }
  };
  return (
    <div className="rounded-lg border border-black p-4">
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
            onClick={handleQuit}
          >
            Quit
          </button>
        </div>
      </div>
    </div>
  );
}
