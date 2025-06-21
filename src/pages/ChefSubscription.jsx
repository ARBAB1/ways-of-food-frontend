import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/subscription/CheckoutForm";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { STRIPE_API_KEY } from "../server";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const stripePromise = loadStripe(`${STRIPE_API_KEY}`);

const ChefSubscribe = () => {
  const { user } = useSelector((state) => state.user);
  const { chefname, chefId, dealId, dealprice } = useParams();
  const userId = user._id;

  const [days, setDays] = useState(1);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [amount, setAmount] = useState(0);

  const timeOptions = [
    "10:00 AM",
    "1:00 PM ",
    "4:00 PM",
    "8:00 PM",
    "10:00 PM",
  ];

  useEffect(() => {
    const price = parseFloat(dealprice);
    const total = days * selectedTimes.length * price;
    setAmount(total.toFixed(2));
  }, [days, selectedTimes, dealprice]);

  const handleTimeToggle = (time) => {
    if (selectedTimes.includes(time)) {
      setSelectedTimes(selectedTimes.filter((t) => t !== time));
    } else {
      setSelectedTimes([...selectedTimes, time]);
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-md mx-auto p-4 bg-white rounded shadow subscription-form">
        <h2 className="text-xl font-bold mb-4">Subscribe to Chef {chefname}</h2>

        <label className="block mb-2 font-medium">How many days?</label>
        <input
          type="number"
          min="1"
          value={days}
          onChange={(e) => setDays(parseInt(e.target.value))}
          className="w-full border p-2 mb-4"
        />

        <label className="block mb-2 font-medium">
          Select Meal Times per Day:
        </label>
        <div className="mb-4 flex gap-2 flex-wrap">
          {timeOptions.map((time) => (
            <button
              key={time}
              type="button"
              className={`px-3 py-1 border rounded ${
                selectedTimes.includes(time) ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => handleTimeToggle(time)}
            >
              {time}
            </button>
          ))}
        </div>

        <p className="mb-4 font-medium">
          Total Amount: ${amount} ({days} days × {selectedTimes.length}{" "}
          times/day × ${dealprice})
        </p>

        <Elements stripe={stripePromise}>
          <CheckoutForm
            chefId={chefId}
            userId={userId}
            plan={`${days}-days`}
            amount={amount}
            dealId={dealId}
            days={days}
            timesPerDay={selectedTimes}
            
          />
        </Elements>
      </div>
      <Footer />
    </>
  );
};

export default ChefSubscribe;
