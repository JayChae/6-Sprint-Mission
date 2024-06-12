import axios from "axios";
const panda_market_backend_api = process.env.NEXT_PUBLIC_BASE_URL;

const axiosInstance = axios.create({
  baseURL: panda_market_backend_api,
  timeout: 20000,
});

if (typeof window !== "undefined") {
  axiosInstance.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) return config;
      config.headers.Authorization = `Bearer ${accessToken}`;;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      alert(`에러발생: ${error.response.data.message} `);
      return Promise.reject(error);
    }
  );
}

export default axiosInstance;
