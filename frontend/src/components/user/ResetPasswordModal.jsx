import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../slices/PasswordResetSlice";
import { toast } from "react-toastify";

const ResetPasswordModal = ({ isOpen, onClose, onSubmit }) => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(
    (state) => state.resetPassword
  );

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      return;
    }
    if(formData.currentPassword === formData.newPassword){
      toast.error('new password must be defferent from current password')
      return 
    }

    try {
      const res = await dispatch(resetPassword(formData));
      onClose();
      toast.success("Password reset successfully");
    } catch (err) {
      toast.error("Failed to reset password", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    isOpen && (
      <div className="modal-overlay bg-transparent">
        <div className="modal bg-gray-900">
          <div className="modal-content">
            <span className="close" onClick={onClose}>
              &times;
            </span>
            <h2 className="text-center  font-extrabold text-2xl bg-gradient-to-r from-rose-800 to-fuchsia-700 bg-clip-text text-transparent">
              Reset Password
            </h2>
            <form onSubmit={handleSubmit} className="mt-5">
              <div className="form-group">
                <label htmlFor="currentPassword" className="text-white">
                  {" "}
                  Current Password:
                </label>
                <input
                  type="password"
                  className="reset-input"
                  name="currentPassword"
                  id="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  placeholder="current password"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="newPassword" className="text-white">
                  New Password:
                </label>
                <input
                  type="password"
                  id="newPassword"
                  className="reset-input"
                  name="newPassword"
                  onChange={handleChange}
                  placeholder="new Password"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword " className=" text-white">
                  Confirm Password:
                </label>
                <input
                  type="password"
                  className="reset-input"
                  id="confirmPassword"
                  name="confirmPassword"
                  onChange={handleChange}
                  placeholder="confirm Password"
                  required
                />
              </div>
              <div className="button-group">
                <button
                  type="submit"
                  disabled={loading}
                  className="submit-btn text-black bg-rose-800"
                >
                  {loading ? "Resetting" : "Reset"}
                </button>
                {error && <div>Error:{error}</div>}
                {success && <div>password reset successfully</div>}
                <button
                  type="button"
                  className="cancel-btn text-white bg-violet-950"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default ResetPasswordModal;
