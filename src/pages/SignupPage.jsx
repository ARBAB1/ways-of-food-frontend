import React, { useEffect } from 'react'
import Signup from '../components/Signup/Signup'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";

const SignupPage = () => {

    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.user);
    // if user is login then redirect to home page
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    })

    return (
        <div className='login-page auth-page signup'>
             <Header activeHeading={1} />
            <Signup />
            <Footer />
        </div>
    )
}

export default SignupPage