import React from 'react'
import Header from "../components/Layout/Header";
import ChefCard from '../components/Chef/ChefCard';
import Footer from "../components/Layout/Footer";
const Chef = () => {
  return (
    <>
        <Header activeHeading={1} />
         <div className='chef'>
        <section className="page-hero-header">
          <div className='container'>
            <div className="main-title">
              <h1>Discover Our Chefs</h1>
              <p>Enjoy 250+ healthy and tasty meals made by 100+ independent chefs.</p>
            </div>
          </div>
        </section>
        </div>
        <ChefCard/>
        <Footer />
    </>
    
  )
}

export default Chef