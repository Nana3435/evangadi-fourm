import axios from "axios";

const axiosBase = axios.create({
  baseURL: "https://evangadiforumbackend.kibranme.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosBase;
