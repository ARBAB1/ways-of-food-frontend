import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

const ChefDeals = () => {
  const { chefId, chefname } = useParams(); // Extract ID from URL
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v2/deal/get-deals/${chefId}`
        );
        setDeals(response.data.deals);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDeals();
  }, [chefId]);

  if (loading) {
    return <Typography>Loading deals...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  if (!deals || deals.length === 0) {
    return (
      <>
        <Header />
        <Typography>No deals available</Typography>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div style={{ padding: "20px" }} className="Subscription-box">
        <Typography variant="h4" gutterBottom>
          Available Deals
        </Typography>

        {deals.map((deal) => (
          <Accordion key={deal._id} style={{ marginBottom: "15px" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${deal._id}-content`}
              chefId={`${deal._id}-header`}
            >
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} md={3}>
                  {deal.images && deal.images.length > 0 && (
                    <CardMedia
                      component="img"
                      height="100"
                      image={`http://localhost:8000/${deal.images[0]}`}
                      alt={deal.name}
                      style={{ objectFit: "cover" }}
                    />
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6">{deal.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {deal.description}
                  </Typography>
                  <Typography variant="body1" style={{ fontWeight: "bold" }}>
                    Total Price: ${deal.totalPrice}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                 
                  <div className="subscription-container">
                    <Link
                      to={`/subscription/${chefname}/${chefId}/${deal._id}/${deal.totalPrice}`}
                      className="subscribe-button"
                    >
                      <span className="subcribe-title">Subscribe the deal</span>
                    </Link>
                  </div>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="h6" gutterBottom>
                Included Items:
              </Typography>
              <Grid container spacing={2}>
                {deal.mealItems.map((item, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card className="subscription-item">
                      <div className="product-item-img">
                      {item.image && (
                        <CardMedia
                          component="img"
                          height="140"
                          image={`http://localhost:8000/${item.image}`}
                          alt={item.name}
                        />
                      )}
                      </div>
                      <CardContent>
                        <Typography gutterBottom variant="h6">
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {item.description}
                        </Typography>
                        <Typography variant="body1" className="subs-price">
                          Price: ${item.price}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default ChefDeals;
