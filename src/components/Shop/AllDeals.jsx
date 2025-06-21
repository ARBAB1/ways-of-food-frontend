import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../server";
import { backend_url } from "../../server";
import { toast } from "react-toastify";

const AllDeals = () => {
  const { seller } = useSelector((state) => state.seller);
  const [deals, setDeals] = useState([]);
  const shopId = seller._id;

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await axios.get(`${server}/deal/get-deals/${shopId}`);
        setDeals(response.data.deals);
      } catch (error) {
        console.error("Error fetching deals:", error);
        toast.error("Failed to fetch deals");
      }
    };

    fetchDeals();
  }, [shopId]);

  const handleDelete = async (dealId) => {
    try {
      await axios.delete(`${server}/deal/delete-deal/${dealId}`, {
        withCredentials: true,
      });
      setDeals(deals.filter((deal) => deal._id !== dealId));
      toast.success("Deal deleted successfully");
    } catch (error) {
      console.error("Error deleting deal:", error);
      toast.error("Failed to delete deal");
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mx-auto px-4 py-8 subscribtionbox">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">All Deals</h1>

      {deals.length === 0 ? (
        <p className="text-gray-600 text-center">No deals available</p>
      ) : (
        <div className="grid gap-6">
          {deals.map((deal) => (
            <div
              key={deal._id}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {deal.name}
                    </h2>
                    <p className="text-gray-600 mt-1">{deal.description}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(deal._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                  >
                    Delete
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-3 rounded">
                    <h3 className="text-sm font-medium text-gray-500">
                      Total Price
                    </h3>
                    <p className="text-lg font-semibold text-gray-800">
                      ${deal.totalPrice}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <h3 className="text-sm font-medium text-gray-500">
                      Items Included
                    </h3>
                    <p className="text-lg font-semibold text-gray-800">
                      {deal.mealItems.length}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <h3 className="text-sm font-medium text-gray-500">
                      Duration
                    </h3>
                    <p className="text-sm text-gray-800">
                      {formatDate(deal.startDate)} - {formatDate(deal.endDate)}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Items in this deal:
                  </h3>
                  <ul className="divide-y divide-gray-200">
                    {deal.mealItems.map((item, index) => (
                      <li key={index} className="py-2 flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden bg-gray-200">
                          {item.image && (
                            <img
                              src={`${backend_url}/${item.image}`}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          )}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500">${item.price}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllDeals;
