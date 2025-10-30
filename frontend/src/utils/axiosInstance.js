import axios from "axios";

const axiosBase = axios.create({
  baseURL: "https://evangadi-forum-project-2-25oa.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosBase;
