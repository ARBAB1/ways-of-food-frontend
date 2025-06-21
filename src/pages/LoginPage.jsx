import React, { useEffect } from 'react'
import Login from '../components/Login/Login'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";

const LoginPage = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.user);
    // if user is login then redirect to home page
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }

    })
    return (
        <div className='login-page auth-page'>
            <Header activeHeading={1} />
            <Login />
            <Footer />
        </div>
    )
}

export default LoginPage