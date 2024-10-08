import { useState } from "react";
import axiosInstanse from "../api/axiosConfig";

const useApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchApi = async (method, url, data = {}, config = {}) => {
    setError(null);
    setLoading(true);
    try {
      const response = await axiosInstanse({ method, url, data, ...config });
      return response;
    } catch (error) {
      setError(error?.response?.data?.message || "Something Went Wrong!");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const api = {
    get: (url, config) => fetchApi("get", url, null, config),
    post: (url, data, config) => fetchApi("post", url, data, config),
    patch: (url, data, config) => fetchApi("patch", url, data, config),
    delete: (url, config) => fetchApi("delete", url, null, config),
    put: (url, data, config) => fetchApi("get", url, data, config),
  };

  return { api, error, loading };
};

export default useApi;
