import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addUser, fetchAllUsersData } from "../../slices/UserData";

const AddUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();

  const handleonChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      toast.warning("please fill all the fields");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.warning("both passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    dispatch(addUser(formData))
    .then((res)=>{
      console.log('response data of add user',res)
      fetchAllUsersData()
    })
  };
  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        type="button"
        className="text-white bg-primary-pink hover:bg-pink-800 focus:outline-none  font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-primary-pink "
      >
        Add User
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 w-full ">
          <div className=" bg-white rounded-lg shadow dark:bg-gray-700 relative p-4 w-full max-w-md">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Add a user
              </h3>

              <button
                onClick={() => setIsModalOpen(false)}
                type="button"
                className="end-2.5 cursor-pointer text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="authentication-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>
            <div className="p-4 md:p-5">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    User Name
                  </label>
                  <input
                    type="text"
                    name="userName"
                    id="userName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="john"
                    required=""
                    onChange={handleonChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="john@gmail.com"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required=""
                    onChange={handleonChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required=""
                    onChange={handleonChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirm password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    confirm password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required=""
                    onChange={handleonChange}
                  />
                </div>
                <div className="flex justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5"></div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add User
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddUser;
