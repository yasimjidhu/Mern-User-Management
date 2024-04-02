import React, { useState } from "react";
import "/src/main.css";
import Header from "../components/common/Header";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { useLoginMutation } from "../slices/UsersApiSlice";
// import { setCredentials } from "../slices/AuthSlice";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { loginUser } from "../slices/AuthSlice";
import Swal from "sweetalert2";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { loading, error } = useSelector((state) => state.auth);

  const onchange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      toast.error("please fill all the fields");
      return false;
    }
    return true;
  };
  const onsubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    dispatch(loginUser(formData))
      .then((res) => {
        const {role} = res.payload
        if (res.payload.user.email) {
          
          //check the user's role
          if(role === 'admin'){
            navigate('/adminHome')

          }else{
            // redirect user to the user dashboard
            navigate("/");
          }
        } else {
          toast.error(
            res.payload.error
          )
        }
      })
      .catch((err) => {
        console.log("error occured while login", err);
      });
  };

  return (
    <>
      <Header />
      <div className="flex justify-center items-center">
        <img className="w-1/2" src="/images/signup.jpg" alt="Signup" />
        <div className="w-1/2 flex flex-col justify-around items-center">
          <form className="w-[90%] mb-4" onSubmit={onsubmit}>
            <h2 className="text-3xl font-bold mb-4">Login</h2>
            <div className="mb-4">
              <label htmlFor="email" className="block w-full">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                className="signup-input w-[70%] py-2 rounded-md border pl-2  text-lg focus:outline-none  "
                style={{
                  color: "black",
                  fontSize: "18px",
                  fontFamily: "sans-serif",
                }}
                onChange={onchange}
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
                className="signup-input w-[70%] py-2 rounded-md border pl-2 text-lg focus:outline-none"
                style={{
                  color: "black",
                  fontSize: "18px",
                  fontFamily: "sans-serif",
                }}
                onChange={onchange}
              />
            </div>
            <button className="login-btn " disabled={loading}>
              {loading ? <FaSpinner className="animate-spin mr-2" /> : "Login"}
            </button>

            <Link to="/signup">
              <p className="cursor-pointer text-blue-600 my-5">
                I don't have any account?
              </p>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
