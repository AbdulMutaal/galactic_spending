//Libraries
import axios from "axios";

//Env variable
export const BaseURL = process.env.REACT_APP_BACKEND_API;

// Created an axios instance adding our api BaseURL
const axiosInstance = axios.create({
  baseURL: BaseURL,
});

//Config for application json
export const jsonConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

/**
 * Axios Response Handler
 */
axiosInstance.interceptors.response.use(
  (response) =>
    new Promise((resolve, reject) => {
      resolve(response);
    }),
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
