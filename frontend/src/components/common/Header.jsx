import React from "react";
import "/src/main.css";
import { FaUserPlus, FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const handleLogout = () => {
    fetch("/api/users/logout", {
      method: "POST",
      credentials: "same-origin",
    })
      .then((res) => {
        if (res.ok) {
          window.location.href = "/login";
        } else {
          console.log("logout failed");
        }
      })
      .catch((err) => {
        console.log("error during logout", err);
      });
  };
  return (
    <>
      <div className="nav w-ful flex h-[80px]">
        <div className="w-[80%] logo-div m-auto">
          <h1 className="text-white text-3xl font-extrabold ml-6">FELLA</h1>
        </div>
        <div className="w-[20%] flex justify-around mr-10 items-center">
          <Link to="/signup">
            <FaUserPlus className="text-4xl text-white" />
          </Link>
          <FaSignInAlt
            onClick={handleLogout}
            className="text-4xl text-white logout-icon cursor-pointer"
          />
        </div>
      </div>
    </>
  );
};

export default Header;
