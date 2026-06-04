import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "./Utils/Constants";

const Navbar = () => {
  const user = useSelector((store) => store?.user);
  const navigate = useNavigate();
  const firstName = user?.data?.firstName || "";
  const lastName = user?.data?.lastName || "";

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "logout",
        {},
        {
          withCredentials: true,
        },
      );
      return navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar bg-info-content">
      <div className="flex-1">
        <Link to="/feed">
          <span className="btn btn-ghost text-xl">DevTinder </span>{" "}
        </Link>
      </div>
      {user && (
        <div className="flex gap-2">
          {`${firstName} ${lastName}`}
          <div className="dropdown dropdown-end mr-6">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <Link to="/profile" className="justify-between">
                <span className="badge">Profile</span>
              </Link>
              <span className="badge text-blue-500" onClick={handleLogout}>
                Logout
              </span>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
