import React, { useState } from "react";
import Header from "../common/Header";
import '/src/main.css'
import { Link } from "react-router-dom";
import { UseDispatch, useDispatch } from "react-redux";
import { signup } from "../../Redux/Actions/AuthActions";

const Signup = () => {
  const dispatch = useDispatch()
  const [formData,setFormData] = useState({
    userName:'',
    email:'',
    password:'',
    confirmPassword:''
  })

  const {userName,email,password,confirmPassword} = formData

  const onchange = (e)=>{
    setFormData({...formData,[e.target.userName]:e.target.value})
  }
  const onSubmit = async (e)=>{
    e.preventDefault()
    if(password !==confirmPassword){
      alert('both password do not matc')
    }else{
      dispatch(signup({userName,email,password}))
    }
  }

  return (
    <>
    <Header/>
    <div className="flex justify-center items-center">
      <img className="w-1/2" src="/images/signup.jpg" alt="Signup" />
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
              className="signup-input w-[70%] py-2 border  pl-2 rounded-md text-lg focus:outline-none "
              style={{
                color: "black",
                fontSize: "16px",
                fontFamily: "sans-serif",
              }}
            />
          </div>
          <div className="flex justify-between w-3/4">
          <button className="login-btn mt-4">Signup</button>
          <Link to='/login'>
          <p className="my-5 mr-9 text-blue-700">already have account ?</p>
          </Link>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default Signup;
