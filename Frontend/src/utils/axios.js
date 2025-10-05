import axios from "axios";
// Set the base URL for all axios requests
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
});
export default axiosInstance;
