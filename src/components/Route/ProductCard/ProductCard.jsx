import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import { backend_url } from "../../../server";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { addTocart } from "../../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "../../Products/Ratings";

const ProductCard = ({ data, isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const dispatch = useDispatch();
  //   console.log(data.sizes);
  useEffect(() => {
    try {
      if (data.sizes) {
        const parsedSizes = JSON.parse(data.sizes);
        setSizes(parsedSizes);

        // ✅ Default select first available size
        const firstAvailableSize = Object.entries(parsedSizes).find(
          ([_, sizeData]) => sizeData.selected
        );

        if (firstAvailableSize) {
          setSelectedSize({
            name: firstAvailableSize[0],
            price: firstAvailableSize[1].price,
          });
        }
      } else {
        console.log("Sizes field is empty or missing");
      }
    } catch (error) {
      console.error("Error parsing sizes:", error);
    }
  }, [data.sizes]);
  // ✅ Size Change Handler
  const handleSizeChange = (sizeKey) => {
    setSelectedSize({ name: sizeKey, price: sizes[sizeKey].price });
  };
  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  // Remove from wish list
  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  // add to wish list
  const addToWishlistHandler = async (data) => {
    setClick(!click);
    await dispatch(addToWishlist(data));
  };

  // Add to cart
  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);

    if (isItemExists) {
      toast.error("item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart Successfully!");
      }
    }
  };

  return (
    <>
      <div className="w-full bg-white rounded-lg shadow-sm p-3 relative cursor-pointer menu-item">
        <div className="flex justify-end"></div>
        <div className="p-item-c">
          <div className="Product_img">
            <Link
              to={`${
                isEvent === true
                  ? `/product/${data._id}?isEvent=true`
                  : `/product/${data._id}`
              }`}
            >
              <img
                src={`${backend_url}${data.images && data.images[0]}`}
                alt="prd"
                className="w-full"
              />
            </Link>
            {/* side option */}
            <div className="item-options">
              {click ? (
                <AiFillHeart
                  size={22}
                  className="cursor-pointer absolute right-2 top-5"
                  onClick={() => removeFromWishlistHandler(data)}
                  color={click ? "red" : "#333"}
                  title="Remove from wishlist"
                />
              ) : (
                <AiOutlineHeart
                  size={22}
                  className="cursor-pointer absolute right-2 top-5"
                  onClick={() => addToWishlistHandler(data)}
                  color={click ? "red" : "#333"}
                  title="Add to wishlist"
                />
              )}
              <AiOutlineEye
                size={22}
                className="cursor-pointer absolute right-2 top-14"
                onClick={() => setOpen(!open)}
                color="#333"
                title="Quick view"
              />

              <AiOutlineShoppingCart
                size={25}
                className="cursor-pointer absolute right-2 top-24"
                onClick={() => addToCartHandler(data._id)}
                color="#444"
                title="Add to cart"
              />
              {open ? (
                <ProductDetailsCard setOpen={setOpen} data={data} />
              ) : null}
            </div>
          </div>
          <div className="p-item-d">
            <h4 className="pb-3 font-[500]">
              {data.name.length > 40
                ? data.name.slice(0, 40) + "..."
                : data.name}
            </h4>
            <div className="madeby">
              <Link
                to={`${
                  isEvent === true
                    ? `/product/${data._id}?isEvent=true`
                    : `/product/${data._id}`
                }`}
              >
                <h5 className={`${styles.shop_name}`}>
                  Made by {data.shop.name}
                </h5>
              </Link>
            </div>
            {/* Star Rating */}
            {/* <div className='flex'>
                            <Ratings rating={data?.ratings} />
                        </div> */}

            <div className="py-2 flex items-center justify-between p-card-btm">
              <div className=" ">
                <h3>Select Size:</h3>
                {Object.entries(sizes)
                  .filter(([_, sizeData]) => sizeData.selected)
                  .map(([sizeKey, sizeData]) => (
                    <label
                      key={sizeKey}
                      style={{ display: "block", margin: "5px 0" }}
                    >
                      <input
                        type="radio"
                        name="size"
                        value={sizeKey}
                        checked={selectedSize?.name === sizeKey}
                        onChange={() => handleSizeChange(sizeKey)}
                      />
                      {sizeKey} - Price: {sizeData.price}
                    </label>
                  ))}

                {selectedSize && (
                  <div style={{ marginTop: "10px" }}>
                    <h4>Selected Size: {selectedSize.name}</h4>
                    <p>Price: {selectedSize.price}</p>
                  </div>
                )}
              </div>

              {/* <span className="font-[400] text-[17px] text-[#68d284]">
                                {data?.sold_out} sold
                            </span> */}
              <Link className="btn" to={`/product/${data._id}`}>
                View Detail
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
