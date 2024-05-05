import { useState } from "react";
import useAlert from "../utils/hooks/useAlert";

export function CommentSection({ taskObj }) {
  const [comment, setComment] = useState("");
  const { setAlert } = useAlert();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const newComment = {
      content: comment,
    };
    console.log("New comm", newComment);
    try {
      const response = await fetch(
        `http://localhost:3000/api/workspaces/${taskObj.workspace_id}/${taskObj._id}/add_comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newComment),
          credentials: "include",
        }
      );

      if (response.ok) {
        setAlert("Comment submited", "success");
      }
    } catch (err) {
      setAlert("Comment not submitted. Try again later", "error");
    }
    setComment("");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="justify-end max-w-2xl bg-white rounded-lg border p-2 mx-auto mt-8"
    >
      <div className="px-3 mb-2 mt-2">
        <textarea
          placeholder="write comment"
          className="w-full bg-gray-100 rounded border border-gray-400 leading-normal resize-none h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
          value={comment} // Bind the textarea value to the comment state
          onChange={(e) => setComment(e.target.value)} // Update the comment state on textarea change
        ></textarea>
      </div>
      <div className="flex justify-end px-4">
        <input
          type="submit"
          className="px-2.5 py-1.5 rounded-md text-white text-sm bg-indigo-500"
          value="comment"
        />
      </div>
    </form>
  );
}
