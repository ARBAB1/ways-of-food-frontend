import React, { useState } from "react";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Categories from "../components/Route/Categories/Categories";
import styles from "../styles/styles";

const FAQPage = () => {
    return (
        <div>
            <Header activeHeading={5} />
            <Faq />
            <Footer />
        </div>
    );
};

const Faq = () => {
    const [activeTab, setActiveTab] = useState(0);

    const toggleTab = (tab) => {
        if (activeTab === tab) {
            setActiveTab(0);
        } else {
            setActiveTab(tab);
        }
    };

    return (
        <>
            <div className="faqs howitwork">
                <section className="page-hero-header">
                    <div className='container'>
                        <div className="main-title">
                        <h1>FAQs</h1>
                        <p>Enjoy 250+ healthy and tasty meals made by 100+ independent chefs. </p>
                        </div>
                    </div>
                </section>
                <section className="content-a chef-faqs">
                    <div className="container">
                        <div className='title-a'>
                            <h3>Your Food Questions Answered</h3>
                            <p>My specialty is Balanced Meals</p>
                        </div>
                        <div className="faqs-list">
                            <div className="faq-item">
                                <button
                                    className="flex items-center justify-between w-full"
                                    onClick={() => toggleTab(2)}
                                >
                                    <span className="text-lg font-medium text-gray-900">
                                        What is your return policy?
                                    </span>
                                    {activeTab === 2 ? (
                                        <svg
                                            className="h-6 w-6 text-gray-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            className="h-6 w-6 text-gray-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    )}
                                </button>
                                {activeTab === 2 && (
                                    <div className="mt-4">
                                        <p className="text-base text-gray-500">
                                            If you're not satisfied with your purchase, we accept returns
                                            within 30 days of delivery. To initiate a return, please email
                                            us at support@myecommercestore.com with your order number and a
                                            brief explanation of why you're returning the item.
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="faq-item">
                                <button
                                    className="flex items-center justify-between w-full"
                                    onClick={() => toggleTab(3)}
                                >
                                    <span className="text-lg font-medium text-gray-900">
                                        How do I track my order?
                                    </span>
                                    {activeTab === 3 ? (
                                        <svg
                                            className="h-6 w-6 text-gray-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            className="h-6 w-6 text-gray-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    )}
                                </button>
                                {activeTab === 3 && (
                                    <div className="mt-4">
                                        <p className="text-base text-gray-500">
                                            You can track your order by clicking the tracking link in your
                                            shipping confirmation email, or by logging into your account on
                                            our website and viewing the order details.
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="faq-item">
                                <button
                                    className="flex items-center justify-between w-full"
                                    onClick={() => toggleTab(4)}
                                >
                                    <span className="text-lg font-medium text-gray-900">
                                        How do I contact customer support?
                                    </span>
                                    {activeTab === 4 ? (
                                        <svg
                                            className="h-6 w-6 text-gray-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            className="h-6 w-6 text-gray-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    )}
                                </button>
                                {activeTab === 4 && (
                                    <div className="mt-4">
                                        <p className="text-base text-gray-500">
                                            You can contact our customer support team by emailing us at
                                            support@myecommercestore.com, or by calling us at (555) 123-4567
                                            between the hours of 9am and 5pm EST, Monday through Friday.
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="faq-item">
                                <button
                                    className="flex items-center justify-between w-full"
                                    onClick={() => toggleTab(5)}
                                >
                                    <span className="text-lg font-medium text-gray-900">
                                        Can I change or cancel my order?
                                    </span>
                                    {activeTab === 5 ? (
                                        <svg
                                            className="h-6 w-6 text-gray-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            className="h-6 w-6 text-gray-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    )}
                                </button>
                                {activeTab === 5 && (
                                    <div className="mt-4">
                                        <p className="text-base text-gray-500">
                                            Unfortunately, once an order has been placed, we are not able to
                                            make changes or cancellations. If you no longer want the items
                                            you've ordered, you can return them for a refund within 30 days
                                            of delivery.
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="faq-item">
                                <button
                                    className="flex items-center justify-between w-full"
                                    onClick={() => toggleTab(6)}
                                >
                                    <span className="text-lg font-medium text-gray-900">
                                        Do you offer international shipping?
                                    </span>
                                    {activeTab === 6 ? (
                                        <svg
                                            className="h-6 w-6 text-gray-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            className="h-6 w-6 text-gray-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    )}
                                </button>
                                {activeTab === 6 && (
                                    <div className="mt-4">
                                        <p className="text-base text-gray-500">
                                            Currently, we only offer shipping within the United States.
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="faq-item">
                                <button
                                    className="flex items-center justify-between w-full"
                                    onClick={() => toggleTab(7)}
                                >
                                    <span className="text-lg font-medium text-gray-900">
                                        What payment methods do you accept?
                                    </span>
                                    {activeTab === 7 ? (
                                        <svg
                                            className="h-6 w-6 text-gray-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            className="h-6 w-6 text-gray-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    )}
                                </button>
                                {activeTab === 7 && (
                                    <div className="mt-4">
                                        <p className="text-base text-gray-500">
                                            We accept visa,mastercard,paypal payment method also we have
                                            cash on delivery system.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='submit-question'>
                            <h4>Other Question</h4>
                            <form action="">
                                <textarea name="" placeholder='Feel free to Ask ?' id=""></textarea>
                                <button className='btn'>Submit</button>
                            </form>
                        </div>
                    </div>
                </section>
                <section className='popular-category-sec'>
                    <div className='container'>
                        <div className='title-area'>
                            <p>Customer Favorites</p>
                            <h3>Popular Catagories</h3>
                        </div>
                        <div className='popular-content'>
                            <Categories />
                        </div>
                    </div>
                </section>
            </div>
        </>
        
    );
};

export default FAQPage;