import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import styles from "../styles/styles";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import axios from "axios";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { server } from "../server";

const ProductsPage = () => {
  const { allProducts, isLoading } = useSelector((state) => state.products);
  const [data, setData] = useState([]);
  const [searchdata, setSearchData] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetch_search_data = async () => {
      try {
        const response = await axios.get(`${server}/category/admin-all-category`);
        const categories = response.data.category;
  
        // Filter categories where at least one subcategory has products
        const filteredCategories = categories
          .map(category => {
            const filteredSubcategories = category.subcategories.filter(subcat => 
              subcat.products.length > 0
            );
  
            // Only keep categories that have at least one valid subcategory
            if (filteredSubcategories.length > 0) {
              return {
                ...category,
                subcategories: filteredSubcategories
              };
            }
            return null;
          })
          .filter(category => category !== null);
  
        setSearchData(filteredCategories);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetch_search_data();
  }, []);
  

  useEffect(() => {
    if (filter) {
      // Filter products based on selected subcategory
      const filteredData =
        allProducts &&
        allProducts.filter((product) => product.subcategory?._id === filter);
      setData(filteredData);
    } else {
      // If no subcategory is selected, show all products
      setData(allProducts);
    }
  }, [allProducts, filter]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={3} />
          <br />
          <br />
          <div className="menu-wrap">
            <section className="page-hero-header">
              <div className="container">
                <div className="main-title">
                  <h1>All Meal</h1>
                  <p>
                    Enjoy 250+ healthy and tasty meals made by 100+ independent
                    chefs.
                  </p>
                </div>
              </div>
            </section>
          </div>


          <div className={`${styles.section} menu-food-items`}>
            <div className="search front-sidebar">
              <div className="searchbox">
                {searchdata.map((d, index) => (
                  <Accordion key={index}>
                    <AccordionSummary
                      expandIcon={<ArrowDropDownIcon />}
                      aria-controls={`panel${index}-content`}
                      id={`panel${index}-header`}
                    >
                      <Typography component="span">{d.categoryname}</Typography>
                    </AccordionSummary>
                    {d.subcategories.map((d2, index) => (
                      <AccordionDetails key={index}>
                        <Typography>
                          <div onClick={() => setFilter(d2._id)}>
                            {d2.subcategoryname}{" "}
                            <span>({d2.products?.length || 0})</span>
                          </div>
                        </Typography>
                      </AccordionDetails>
                    ))}
                  </Accordion>
                ))}
              </div>
            </div>

            <div className="products menu-content-wrap">
              {data && data.length > 0 ? (
                data.map((i, index) => <ProductCard data={i} key={index} />)
              ) : (
                <h1 className="text-center w-full pb-[100px] text-[20px]">
                  No products found!
                </h1>
              )}

            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default ProductsPage;
