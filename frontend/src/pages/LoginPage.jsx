// LoginPage.js
import React, { useState } from 'react';
import Login from '../components/auth/Login';
import '/src/main.css';
import Header from '../components/common/Header';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('submit');
    }

    const handleEmail = (data) => {
        setEmail(data);
    }

    const handlePass = (data) => {
        setPassword(data);
    }

    return (
        <>
            <Header />
            {/* Corrected prop names */}
            <Login handleSubmit={handleSubmit} handleEmail={handleEmail} handlePass={handlePass} />
        </>
    );
}

export default LoginPage;
