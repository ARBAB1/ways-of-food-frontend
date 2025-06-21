import React, { useEffect } from 'react'
import ShopLogin from "../components/Shop/ShopLogin";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";

const ShopLoginPage = () => {
    const navigate = useNavigate();
    const { isSeller, isLoading } = useSelector((state) => state.seller);
    // if user is login then redirect to home page
    useEffect(() => {
        if (isSeller === true) {
            navigate(`/dashboard`);
        }
    }, [isLoading, isSeller])
    return (
        <div className='login-page auth-page chef-auth'>
            <Header activeHeading={1} />
            <ShopLogin />
            <Footer />
        </div>
    )
}

export default ShopLoginPage