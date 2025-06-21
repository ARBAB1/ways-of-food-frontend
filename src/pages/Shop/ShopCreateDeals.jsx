import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import CreateDeals from "../../components/Shop/CreateDeals";
const ShopCreateDeals = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full dashboard-wrap-main">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={4} />
        </div>
        <div className="w-full justify-center flex">
          <CreateDeals />
        </div>
      </div>
    </div>
  );
};

export default ShopCreateDeals;
