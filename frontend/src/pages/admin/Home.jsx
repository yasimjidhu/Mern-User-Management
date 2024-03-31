import React from "react";
import Navbar from "../../components/admin/Navbar";
import Sidebar from "../../components/admin/Sidebar";

const Home = () => {
  return (
    <>
      <div className="sticky top-0">
        <Navbar />
      </div>
      <Sidebar className="sidebar" />
      <div className="flex justify-center items-center h-screen ml-60">
        <h1 className="text-black text-2xl font-bold">Welcome To DashBoard 👋</h1>
      </div>
    </>
  );
};

export default Home;
