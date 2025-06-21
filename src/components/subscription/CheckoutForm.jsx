import React from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { server } from "../../server";
import axios from "axios";

const CheckoutForm = ({
  chefId,
  userId,
  plan,
  amount,
  dealId,
  days,
  timesPerDay,
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!plan || !amount) {
      alert("Please select a valid subscription plan.");
      return;
    }

    try {
      const { data } = await axios.post(`${server}/payment/subscribe`, {
        amount: Math.round(amount * 100), // Convert to cents
      });

      const result = await stripe.confirmCardPayment(data.client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      const paymentIntentId = data.paymentId;

      if (result.error) {
        alert(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        await axios.post(`${server}/subscription/confirm`, {
          chefId,
          userId,
          plan,
          amount,
          paymentIntentId,
          dealId,
          days,
          timesPerDay,
        });

        alert("Subscription successful!");
      }
    } catch (error) {
      console.error("Payment or Subscription Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement className="border p-2 rounded mb-4" />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Pay Now
      </button>
    </form>
  );
};

export default CheckoutForm;
