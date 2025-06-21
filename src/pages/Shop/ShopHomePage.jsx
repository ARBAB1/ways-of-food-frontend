import React from "react";
import styles from "../../styles/styles";
import ShopInfo from "../../components/Shop/ShopInfo";
import ShopProfileData from "../../components/Shop/ShopProfileData";

const ShopHomePage = () => {
  return (
    <div className={`${styles.section} chef-detail-page`}>
      <div className="w-full 800px:flex justify-between">
        <div className="800px:w-[25%] bg-[#fff] rounded-[30px] shadow-sm 800px:overflow-y-scroll 800px:h-[90vh] 800px:sticky top-10 left-0 z-10 chef-info-sidebar">
          <ShopInfo isOwner={true} />
        </div>
        <div className="800px:w-[72%] mt-5 800px:mt-['unset'] info-right-a">
          <ShopProfileData isOwner={true} />
        </div>
      </div>
    </div>
  );
};

export default ShopHomePage;
