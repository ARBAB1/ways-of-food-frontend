import React from "react";
import Header from "../components/Layout/Header";
import Hero from "../components/Route/Hero/Hero";
import Categories from "../components/Route/Categories/Categories";
import BestDeals from "../components/Route/BestDeals/BestDeals";
import Events from "../components/Events/Events";
import FeaturedProduct from "../components/Route/FeaturedProduct/FeaturedProduct";
import Sponsored from "../components/Route/Sponsored";
import Footer from "../components/Layout/Footer";

const HomePage = () => {
  return (
    <div>
      <Header activeHeading={1} />
      <Hero />

      <section className="what-we-serve">
        <div className="container">
          <div className="title-area">
            <p>WHAT WE SERVE</p>
            <h3>Your Favorite Food Is on Click</h3>
          </div>
          <div className="serve-content">
            <div className="box-item">
              <img
                src="https://wof-v3.devservertd.com/wof-img/serve-1.png"
                alt=""
              />
              <h4>Easy To Order</h4>
              <p>You only need a few steps in ordering food</p>
            </div>
            <div className="box-item">
              <img
                src="https://wof-v3.devservertd.com/wof-img/serve-2.png"
                alt=""
              />
              <h4>Fastest Delivery</h4>
              <p>Delivery that is always ontime even faster</p>
            </div>
            <div className="box-item">
              <img
                src="https://wof-v3.devservertd.com/wof-img/serve-3.png"
                alt=""
              />
              <h4>Best Quality</h4>
              <p>Not only fast for us quality is also number one</p>
            </div>
          </div>
          <div className="cta-box">
            <button href="#" className="btn danger-btn">
              Order Now
            </button>
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

      <section className="testimonail-review">
        <div className="img-a">
          <img src="https://wof-v3.devservertd.com/wof-img/people.png" alt="" />
        </div>
        <div className="review_content">
          <div className="review-box">
            <div className="title-area">
              <p>Testimonials</p>
              <h3>
                What Our Customers
                <br /> Say About Us
              </h3>
            </div>
            <div className="cnt">
              <p>
                “I had the pleasure of dining at Foodi last night, and I'm still
                raving about the experience! The attention to detail in
                presentation and service was impeccable”
              </p>
            </div>
            <div className="review-ftr">
              <div className="img">
                <img
                  src="https://wof-v3.devservertd.com/wof-img/review-img.png"
                  alt=""
                />
              </div>
              <div className="ct">
                <h3>Customer Feedback</h3>
                <p>
                  <span>
                    <img
                      src="https://wof-v3.devservertd.com/wof-img/star.png"
                      alt=""
                    />{" "}
                    4.9
                  </span>
                  (18.6k Reviews)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
