import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";

const Hero = () => {
  return (
    <>
      <section className="main-hero-area">
        <div className="container">
          <div className="banner-content">
            <div className="content">
              <span className="rate-reviews">
                <span>⭐️⭐️⭐️⭐️⭐️</span> 4.4 (6000+ Reviews)
              </span>
              <h3>
                Order<span> Home-Cooked</span>
              </h3>
              <h2>
                Food from Local <span>Chefs!</span>
              </h2>
              <p>
                Eat authentic, homemade food & support small family businesses
                in your neighborhood!
              </p>
            </div>
            <div className="seacrh-form">
              <form>
                <div className="form-group">
                  <input placeholder="Search by Meal or Location" />
                  <Link to="/products" className="btn primary-btn">
                    Find Food
                  </Link>
                </div>
              </form>
            </div>
            <div className="cta-wrap">
              <a href="#" className="btn danger-btn">
                Become a Chef
              </a>
              <a href="#" className="btn btn-nobg">
                <span>
                  <img
                    src="https://wof-v3.devservertd.com/wof-img/play-i.svg"
                    alt=""
                  />
                </span>{" "}
                Watch Video
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
