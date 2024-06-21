import React, { useState, useEffect, useContext } from "react";
import useAlert from "../utils/hooks/useAlert";
import { UserContext } from "../utils/contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { CommentSection } from "./CommentSection";
import { API_URL } from "../config";

export function TaskDetails({ taskObj, setIsOpened }) {
  const [taskData, setTaskData] = useState(taskObj);
  const userContextData = useContext(UserContext);
  const navigate = useNavigate();

  const [comments, setComments] = useState([]);
  const { setAlert } = useAlert();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedTask = { ...taskObj, ...taskData };
    try {
      const response = await fetch(
        `${API_URL}/api/workspaces/${taskObj.workspace_id}/${taskObj._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTask),
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
    event.preventDefault();
    try {
      const response = await fetch(
        `${API_URL}/api/workspaces/${taskObj.workspace_id}/${taskObj._id}`,
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

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await fetch(
          `${API_URL}/api/workspaces/${taskObj.workspace_id}/${taskObj._id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          const contentArray = data.comments.map((comment) => comment.content);
          setComments(contentArray.reverse());
        } else if (response.status === 401) {
          userContextData.setUserData((currentState) => ({
            ...currentState,
            isLoggedIn: false,
          }));
          navigate("/login");
          setAlert("Session endened.", "info");
        }
      } catch (error) {
        console.error("Network error: ");
      }
    }

    fetchComments();
  }, []);
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
              value={taskObj.deadline}
              onChange={(e) => {
                setTaskData((currentTaskData) => ({
                  ...currentTaskData,
                  deadline: e.target.value,
                }));
              }}
            />
          </label> */}
          <div className="flex justify-stretch gap-3 mt-30">
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-lg text-lg py-1 px-3 "
            >
              Update
            </button>
          </div>
        </form>

        <div className="flex justify-center gap-3 mt-5">
          <button
            className="bg-red-500 text-white rounded-lg text-lg py-1 px-3"
            onClick={handleDelete}
          >
            Delete Task
          </button>

          {/* <button
            className="bg-green-500 text-white rounded-lg text-lg py-1 px-3"
            // onClick={handleGenerate}
          >
            Submit Comment
          </button> */}
        </div>

        <div className="p-3 bg-gray-100 rounded-lg shadow-md mt-8">
          <span className="text-lg font-semibold mb-3 block">Comments:</span>
          {comments.map((comment, index) => (
            <div
              key={index}
              className="border border-gray-300 p-4 mt-2 rounded-lg shadow-sm"
            >
              <p className="text-gray-700">{comment}</p>
            </div>
          ))}
          <CommentSection taskObj={taskObj} />
        </div>
      </div>
    </div>
  );
}
