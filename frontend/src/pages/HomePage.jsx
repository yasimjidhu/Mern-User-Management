import React, { useEffect, useState } from "react";
import Header from "../components/common/Header";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfileData,
  updateUserData,
  uploadFile,
} from "../slices/UserData";
import { BiEdit } from "react-icons/bi";
import ResetPasswordModal from "../components/user/ResetPasswordModal";

const HomePage = () => {
  const [file, setFile] = useState(null);
  const [showUploadButton, setShowUploadButton] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserNameEditing, setIsUserNameEditing] = useState(false);
  const [isEmailEditing, setIsEmailEditing] = useState(false);
  const [editedUserName, setEditedUserName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");

  const dispatch = useDispatch();

  const { userData, loading, error } = useSelector((state) => state?.userData);

  useEffect(() => {
    dispatch(fetchUserProfileData());
  }, [dispatch]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const baseUrl = "http://localhost:5000";

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setShowUploadButton(true);
  };

  const handleUpload = () => {
    if (!file) {
      return;
    }
    dispatch(uploadFile(file));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowUploadButton(false);
    handleUpload();
  };

  const handleEditUserName = () => {
    setIsUserNameEditing(true);
    setEditedUserName(userData ? userData.userName : "");
    setIsEmailEditing(false);
  };


  const handleSaveUserData = async () => {
    setIsUserNameEditing(false);
    setIsEmailEditing(false)
    await dispatch(
      updateUserData({
        userId: userData._id,
        key: editedUserName ? "userName" : "email",
        value: editedUserName ? editedUserName : editedEmail,
      })
    );

    dispatch(fetchUserProfileData());
  };

  return (
    <>
      <Header />
      <ResetPasswordModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />
      <div className="w-full h-screen flex justify-center items-start first-div">
        <div className="w-1/3 maindiv p-1 rounded-xl mt-5">
          <form onSubmit={handleSubmit}>
            <div className="w-2/3 mx-auto">
              <div className="bg-gray-300 w-48 h-48 rounded-full mx-auto mt-3 shadow-2xl border-0 border-black">
                {userData && userData.profile && (
                  <img
                    className="object-cover object-center w-full h-full rounded-full"
                    src={`${baseUrl}/${userData.profile}`}
                    alt="User Profile"
                  />
                )}
                {!userData && (
                  <div className="text-center text-gray-500">Loading...</div>
                )}
              </div>
              {/* Hidden file input */}
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              {!showUploadButton ? (
                <label
                  htmlFor="file-upload"
                  className="block text-center bg-black rounded-md py-2 mt-3 text-teal-500 cursor-pointer mb-4 font-bold"
                >
                  Choose Image
                </label>
              ) : (
                <button
                  type="submit"
                  className="upload-btn block text-center bg-black rounded-md py-2 mt-3 text-teal-500 cursor-pointer mb-4 font-bold w-full"
                >
                  Upload
                </button>
              )}
              <label
                className="block text-center bg-black rounded-md py-2 mt-3 text-teal-500 cursor-pointer mb-4 font-bold"
                onClick={handleOpenModal}
              >
                Reset Password
              </label>
            </div>
          </form>

          <div className="w-2/3 mx-auto mb-4">
            <div className="rounded-lg shadow-md w-full mb-7 mt-8">
              <div className="bg-black w-full p-2 rounded-lg mb-3 relative">
                {isUserNameEditing ? (
                  <input
                    type="text"
                    onChange={(e) => setEditedUserName(e.target.value)}
                    className="text-black  text-base font-bold w-full m-0 rounded-sm outline-none p-1"
                  />
                ) : (
                  <h2 className="text-white text-base ">
                    {userData ? userData.userName : "userName"}
                    <BiEdit
                      className="absolute right-5 top-3 text-xl cursor-pointer"
                      onClick={handleEditUserName}
                    />
                  </h2>
                )}
                {isUserNameEditing && (
                  <button
                    onClick={handleSaveUserData}
                    className="absolute right-5 top-3 text-white text-base outline-none bg-violet-800 px-2 rounded-md"
                  >
                    Save
                  </button>
                )}
              </div>
              <div className="bg-black w-full p-2 rounded-lg relative">
                {isEmailEditing ? (
                  <input
                    type="text"
                    
                    className="text-black text-base font-bold w-full p-1 outline-none"
                  />
                ) : (
                  <h2 className="text-white text-base">
                    {userData ? userData.email : "email"}{" "}
          
                  </h2>
                )}
          
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
