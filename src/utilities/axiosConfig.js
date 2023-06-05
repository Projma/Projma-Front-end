// import Axios from 'axios';
import axios from "axios";
import { baseUrl } from "./constants";

// const apiInstance = Axios.create({
const apiInstance = axios.create({
  baseURL: baseUrl,
});

apiInstance.interceptors.request.use(
  (config) => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      // config.headers['Authorization'] = 'JWT ' + access_token; // Bearer
      config.headers["Authorization"] = "Bearer " + access_token;
      // config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiInstance.interceptors.response.use(
  (res) => {
    return res; // response
  }
);

export default apiInstance;
