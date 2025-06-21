import React, { useEffect, useState } from "react";
import { backend_url, server } from "../../server";
import axios from "axios";
import { Link } from "react-router-dom";

const Card = ({ id, name, rating, image }) => {
  return (
    <div className="card">
      <img src={`${backend_url}${image}`} alt={name} className="card-image" />
      <div className="card-overlay"></div>
      <div className="card-rating">⭐ {rating}</div>
      <div className="card-content">
        <div className="card-content2">
          <Link to={`/chef/${name}/${id}`}>
            <h3 className="card-name">{name}</h3>
          </Link>

          <button className="card-button">Dishes</button>
        </div>
      </div>
    </div>
  );
};

const ChefCard = () => {
  const [chefs, setChefs] = useState([]);
  const [visibleChefs, setVisibleChefs] = useState([]);
  const [loadCount, setLoadCount] = useState(1);
  const profilesPerPage = 9;

  useEffect(() => {
    // const fetchChefs = async () => {
    //   try {
    //     const response = await axios.get(`${server}/shop/all-sellers`);
    //     if (response.data.success) {
    //       console.log(response.data.sellers);
    //       const fetchedChefs = response.data.sellers.map((seller) => ({
    //         id: seller._id,
    //         name: seller.name,
    //         rating: "4.9", // Default rating, replace if real data exists
    //         image: seller.avatar, // Assuming avatar is the image path
    //       }));
    //       setChefs(fetchedChefs);
    //       setVisibleChefs(fetchedChefs.slice(0, profilesPerPage)); // Show initial profiles
    //     }
    //   } catch (error) {
    //     console.error("Error fetching chefs:", error);
    //   }
    // };
    const fetchChefs = async () => {
      try {
        const response = await axios.get(`${server}/shop/all-sellers`);
        if (response.data.success) {
          const fetchedChefs = response.data.sellers.map((seller) => {
            // Extract all product ratings for the shop
            const productRatings = seller.products
              .map((product) => product.ratings)
              .filter((rating) => typeof rating === "number"); // Ensure valid ratings

            // Calculate the average rating
            const averageRating = productRatings.length
              ? (
                  productRatings.reduce((sum, rating) => sum + rating, 0) /
                  productRatings.length
                ).toFixed(1)
              : 0; // Default to 0 if no ratings

            return {
              id: seller._id,
              name: seller.name,
              averageRating: parseFloat(averageRating), // Convert to number
              image: seller.avatar,
            };
          });
          setChefs(fetchedChefs);
          setVisibleChefs(fetchedChefs.slice(0, profilesPerPage)); // Show initial profiles

          console.log(fetchedChefs);
        }
      } catch (error) {
        console.error("Error fetching chefs:", error);
      }
    };

    fetchChefs();
  }, []);

  const handleLoadMore = () => {
    const nextLoad = loadCount + 1;
    setVisibleChefs(chefs.slice(0, profilesPerPage * nextLoad));
    setLoadCount(nextLoad);
  };

  return (
    <div className="card-container">
      {visibleChefs.map((chef, index) => (
        <Card
          key={index}
          id={chef.id}
          name={chef.name}
          rating={chef.averageRating}
          image={chef.image}
        />
      ))}
      {visibleChefs.length < chefs.length && (
        <div className="load-more-container">
          <button className="load-more-button" onClick={handleLoadMore}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default ChefCard;
