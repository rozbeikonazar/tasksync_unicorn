import { useState } from "react";
import { TaskDetails } from "./TaskDetails";
export function TaskList({ title, tasks }) {
  const [isOpened, setIsOpened] = useState(false);
  const [taskObj, setTaskObj] = useState("");

  const handleClick = (task) => {
    setIsOpened(!isOpened);
    setTaskObj(task);
  };

  return (
    <div className="rounded-lg border border-black p-4">
      {isOpened && <TaskDetails taskObj={taskObj} setIsOpened={setIsOpened} />}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {tasks.map((task) => (
        <div key={task._id} className={`mb-2 ${getStatusColor(task.status)}`}>
          <button
            className="font-medium text-white rounded-lg text-lg py-1 px-3"
            onClick={() => handleClick(task)}
          >
            {task.name}
          </button>
        </div>
      ))}
    </div>
  );
}

function getStatusColor(status) {
  switch (status) {
    case "Not started":
      return "bg-gray-400";
    case "In progress":
      return "bg-blue-400";
    case "Done":
      return "bg-green-400";
    default:
      return "";
  }
}
