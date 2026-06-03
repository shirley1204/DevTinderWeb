import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./DrawerLayout/navbar";
import Footer from "./DrawerLayout/Footer";

const Body = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Body;
