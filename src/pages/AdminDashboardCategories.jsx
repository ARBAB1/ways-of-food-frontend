import React from 'react'
import AdminHeader from '../components/Layout/AdminHeader'
import AdminSideBar from "../components/Admin/Layout/AdminSideBar.jsx";
import AllCategories from '../components/Admin/AllCategories.jsx';
const AdminDashboardCategories = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex superadmin-dashboard">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSideBar active={1} />
          </div>
         <AllCategories/>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardCategories