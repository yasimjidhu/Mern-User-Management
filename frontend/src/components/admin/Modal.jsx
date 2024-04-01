import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { editUserName } from "../../slices/PasswordResetSlice";

const Modal = ({ user, closeModal }) => {
  
   const unchangedUserName = user.userName;
   const [editedUser,setEditedUser] = useState(user)
   const [success,setSuccess] = useState(false)

   const dispatch = useDispatch()

   const handleInputChange = (e)=>{
    const {name,value} = e.target
    setEditedUser((prevUser)=>({
        ...prevUser,
        [name]:value,
    }))
   }

   const validateForm =()=>{
    if(!editedUser.userName){
      toast.error('please fill the field')
      return false
    }
    if(unchangedUserName === editedUser.userName){
      toast.warning('make any changes to continue')
      return false
    }
    return true
   }

   const handleSubmit = async (e)=>{
    e.preventDefault()
    if(!validateForm()){
      return
    }
   
    dispatch(editUserName(editedUser))
    .then((res)=>{
      closeModal()
      setSuccess(true)
      console.log('this is the modal edited data after success',res)
    })
    .catch((error)=>{
      console.log('error updating user',error)
      toast.error('failed to update the user')
    })
   }

   useEffect(()=>{
    if(success){
      console.log('use effect called')
    }
   },[success])

  return (
    <>
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Edit the user details
            </h3>
            <button
              onClick={closeModal}
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
                  placeholder=""
                  required=""
                  value={editedUser.userName}
                  onChange={handleInputChange}
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
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required=""
                  value={editedUser.email}
                  readOnly
                />
              </div>
              <div className="flex justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                   
                  </div>
                  
                </div>
               
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Update
              </button>
             
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
