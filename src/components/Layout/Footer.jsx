import React from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  footercompanyLinks,
  footerProductLinks,
  footerSupportLinks,
} from "../../static/data";

const Footer = () => {
  return (
    // <div className="bg-[#000] text-white">
    //     <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#342ac8] py-7">
    //         <h1 className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold md:w-2/5">
    //             <span className="text-[#56d879]">Subscribe</span> us for get news{" "}
    //             <br />
    //             events and offers
    //         </h1>
    //         <div>
    //             <input
    //                 type="text"
    //                 required
    //                 placeholder="Enter your email..."
    //                 className="text-gray-800
    //         sm:w-72 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2.5 rounded px-2 focus:outline-none"
    //             />
    //             <button className="bg-[#56d879] hover:bg-teal-500 duration-300 px-5 py-2.5 rounded-md text-whie md:w-auto w-full">
    //                 Submit
    //             </button>
    //         </div>
    //     </div>
    //     <div className="grid grid-cols-1 sm:gird-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16 sm:text-center">
    //         <ul className="px-5 text-center sm:text-start flex sm:block flex-col items-center">
    //             <img
    //                 src="https://wof-v3.devservertd.com/wof-img/way-of-food.svg"
    //                 alt=""
    //                 style={{ filter: "brightness(0) invert(1)" }}
    //             />
    //             <br />
    //             <p>The home and elements needeed to create beatiful products.</p>
    //             <div className="flex items-center mt-[15px]">
    //                 <AiFillFacebook size={25} className="cursor-pointer" />
    //                 <AiOutlineTwitter
    //                     size={25}
    //                     style={{ marginLeft: "15px", cursor: "pointer" }}
    //                 />
    //                 <AiFillInstagram
    //                     size={25}
    //                     style={{ marginLeft: "15px", cursor: "pointer" }}
    //                 />
    //                 <AiFillYoutube
    //                     size={25}
    //                     style={{ marginLeft: "15px", cursor: "pointer" }}
    //                 />
    //             </div>
    //         </ul>

    //         <ul className="text-center sm:text-start">
    //             <h1 className="mb-1 font-semibold">Company</h1>
    //             {footerProductLinks.map((link, index) => (
    //                 <li key={index}>
    //                     <Link
    //                         className="text-gray-400 hover:text-teal-400 duration-300
    //            text-sm cursor-pointer leading-6"
    //                         to={link.link}
    //                     >
    //                         {link.name}
    //                     </Link>
    //                 </li>
    //             ))}
    //         </ul>

    //         <ul className="text-center sm:text-start">
    //             <h1 className="mb-1 font-semibold">Shop</h1>
    //             {footercompanyLinks.map((link, index) => (
    //                 <li key={index}>
    //                     <Link
    //                         className="text-gray-400 hover:text-teal-400 duration-300
    //            text-sm cursor-pointer leading-6"
    //                         to={link.link}
    //                     >
    //                         {link.name}
    //                     </Link>
    //                 </li>
    //             ))}
    //         </ul>

    //         <ul className="text-center sm:text-start">
    //             <h1 className="mb-1 font-semibold">Support</h1>
    //             {footerSupportLinks.map((link, index) => (
    //                 <li key={index}>
    //                     <Link
    //                         className="text-gray-400 hover:text-teal-400 duration-300
    //            text-sm cursor-pointer leading-6"
    //                         to={link.link}
    //                     >
    //                         {link.name}
    //                     </Link>
    //                 </li>
    //             ))}
    //         </ul>
    //     </div>

    //     <div
    //         className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10
    //  text-center pt-2 text-gray-400 text-sm pb-8"
    //     >
    //         <span>© 2023 Om Pattjoshi. All rights reserved.</span>
    //         <span>Terms · Privacy Policy</span>
    //         <div className="sm:block flex items-center justify-center w-full">
    //             <img
    //                 src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
    //                 alt=""
    //             />
    //         </div>
    //     </div>
    // </div>
    <>
      <section className="footer">
        <div className="container">
          <div className="ftr-wrap">
            <div className="col-1">
              <div className="col">
                <img src="/way-of-food.svg" />
                <p>
                  At Ways of Food, we’re rebuilding the food system from
                  scratch, redefining who can participate in the food economy,
                  and returning personal connection to the making, eating, and
                  sharing of food. We are an online marketplace for local, food
                  safety certified cooks to connect with customers in their
                  community and earn a meaningful income selling homemade
                  dishes.
                </p>
                <ul>
                  <li>
                    <a href="#"></a>
                  </li>
                  <li>
                    <a href="#"></a>
                  </li>
                  <li>
                    <a href="#"></a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-2">
              <div className="col">
                <h3>About</h3>
                <ul>
                  <li>
                    <a href="#">About Us</a>
                  </li>
                  <li>
                    <a href="#">Features</a>
                  </li>
                  <li>
                    <a href="#">News</a>
                  </li>
                  <li>
                    <a href="#">Menu</a>
                  </li>
                </ul>
              </div>
              <div className="col">
                <h3>Company</h3>
                <ul>
                  <li>
                    <a href="#">Why Us?</a>
                  </li>
                  <li>
                    <a href="#">Partner With Us</a>
                  </li>
                  <li>
                    <a href="#">FAQ</a>
                  </li>
                  <li>
                    <a href="#">Blog</a>
                  </li>
                </ul>
              </div>
              <div className="col">
                <h3>Support</h3>
                <ul>
                  <li>
                    <a href="#">Account</a>
                  </li>
                  <li>
                    <a href="#">Support Center</a>
                  </li>
                  <li>
                    <a href="#">Feedback</a>
                  </li>
                  <li>
                    <a href="#">Contact Us</a>
                  </li>
                  <li>
                    <a href="#">Accessibilty</a>
                  </li>
                </ul>
              </div>
              <div className="col newesletter">
                <h3>Get in Touch</h3>
                <p>Question or feedback? We’d love to hear from you</p>
                <form action="">
                  <div className="formgroup">
                    <input type="text" />
                    <button>Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright">
          <p>
            Copyright © 2024 waysoffood | Designed & Powered by{" "}
            <a href="">Trisoft Digital</a>.
          </p>
        </div>
      </section>
    </>
  );
};

export default Footer;
