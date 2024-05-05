import { useState } from "react";
import useAlert from "../utils/hooks/useAlert";

export function JoinWorkspace({ setIsOpened }) {
  const [invintationLink, setInvintationLink] = useState("");
  const invitationLinkRegex =
    /^localhost:3000\/api\/workspaces\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\/join$/;

  const { setAlert } = useAlert();
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!invintationLink) {
      setAlert("You have to pass an invintation link!", "error");
      return;
    }

    if (!invitationLinkRegex.test(invintationLink)) {
      setAlert("You have to pass a valid invitation link!", "error");
      return;
    }

    try {
      const response = await fetch(`http://${invintationLink}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        setIsOpened(false);
        setAlert("Join success. Refresh page", "success");
      } else if (response.status === 400) {
        const data = await response.json();
        setAlert(`${data.error}`, "error");
      } else {
        setAlert("Invintation Not Found", "error");
      }
    } catch (err) {
      setAlert("Join failed. Try again later");
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
          <label htmlFor="link" className="flex gap-3">
            <span className="text-xl">Paste an Invintation Link: </span>
            <input
              className="border border-black/60 rounded px-1 text-lg"
              onChange={(e) => {
                setInvintationLink(e.target.value);
              }}
            />
          </label>

          <button
            type="submit"
            className="bg-blue-500 text-white rounded-lg text-lg py-1 px-3"
          >
            Join
          </button>
        </form>
      </div>
    </div>
  );
}
