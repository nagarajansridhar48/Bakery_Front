import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobilenumber: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting form:", formData); // ← Log user input

    try {
      const response = await axios.post(
        "http://localhost:5050/signup",
        formData
      );
      console.log("Signup success:", response.data);

      toast.success("Signup successful! Redirecting to login...", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      console.log("Signup error", error);
      toast.error("Signup failed. Try again.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  return (
    <div className="bg-cream p-6 min-h-screen flex flex-col justify-center items-center">
      <ToastContainer />

      <div className="bg-choco text-white rounded-xl shadow-lg p-10 space-y-6 max-w-md w-full">
        <h2 className="text-center text-3xl font-bold">Sign Up</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="text-xl">
              Firstname
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              placeholder="Enter firstname"
              autoComplete="given-name"
              className="bg-cream text-choco rounded p-2 w-full mt-1 focus:ring-5 focus:ring-caramel"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="lastname" className="text-xl">
              Lastname
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              placeholder="Enter lastname"
              autoComplete="family-name" 
              className="bg-cream text-choco rounded p-2 w-full mt-1 focus:ring-5 focus:ring-caramel"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="text-xl">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              autoComplete="email" 
              className="bg-cream text-choco rounded p-2 w-full mt-1 focus:ring-5 focus:ring-caramel"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="mobilenumber" className="text-xl">
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobilenumber"
              name="mobilenumber"
              placeholder="Enter mobile number"
              autoComplete="tel" 
              className="bg-cream text-choco rounded p-2 w-full mt-1 focus:ring-5 focus:ring-caramel"
              value={formData.mobilenumber}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="text-xl">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              autoComplete="new-password"
              className="bg-cream text-choco rounded p-2 w-full mt-1 focus:ring-5 focus:ring-caramel"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="bg-caramel text-center p-2 mt-5 rounded-3xl text-xl w-full transition-tansform hover:scale-95"
            >
              Sign Up
            </button>
          </div>
        </form>

        <p className="text-center text-xl">
          Already have an account?{" "}
          <Link to="/login" className="text-caramel hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
