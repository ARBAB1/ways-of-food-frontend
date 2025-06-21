import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import Categories from "../components/Route/Categories/Categories";
const How_it_works = () => {
  return (
    <>
      <Header activeHeading={1} />
      <section className="chefs howitwork">
        <div className="page-hero-header">
          <div className="container">
            <div className="main-title">
              <h1>How It Works</h1>
              <p>
                Enjoy 250+ healthy and tasty meals made by 100+ independent
                chefs. 
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="container">
            <div className="content-a">
              <div className="box-c gr">
                <div className="left">
                  <img
                    src="https://wof-v3.devservertd.com/wof-img/01.png"
                    alt=""
                  />
                </div>
                <div className="right ">
                  <h2>01</h2>
                  <h3>A SHARED PERSONAL CHEF</h3>
                  <p>
                    Our talented, local chefs cook for a handful of households
                    at a time — delivering the quality and care of a personal
                    chef, at a fraction of the price.
                  </p>
                </div>
              </div>
              <div className="box-c reverse rd">
                <div className="left">
                  <img
                    src="https://wof-v3.devservertd.com/wof-img/02.png"
                    alt=""
                  />
                </div>
                <div className="right">
                  <h2>02</h2>
                  <h3>WE HANDPICK THE BEST LOCAL CHEFS</h3>
                  <p>
                    Our culinary team finds and vets the top personal chefs in
                    your neighborhood for skill, quality, and taste.
                  </p>
                </div>
              </div>
              <div className="box-c yl">
                <div className="left">
                  <img
                    src="https://wof-v3.devservertd.com/wof-img/03.png"
                    alt=""
                  />
                </div>
                <div className="right">
                  <h2>03</h2>
                  <h3>CHOOSE FROM FLEXIBLE DELIVERY OPTIONS</h3>
                  <p>
                    Receive weekly curated meals - starting at £40/week, or
                    place a one-time order, always with the option to work with
                    one or multiple chefs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="popular-category-sec">
        <div className="container">
          <div className="title-area">
            <p>Customer Favorites</p>
            <h3>Popular Catagories</h3>
          </div>
          <div className="popular-content">
            <Categories />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default How_it_works;
