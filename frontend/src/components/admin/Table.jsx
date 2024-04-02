import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  fetchAllUsersData,
  fetchUserData,
} from "../../slices/UserData";
import useGetReqHook from "../../hooks/useGetReqHook";
import baseUrl from "../../Redux/constants/constants";
import Modal from "./Modal";
import { toast } from "react-toastify";
import axios from "axios";
import handleDeleteUser from "./alert";
import AddUser from "./AddUser";

const Table = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [allUsersData, setAllUsersData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deletionLoading, setDeletionLoading] = useState(false);
  const [editedUserData, setEditedUserData] = useState([]);
  const [editName, setEditName] = useState({
    userName: "",
    userId: "",
  });

  const searchedUser = useSelector((state) => state.userData);
  const { loading, error, getRequest } = useGetReqHook();
  const fullUsersdata = useSelector((state) => state?.userData?.userData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsersData());
  }, [dispatch]);

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    dispatch(fetchUserData(query));
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };


  const handleDeleteButtonClick = async (userId) => {
    const isConfirmed = await handleDeleteUser();
    console.log("isconfirmed", isConfirmed);

    if (isConfirmed) {
      dispatch(deleteUser(userId));
    }
  };


  return (
    <>
      <AddUser />

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {showModal && (
          <div className="fixed flex items-center w-[1000px] justify-center  bg-opacity-20 z-50">
            <Modal
              className="m-auto"
              user={selectedUser}
              closeModal={() => setShowModal(false)}
            />
          </div>
        )}

        <div className={`${showModal ? "opacity-30" : ""}`}>
          <div className="pb-4 bg-white dark:bg-gray-900 p-7">
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative mt-0">
              <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none ">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="table-search"
                className="block pt-2 ps-10 text-sm text-gray-900 py-2 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for items"
                onChange={handleSearchInputChange}
              />
            </div>
          </div>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4">
                  profile
                </th>
                <th scope="col" className="px-6 py-3">
                  User Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Edit
                </th>
                <th scope="col" className="px-6 py-3">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {searchedUser?.userData ? (
                searchedUser?.userData?.map((user) => (
                  <tr
                    key={user._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-900 dark:hover:bg-gray-900"
                  >
                    <td className="p-3">
                      <img
                        className="w-[50px] rounded-full"
                        src={
                          user.profile
                            ? `${baseUrl}/${user.profile}`
                            : "/images/user.png"
                        }
                        alt="profile"
                      />
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {user.userName}
                    </td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">
                      <button
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => handleEditClick(user)}
                      >
                        Edit
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() => handleDeleteButtonClick(user._id)}
                        className="font-medium text-red-800 dark:text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : fullUsersdata?.length > 0 ? (
                fullUsersdata.map((user, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-900 dark:hover:bg-gray-900"
                  >
                    <td className="p-3">
                      <img
                        className="w-[50px] rounded-full"
                        src={
                          user.profile
                            ? `${baseUrl}/${user.profile}`
                            : "/images/user.png"
                        }
                        alt="profile"
                      />
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {user.userName}
                    </td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">
                      <button
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => handleEditClick(user)}
                      >
                        Edit
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() => {
                          handleDeleteButtonClick(user._id);
                        }}
                        className="font-medium text-red-800 dark:text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <>
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center text-xl font-bold text-black"
                    >
                      No Users found
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Table;
