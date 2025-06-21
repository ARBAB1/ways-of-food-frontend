import React from "react";
import { useNavigate } from "react-router-dom";
import { brandingData, categoriesData } from "../../../static/data";
import styles from "../../../styles/styles";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";

const Categories = () => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className={`${styles.section} bg-white p-6 rounded-lg mb-12`}
        id="categories"
      >
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          navigation={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          modules={[Navigation]}
          className="mySwiper"
        >
          {categoriesData &&
            categoriesData.map((i) => {
              const handleSubmit = (i) => {
                navigate(`/products?category=${i.title}`);
              };
              return (
                <SwiperSlide key={i.id}>
                  <div
                    className="category-item cursor-pointer"
                    onClick={() => handleSubmit(i)}
                  >
                    <img
                      src={i.image_Url}
                      className="w-[120px] h-[120px] object-cover rounded-full mx-auto"
                      alt={i.title}
                    />
                    <h5
                      className={`text-[18px] leading-[1.3] text-center mt-3`}
                    >
                      {i.title}
                    </h5>
                    <p className="text-center text-gray-500">(86 dishes)</p>
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </>
  );
};

export default Categories;
