import React, { useCallback, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import {
  IdentificationIcon,
  MapPinIcon,
  PhoneIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import useApi from "../hooks/useApi";
import { useAppContext } from "../context/AppContext";
import { ORDER_PATH } from "../constants/endpoints";
import BookLoader from "../components/BookLoader";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { api, loading } = useApi();
  const { showToast, token } = useAppContext();
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      const response = await api.get(ORDER_PATH);
      if (response.data) {
        if (response.data.success) {
          setData(response.data.data);
        } else {
          showToast("error", "Something went wrong!");
        }
      }
    } catch (error) {
      showToast("error", error.message);
    }
  }, []);

  useEffect(() => {
    if (!token) {
      navigate("/login?path=dashboard");
    } else {
      fetchData();
    }
  }, []);

  return (
    <>
      <NavBar />
      {loading ? (
        <div className="w-full h-[80vh]">
          <BookLoader text="Getting details..." />
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          {/* User Info */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <UserIcon className="h-6 w-6 mr-2 text-blue-500" />
              User Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm md:text-base">
              <div className="flex items-center">
                <IdentificationIcon className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-700">
                  <strong>Name:</strong> {data?.name}
                </span>
              </div>
              <div className="flex items-center">
                <UserIcon className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-700">
                  <strong>Username:</strong> {data?.username}
                </span>
              </div>
              <div className="flex items-center">
                <PhoneIcon className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-700">
                  <strong>Phone:</strong> {data?.phone}
                </span>
              </div>
            </div>
          </div>

          {/* Orders */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
            {data?.orders?.length > 0 ? (
              <div className="space-y-4">
                {data?.orders?.map((order) => (
                  <div
                    key={order._id}
                    className="border rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center hover:shadow-lg transition cursor-pointer"
                    onClick={() => {
                      // Navigate to order details page
                      window.location.href = `/order/${order.oid}`;
                    }}
                  >
                    <div className="flex-grow space-y-2">
                      <p className="text-lg font-semibold">
                        <ShoppingBagIcon className="h-5 w-5 inline-block mr-2" />
                        Order ID: {order.oid}
                      </p>
                      <p className="text-gray-600 text-sm md:text-base">
                        <MapPinIcon className="h-5 w-5 inline-block mr-2" />
                        Address: {order.address}
                      </p>
                      <p className="text-gray-600 text-sm md:text-base">
                        Status: {order.status}
                      </p>
                      <p className="text-gray-600 text-sm md:text-base">
                        Total Amount: ₹{order.total_amount.toFixed(2)}
                      </p>
                    </div>
                    <p className="text-blue-600 font-medium mt-4 md:mt-0 md:ml-4">
                      View Details
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 text-lg">
                  You don’t have any orders yet. Start shopping to place your
                  first order!
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
