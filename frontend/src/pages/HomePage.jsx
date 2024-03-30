import React, { useEffect, useMemo, useState } from "react";
import Header from "../components/common/Header";
import { useDispatch, useSelector } from "react-redux";
import { uploadFile } from "../slices/UploadSlice";
import { fetchUserProfileData } from "../slices/UserData";
import { BiEdit } from "react-icons/bi";
import ResetPasswordModal from "../components/user/ResetPasswordModal";

const HomePage = () => {
  const [file, setFile] = useState(null);
  const [showUploadButton, setShowUploadButton] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const dispatch = useDispatch();
  const baseUrl = "http://localhost:5000";

  const userProfileDataFetcher = useMemo(() => {
    return () => dispatch(fetchUserProfileData());
  }, [dispatch]);

  useEffect(() => {
    userProfileDataFetcher();
  }, [userProfileDataFetcher]);

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


  const { userProfile, loading, error } = useSelector(
    (state) => state.userProfile
  );


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
                {userProfile && userProfile.profile && (
                  <img
                    className="object-cover object-center w-full h-full rounded-full"
                    src={`${baseUrl}/${userProfile.profile}`}
                    alt="User Profile"
                  />
                )}
                {!userProfile && (
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
                <h2 className="text-white text-base ">
                  {userProfile ? userProfile.userName : "userName"}
                  <BiEdit className="absolute right-5 top-3 text-xl" />
                </h2>
              </div>
              <div className="bg-black w-full p-2 rounded-lg relative">
                <h2 className="text-white text-base">
                  {userProfile ? userProfile.email : "email"}{" "}
                  <BiEdit className="absolute right-5 top-3 text-xl" />
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
