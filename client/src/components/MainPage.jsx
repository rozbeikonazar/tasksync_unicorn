import { useContext, useState} from "react"
import { UserWorkspacesList } from "./UserWorkspacesList";
import { UserContext } from "../utils/contexts/UserContext";
// import "../styles/MainPage.css"
import { ManageWorkspace } from "./ManageWorkspace";

export function MainPage(){
    const { isLoggedIn} = useContext(UserContext);
    return (
        <div className="container mx-auto pt-24">
            {isLoggedIn && <UserWorkspacesList/>}
        </div>
      );
    
}


