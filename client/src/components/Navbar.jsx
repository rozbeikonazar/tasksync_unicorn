import React, { useContext } from "react";
import { UserContext } from "../utils/contexts/UserContext";
import { Link } from "react-router-dom";
import { LogoutButton } from "./LogoutButton";

export function Navbar() {
  const { isLoggedIn, displayName } = useContext(UserContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <Link className="navbar-brand" to="/">
          Home
        </Link>
        <div className="d-flex align-items-center">
          {isLoggedIn ? (
            <>
              <span className="navbar-text mr-2">Hello, {displayName}</span>
              <div style={{ marginLeft: "10px" }}> {/* Add proper stlyes to this button */}
                <LogoutButton />
              </div>
            </>
          ) : (
            <>
              <button className="btn btn-link">
                <Link to="/login">Login</Link>
              </button>
              <button className="btn btn-link">
                <Link to="/registration">Register</Link>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
