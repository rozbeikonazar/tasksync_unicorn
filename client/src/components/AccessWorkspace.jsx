import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../utils/contexts/UserContext";
import useAlert from "../utils/hooks/useAlert";
import { TaskList } from "./TaskList";
import { CreateTask } from "./CreateTask";
import { API_URL } from "../config";

export function AccessWorkspace() {
  const { workspaceID } = useParams();
  const { setAlert } = useAlert();
  const [taskStatusDone, setTaskStatuDone] = useState([]);
  const [taskStatusInProgress, setTaskStatusInProgress] = useState([]);
  const [taskStatusNotStarted, setTaskStatusNotStarted] = useState([]);
  const [isOpened, setIsOpened] = useState(false);

  const handleClick = () => {
    setIsOpened(!isOpened);
  };

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch(
          `${API_URL}/api/workspaces/${workspaceID}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          const taskStatusDone = data.tasks.filter(
            (task) => task.status === "Done"
          );
          const taskStatusInProgress = data.tasks.filter(
            (task) => task.status === "In progress"
          );
          const taskStatusNotStarted = data.tasks.filter(
            (task) => task.status === "Not started"
          );
          setTaskStatuDone(taskStatusDone);
          setTaskStatusInProgress(taskStatusInProgress);
          setTaskStatusNotStarted(taskStatusNotStarted);
        }
      } catch (err) {
        setAlert("Task fetch failed. Try again later");
      }
    }
    fetchTasks();
  }, []);

  return (
    <div className="flex justify-center items-center h-65">
      {isOpened && <CreateTask setIsOpened={setIsOpened} />}
      <div className="w-full max-w-6xl">
        <h1 className="text-3xl font-semibold mb-4 text-center">Tasks</h1>
        <div className="flex justify-end mb-4">
          <button
            className="bg-blue-500 text-white rounded-lg text-lg py-1 px-3"
            onClick={handleClick}
          >
            Create Task
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <TaskList
            title="Not started tasks"
            tasks={taskStatusNotStarted}
            className="p-4 rounded-md bg-white shadow-md"
          />
          <TaskList
            title="In progress tasks"
            tasks={taskStatusInProgress}
            className="p-4 rounded-md bg-white shadow-md"
          />
          <TaskList
            title="Done tasks"
            tasks={taskStatusDone}
            className="p-4 rounded-md bg-white shadow-md"
          />
        </div>
      </div>
    </div>
  );
}
