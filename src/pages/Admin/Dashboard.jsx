import React, { useState, useEffect } from "react";
import { AiOutlineProduct } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast"; // Optional for showing toasts on success/failure

const Dashboard = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  // Fetch the total products and total orders on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/dashboard/summary`);
        setTotalProducts(response.data.productCount);
        setTotalOrders(response.data.orderCount);
      } catch (error) {
        console.error("Error fetching summary data:", error);
        toast.error("Failed to fetch data.");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-10 bg-teal-50 min-h-screen">
      {/* Dashboard Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-teal-800">Admin Dashboard</h1>
        <p className="text-teal-600">Overview of total products and orders</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Products */}
        <div className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-between border-l-4 border-teal-500">
          <div>
            <h2 className="text-xl font-semibold text-teal-800">Total Products</h2>
            <p className="text-3xl font-bold text-teal-600">{totalProducts}</p>
          </div>
          <div className="bg-teal-100 p-3 rounded-full">
            <AiOutlineProduct className="w-10 h-10" />
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-between border-l-4 border-cyan-500">
          <div>
            <h2 className="text-xl font-semibold text-cyan-800">Total Orders</h2>
            <p className="text-3xl font-bold text-cyan-600">{totalOrders}</p>
          </div>
          <div className="bg-cyan-100 p-3 rounded-full">
            <svg
              className="w-8 h-8 text-cyan-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 17v-6m3-4V3m0 14v-4m0-4h4m-4-4H3m12 8h-4m-4 4H3m12 8H3m12-4h-4"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Links to Management Sections */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Management */}
        <div className="p-6 bg-teal-500 rounded-lg text-white shadow-md hover:bg-teal-600 transition duration-200 cursor-pointer">
          <h3 className="text-lg font-bold">Product Management</h3>
          <p>Manage all products efficiently.</p>
        </div>

        {/* Order Management */}
        <div className="p-6 bg-cyan-500 rounded-lg text-white shadow-md hover:bg-cyan-600 transition duration-200 cursor-pointer">
          <h3 className="text-lg font-bold">Order Management</h3>
          <p>Track and process orders seamlessly.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
