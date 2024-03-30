import React, { useState } from "react";
import Header from "../common/Header";
import "/src/main.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { signup } from "../../Redux/Actions/AuthActions";
import { toast } from "react-toastify";
import { signupUser } from "../../slices/AuthSlice";
import { FaSpinner } from "react-icons/fa";
import Swal from "sweetalert2";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { loading, error } = useSelector((state) => state.auth);

  const onchange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (
      !formData.userName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error("please fill all the fields");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("both passwords do not match");
      return false;
    }
    return true
  };

  const onsubmit = (e) => {
    e.preventDefault();

    if(!validateForm()){
      return
    }

    dispatch(signupUser(formData))
      .then((res) => {
        //redirect the user to the home page after successful signup
        console.log("signup success", res);
        if (res.payload.email) {
          navigate("/");
        } else {
          console.log();
          Swal.fire({
            icon: "error",
            title: "oops",
            text: res.payload.error,
            confirmButtonText: "OK",
          });
        }
      })
      .catch((err) => {
        console.error("signup  error", err);
        toast.error(err?.data?.error || err.error);
      });
  };

  return (
    <>
      <Header />
      <div className="flex justify-center items-center">
        <img className="w-1/2 " src="/images/signup.jpg" alt="Signup" />
        <div className="w-1/2 flex flex-col justify-around items-center">
          <form className="w-[90%] mb-4" onSubmit={onsubmit}>
            <h2 className="text-3xl font-bold mb-4">Signup</h2>
            <div className="mb-4">
              <label htmlFor="userName" className="block w-full">
                Username
              </label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={formData.userName}
                onChange={onchange}
                className="signup-input w-[70%] py-2 rounded-md border pl-2  text-lg focus:outline-none "
                style={{
                  color: "black",
                  fontSize: "16px",
                  fontFamily: "sans-serif",
                }}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block w-full">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={onchange}
                className="signup-input w-[70%] py-2 rounded-md border pl-2  text-lg focus:outline-none "
                style={{
                  color: "black",
                  fontSize: "16px",
                  fontFamily: "sans-serif",
                }}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block w-full">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={onchange}
                className="signup-input w-[70%] py-2 rounded-md border pl-2 text-lg focus:outline-none"
                style={{
                  color: "black",
                  fontSize: "16px",
                  fontFamily: "sans-serif",
                }}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block w-full">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={onchange}
                className="signup-input w-[70%] py-2 border  pl-2 rounded-md text-lg focus:outline-none "
                style={{
                  color: "black",
                  fontSize: "16px",
                  fontFamily: "sans-serif",
                }}
              />
            </div>
            <div className="flex justify-between w-3/4">
              <button className="login-btn mt-4 " disabled={loading}>
                {loading ? (
                  <FaSpinner className="animate-spin mr-2" />
                ) : (
                  "Signup"
                )}
              </button>
              <Link to="/login">
                <p className="my-5 mr-9 text-blue-700">
                  already have an account?
                </p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
