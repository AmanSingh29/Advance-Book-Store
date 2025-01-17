import React, { useState } from "react";
import { useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_PATH } from "../constants/endpoints";
import { useAppContext } from "../context/AppContext";
import useApi from "../hooks/useApi";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Login = () => {
  const query = useQuery();
  const path = query.get("path");
  const openPopup = query.get("openpopup");
  const { api } = useApi();
  const { showToast, setUser, setToken } = useAppContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(LOGIN_PATH, formData);
      if (response.data.success) {
        if (response.data.user) setUser(response.data.user);
        if (response.data.token) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        }
        if(path){
          let newPath = `/${path}`
          console.log("this is calling above-----------", openPopup)
          if(openPopup){
            console.log("this is calling-----------", openPopup)
            newPath += `?openpopup=true`
          } 
          navigate(newPath);
        }else{
          navigate("/");
        }
        showToast("success", response.data.message);
      } else {
        showToast("error", response.data.message);
      }
    } catch (error) {
      showToast("error", error.response.data.message || error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-gray-600 text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
