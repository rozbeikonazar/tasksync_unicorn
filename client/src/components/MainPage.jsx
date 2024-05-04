import { useContext} from "react"

import { Navbar } from "./Navbar";
import { UserWorkspacesList } from "./UserWorkspacesList";
import { UserContext } from "../utils/contexts/UserContext";
import "../styles/MainPage.css"

export function MainPage(){
    const { isLoggedIn} = useContext(UserContext);
    return (
        <div className="main-page-container">
          <div>
            <Navbar />
          </div>
          <div className="workspace-list-container">
            {isLoggedIn && <UserWorkspacesList />}
          </div>
        </div>
      );
    
}


