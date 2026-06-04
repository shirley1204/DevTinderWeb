import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../Utils/Constants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/Redux/userSlice";

const Login = () => {
  const [emailId, setEmailId] = useState("shirley@gmail.com");
  const [password, setPassword] = useState("Shirley@123");
  const [err, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlelogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        },
      );
      if (res.data) {
        dispatch(addUser(res.data));
        navigate("/");
      }
    } catch (err) {
      console.log(err.response);
      if (err?.response?.data) {
        setError(err?.response?.data || "Something Went Wrong");
      }
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-[calc(50vh-90px)]">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend text-blue-600">Login</legend>

          <label className="label">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            className="input"
            placeholder="Email"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
          />

          <label className="label">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            className="input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="text-red-600 mt-1.5">{err}</span>
          <button className="btn  btn-dash btn-info mt-4" onClick={handlelogin}>
            LOGIN
          </button>
        </fieldset>
      </div>
    </>
  );
};

export default Login;
