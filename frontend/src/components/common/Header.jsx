import React from "react";
import "/src/main.css";
import { FaUserPlus, FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="nav w-ful flex h-[80px]">
        <div className="w-[80%] logo-div m-auto">
          <h1 className="text-white text-3xl font-extrabold ml-6">FELLA</h1>
        </div>
        <div className="w-[20%] flex justify-around mr-10 items-center">
          <Link to='/signup'>
          <FaUserPlus className="text-4xl text-black" />
          </Link>
          <Link to='/logout'>
          <FaSignInAlt className="text-4xl text-black" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
