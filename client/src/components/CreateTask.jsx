import { useState, useContext } from "react";
import useAlert from "../utils/hooks/useAlert";
import { UserContext } from "../utils/contexts/UserContext";
import { useParams } from "react-router-dom";
import { API_URL } from "../config";
export function CreateTask({ setIsOpened }) {
  const { workspaceID } = useParams();
  const { setAlert } = useAlert();
  const [taskData, setTaskData] = useState({
    name: "",
    description: "",
    status: "Not started",
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!taskData.name) {
      setAlert("Name must be provided.", "error");
      return;
    }
    // if (!taskData.deadline) {
    //   // Deadline can be null, but backend will not accept deadline: '' since it waits for ISO8601 format
    //   // instead of passing a "", I will remove deadline field from the object if value was not passed
    //   console.log("We are here");
    //   const { deadline, ...updatedTaskData } = taskData;
    //   setTaskData(updatedTaskData);
    // }
    try {
      const response = await fetch(
        `${API_URL}/api/workspaces/${workspaceID}/add_task`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(taskData),
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
              id="name"
              value={taskData.name}
              className="border border-black/60 rounded px-1 text-lg"
              onChange={(e) => {
                setTaskData((currentTaskData) => ({
                  ...currentTaskData,
                  name: e.target.value,
                }));
              }}
            />
          </label>
          <label htmlFor="description" className="flex gap-3">
            <span className="text-xl">Enter a description </span>
            <input
              id="description"
              value={taskData.description}
              className="border border-black/60 rounded px-1 text-lg"
              onChange={(e) => {
                setTaskData((currentTaskData) => ({
                  ...currentTaskData,
                  description: e.target.value,
                }));
              }}
            />
          </label>
          <label htmlFor="status" className="flex gap-3">
            <span className="text-xl">Task Status:</span>
            <select
              className="border border-black/60 rounded px-1 text-lg"
              id="status"
              value={taskData.status}
              onChange={(e) => {
                setTaskData((currentTaskData) => ({
                  ...currentTaskData,
                  status: e.target.value,
                }));
              }}
            >
              <option value="Not started">Not started</option>
              <option value="In progress">In progress</option>
              <option value="Done">Done</option>
            </select>
          </label>
          {/* <label htmlFor="deadline" className="flex gap-3">
            <span className="text-xl">Deadline:</span>
            <input
              className="border border-black/60 rounded px-1 text-lg"
              type="date"
              id="deadline"
              value={taskData.deadline}
              onChange={(e) => {
                setTaskData((currentTaskData) => ({
                  ...currentTaskData,
                  deadline: e.target.value,
                }));
              }}
            />
          </label> */}

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
