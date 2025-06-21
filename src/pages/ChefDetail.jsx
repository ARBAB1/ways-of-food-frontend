import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { ArrowRight } from "@mui/icons-material";
import { ArrowRightOutlined } from "@mui/icons-material";
import star_y from "../images/Vector.svg";
import Chef_Pro_img from "../images/chef1.png";
import chaticon from "../images/Group.svg";
import { Link, useParams } from "react-router-dom";
import { backend_url, server } from "../server";
import styles from "../styles/styles";
import ProductCard from "../components/Route/ProductCard/ProductCard";
const ChefDetail = () => {
  const [rating, setRating] = useState(null);
  const [chefInfo, setChefInfo] = useState(null);
  const [products, setProducts] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchChefs = async () => {
      try {
        const response = await axios.get(`${server}/shop/Chef/${id}`);
        if (response.data.success) {
          const chefrating = response.data.averageRating;
          const chefData = response.data.shop;
          const chefProductsData = response.data.products;
          if (chefData) {
            console.log("ok");
          } else {
            console.log("not fetcheing data");
          }
          console.log(chefrating);
          setChefInfo(chefData);
          setProducts(chefProductsData);
          setRating(chefrating);
        }
      } catch (error) {
        console.error("Error fetching chef data:", error);
      }
    };

    fetchChefs();
  }, [id]); // Dependency array to prevent infinite API calls
  console.log(products);
  return (
    <div>
      <Header />
      {chefInfo && <AboutChef data={chefInfo} ChefRatings={rating} />}
      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {products &&
            products.map((i, index) => <ProductCard data={i} key={index} />)}
        </div>
        {products && products.length === 0 ? (
          <h1 className="text-center w-full pb-[100px] text-[20px]">
            No products Found!
          </h1>
        ) : null}
      </div>
      <ChefFaqs />
      <Footer />
    </div>
  );
};

export default ChefDetail;

const AboutChef = ({ data, ChefRatings }) => {
  if (!data) return null; // Prevent rendering if data is not available
  console.log(data._id);

  return (
    <>
      <section className="chef-hero-area">
        <div className="container">
          <div className="main-a">
            <div className="bio-chef">
              <div className="intro">
                <h1 className="m-title">
                  Meet {data.name}{" "}
                  <span className="rating">
                    <span className="stra">
                      <img src={star_y} alt="Star" />
                    </span>
                    {ChefRatings}
                  </span>
                </h1>

                <div className="subscription-container">
                  <Link
                    to={`/deals/${data.name}/${data._id}`}
                    className="subscribe-button"
                  >
                    <span className="subcribe-title">Subscribe the deal</span>
                  </Link>
                </div>
                <p>{data.description}</p>
              </div>
              <div className="review-chat">
                <a href="#">
                  <img src={chaticon} alt="Chat Icon" />
                </a>
              </div>
              <div className="review-by-user">
                <div className="review-body">
                  <p>
                    Who knew healthy food could be so delicious, well-balanced,
                    full of flavour and colourful. Thanks Arnold!
                  </p>
                </div>
                <div className="review-ftr">
                  <div className="right">Rachel C</div>
                  <div className="left">{/* Add stars or other content */}</div>
                </div>
              </div>
            </div>
            <div className="chef-pro-img">
              <img src={`${backend_url}${data.avatar}`} alt={data.name} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const ChefFaqs = () => {
  return (
    <>
      <section className="chef-faqs">
        <div className="container">
          <div className="title-a">
            <h3>Get to know Arnold a little better...</h3>
            <p>My specialty is Balanced Meals</p>
          </div>
          <div className="faqs-a">
            <div className="faqs-list">
              <Accordion>
                <AccordionSummary
                  expandIcon={<ArrowRightOutlined />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography component="span">
                    How does the subscription Way of Food box work?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ArrowRightOutlined />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography component="span">
                    How does the subscription Way of Food box work?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ArrowRightOutlined />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography component="span">
                    How does the subscription Way of Food box work?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ArrowRightOutlined />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography component="span">
                    How does the subscription Way of Food box work?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
