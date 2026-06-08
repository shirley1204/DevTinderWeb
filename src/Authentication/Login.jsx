import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../Utils/Constants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/Redux/userSlice";
import { validateSignUpForm, validateLoginForm } from "../Utils/Validation";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState(null);
  const [signUpform, setSingUpform] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlelogin = async () => {
    const validationErrors = await validateLoginForm(emailId, password);
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }
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
        dispatch(addUser(res.data?.data));
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

  const handleRegister = async () => {
    const validationErrors = await validateSignUpForm(
      firstName,
      lastName,
      emailId,
      password,
    );
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }
    try {
      const res = await axios.post(
        BASE_URL + "singUp",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        {
          withCredentials: true,
        },
      );
      if (res?.data?.data) {
        dispatch(addUser(res?.data?.data));
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
      <div className="flex justify-center items-center h-[calc(70vh-90px)]">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend text-blue-600">
            {signUpform ? "Sign Up" : "Login"}
          </legend>
          {signUpform ? (
            <>
              <label className="label">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="input"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <label className="label">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="input"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </>
          ) : null}
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

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="input w-full"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              className="absolute right-2 top-2 text-sm text-blue-600"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {error && typeof error === "object" ? (
            <div className="text-red-600 mt-2">
              {Object.values(error).map((msg, i) => (
                <p className="text-red-600 mt-1.5" key={i}>
                  {msg}
                </p>
              ))}
            </div>
          ) : error ? (
            <span className="text-red-600 mt-1.5">{error}</span>
          ) : null}
          <button
            className="btn  btn-dash btn-info mt-4"
            onClick={signUpform ? handleRegister : handlelogin}
          >
            {signUpform ? "SIGN UP" : "LOGIN"}
          </button>
      <div className="text-center mt-4 text-sm text-gray-600">
  {!signUpform ? (
    <>
      Don’t have an account?{" "}
      <button
        type="button"
        onClick={() => setSingUpform(true)}
        className="text-blue-500 hover:text-blue-700 font-semibold"
      >
        Create account
      </button>
    </>
  ) : (
    <>
      Already registered?{" "}
      <button
        type="button"
        onClick={() => setSingUpform(false)}
        className="text-blue-500 hover:text-blue-700 font-semibold"
      >
        Sign in
      </button>
    </>
  )}
</div>
        </fieldset>
      </div>
    </>
  );
};

export default Login;
