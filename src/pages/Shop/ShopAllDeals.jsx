import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import AllDeals from "../../components/Shop/AllDeals";
const ShopAllDeals = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full dashboard-wrap-main">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={1} />
        </div>
        <AllDeals />
      </div>
    </div>
  );
};

export default ShopAllDeals;
