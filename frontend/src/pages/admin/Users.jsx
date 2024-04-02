import React from "react";
import Navbar from "../../components/admin/Navbar";
import Sidebar from "../../components/admin/Sidebar";
import Table from "../../components/admin/Table";
import AddUser from "../../components/admin/AddUser";

const Users = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="ml-72 m-5">
        <Table />
      </div>
    </>
  );
};

export default Users;
