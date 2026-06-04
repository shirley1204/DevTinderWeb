import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./DrawerLayout/Footer";
import Navbar from "./Navbar";
import axios from "axios";
import { BASE_URL } from "./Utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./Utils/Redux/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store?.user);

  const fetchUser = async () => {
    if (userData) return;
    try {
      const res = await axios.get(BASE_URL + "profile", {
        withCredentials: true,
      });
      if (res?.data) {
        dispatch(addUser(res?.data));
      } else {
        navigate("/login");
      }
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Body;
