// Login.js
import React, { useState } from "react";
import "/src/main.css";
import Header from "../common/Header";
import { Link } from "react-router-dom";

const Login = (props) => {
    const { handleSubmit, handleEmail, handlePass } = props;
    const [emailInput, setEmailInput] = useState("");
    const [passInput, setPassInput] = useState("");

    const handleChange = (e) => {
        const emailValue = e.target.value;
        handleEmail(emailValue);
    };

    const handlePassChange = (e) => {
        const passValue = e.target.value;
        handlePass(passValue); 
    };

    return (
        <>
            <div className="flex justify-center items-center">
                <img className="w-1/2" src="/images/signup.jpg" alt="Signup" />
                <div className="w-1/2 flex flex-col justify-around items-center">
                    <form className="w-[90%] mb-4" onSubmit={handleSubmit}>
                        <h2 className="text-3xl font-bold mb-4">Login</h2>
                        <div className="mb-4">
                            <label htmlFor="email" className="block w-full">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="signup-input w-[70%] py-2 rounded-md border pl-2  text-lg focus:outline-none  "
                                style={{
                                    color: "black",
                                    fontSize: "18px",
                                    fontFamily: "sans-serif",
                                }}
                                onChange={handleChange}
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
                                    fontSize: "18px",
                                    fontFamily: "sans-serif",
                                }}
                                onChange={handlePassChange}
                            />
                        </div>
                        <button className="login-btn">
                            Login
                        </button>
                        <Link to='/signup'>
                            <p className="cursor-pointer text-blue-600 my-5">I don't have any account?</p>
                        </Link>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
