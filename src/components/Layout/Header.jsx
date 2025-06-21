import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";

import { productData, categoriesData } from "../../static/data";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import DropDown from "./DropDown";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { backend_url } from "../../server";
import Cart from "../cart/Cart";
import Wishlist from "../Wishlist/Wishlist";
import { RxCross1 } from "react-icons/rx";

const Header = ({ activeHeading }) => {
  const { isSeller } = useSelector((state) => state.seller);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { allProducts } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false); // mobile menu

  // Handle search change
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Filter products
    const filteredProducts =
      allProducts &&
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <>
      <div className={`${styles.section} `}>
        <div className="header nav ">
          <div className="logo">
            <Link to="/">
              <img src="/way-of-food.svg" alt="" height="60" />
            </Link>
          </div>

          {/* NavItems */}
          <div className="h-right ">
            <div className="navigation">
              <Navbar active={activeHeading} />
            </div>
            <div className="accounts">
              {/* Become a Seller */}
              <div>
                <Link
                  className="btn secondary-btn flex"
                  to={`${isSeller ? "/dashboard" : "/shop-create"}`}
                >
                  {isSeller ? "Go Dashboard" : "Become Chef"}{" "}
                  <IoIosArrowForward className="ml-1" />
                </Link>
              </div>
              {/* Become a Seller end */}
              <div className="cta-icons flex">
                <div className={`${styles.noramlFlex}`}>
                  <div
                    className="relative cursor-pointer mr-[15px]"
                    onClick={() => setOpenWishlist(true)}
                  >
                    <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                    <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                      {wishlist && wishlist.length}
                    </span>
                  </div>
                </div>

                <div className={`${styles.noramlFlex}`}>
                  <div
                    className="relative cursor-pointer mr-[15px]"
                    onClick={() => setOpenCart(true)}
                  >
                    <AiOutlineShoppingCart
                      size={30}
                      color="rgb(255 255 255 / 83%)"
                    />
                    <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                      {cart && cart.length}
                    </span>
                  </div>
                </div>

                {/* avatar */}
                <div className={`${styles.noramlFlex}`}>
                  <div className="relative cursor-pointer mr-[15px]">
                    {isAuthenticated ? (
                      <Link to="/profile">
                        <img
                          src={`${backend_url}${user.avatar}`}
                          className="w-[35px] h-[35px] rounded-full"
                          alt=""
                        />
                      </Link>
                    ) : (
                      <Link to="/login">
                        <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                      </Link>
                    )}
                  </div>
                </div>
                {/* Avatar end */}

                {/* cart popup */}
                {openCart && <Cart setOpenCart={setOpenCart} />}
                {/* wishlist popup */}
                {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        }
            w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
      >
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-4"
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link to="/">
              <img
                src="https://wof-v3.devservertd.com/wof-img/way-of-food.svg"
                alt=""
                className="mt-3 logo cursor-pointer"
              />
            </Link>
          </div>

          <div>
            <div
              className="relative mr-[20px] crt-i"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart size={30} />
              <span class="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                {cart && cart.length}
              </span>
            </div>
          </div>
          {/* cart popup */}
          {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

          {/* wishlist popup */}
          {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}
        </div>
      </div>

      {/*  side bar*/}
      {open ? (
        <div className={`fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0`}>
          <div className="fixed w-[70%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
            <div className="w-full justify-between flex pr-3">
              <div>
                <div
                  className="relative mr-[15px]"
                  onClick={() => setOpenWishlist(true) || setOpen(false)}
                >
                  <AiOutlineHeart size={30} className="mt-5 ml-3" />
                  <span class="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                    {wishlist && wishlist.length}
                  </span>
                </div>
              </div>

              <RxCross1
                size={30}
                className="ml-4 mt-5 cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>

            {/* Search Bar */}
            <div className="my-8 w-[92%] m-auto h-[40px relative]">
              <input
                type="search"
                placeholder="Search for products"
                className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                value={searchTerm}
                onChange={handleSearchChange}
              />

              {searchData && (
                <div className="absolute bg-[#fff] z-10 shadow w-full left-0 p-3">
                  {searchData.map((i) => {
                    const d = i.name;

                    const Product_name = d.replace(/\s+/g, "-");
                    return (
                      <Link to={`/product/${Product_name}`}>
                        <div className="flex items-center">
                          <img
                            src={i.image_Url[0].url}
                            alt=""
                            className="w-[50px] mr-2"
                          />
                          <h5>{i.name}</h5>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
            <Navbar active={activeHeading} />
            <div className={`${styles.button} ml-4 !rounded-[4px]`}>
              <Link to={`${isSeller ? "/dashboard" : "/shop-create"}`}>
                <h1 className="text-[#fff] flex items-center">
                  {isSeller ? "Go Dashboard" : "Become Chef"}{" "}
                  <IoIosArrowForward className="ml-1" />
                </h1>
              </Link>
            </div>
            <br />
            <br />
            <br />

            {/* Mob Login */}
            <div className="flex w-full justify-center">
              {isAuthenticated ? (
                <div>
                  <Link to="/profile">
                    <img
                      src={`${backend_url}${user.avatar}`}
                      alt="Profile img"
                      className="w-[60px] h-[60px] rounded-full border-[3px] border-[#0eae88]"
                    />
                  </Link>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-[18px] pr-[10px] text-[#000000b7]"
                  >
                    Login{" "}
                  </Link>
                  <Link to="/sign-up" className="text-[18px] text-[#000000b7]">
                    Sign up{" "}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Header;
