import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import PostQuestion from "./pages/PostQuestion/PostQuestion";
import Answers from "./pages/Answers/Answers";
import { createContext, useEffect, useState } from "react";
import axios from "./utils/axiosInstance.js";
import { MoonLoader } from "react-spinners";

export const AppContext = createContext();

const Router = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  

  useEffect(() => {
    const checkUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }
        setLoading(true);

        const { data } = await axios.get("/user/check", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(data);
        setLoading(false);
      } catch (error) {
        console.log(error?.response?.data);
        setLoading(false);
        navigate("/login");
      }
    };

    checkUser();
  }, []);
  // console.log(user)

  return (
    <AppContext value={{ user }}>
      {loading ? (
        <MoonLoader />
      ) : (
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/post-question" element={<PostQuestion />} />
          <Route path="/answers/:questionid" element={<Answers />} />
        </Routes>
      )}
    </AppContext>
  );
};

export default Router;
