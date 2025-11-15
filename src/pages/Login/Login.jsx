import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash, FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthContext";
import { UserContext } from "../../contexts/UserContext";

const Login = () => {
  const navigate = useNavigate();
  // const { _, setUser } = useContext(UserContext);
  const { _, setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [role, setRole] = useState("user");

  const [showPassword, setshowPassword] = useState(true);

  const { signupWithGmail } = useContext(AuthContext);

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
        "http://localhost:5050/login",
        formData
      );
      console.log("Login success:", response.data);

      const token = response.data?.token || response.data?.data?.token;
      const user = response.data?.user;
      if (token) {
        localStorage.setItem("authToken", token); // save token
        localStorage.setItem("id", response?.data?.user?._id); // save _id
        localStorage.setItem("role", response.data?.user.role);
        setUser({
          email: formData.email,
          displayName:
            response.data?.user?.name || formData.email.split("@")[0],
          photoURL: null, // fallback handled in Profile.jsx
          role: user.role,
        });
      }

      if (response.data?.user.role === "admin") {
        toast.success("Login successful! Redirecting to admin-dashboard...", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
        setTimeout(() => {
          navigate("/admin-dashboard");
        }, 2000);
      } else {
        toast.success("Login successful! Redirecting to home...", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.log("Login error", error);
      toast.error("Login failed. Try again.", {
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
        <h2 className="text-center text-3xl font-bold">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4 mb-4 justify-center items-center">
            <button
              type="button"
              onClick={() => setRole("user")}
              className={`px-4 py-2 rounded-3xl ${
                role === "user"
                  ? "bg-gradient-to-r from-lavender to-caramel text-white"
                  : "bg-cream text-choco"
              }`}
            >
              User
            </button>
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

          <div className="relative">
            <label htmlFor="password" className="text-xl">
              Password
            </label>
            <input
              type={showPassword ? "password" : "text"}
              id="password"
              name="password"
              placeholder="Enter password"
              autoComplete="current-password"
              className="bg-cream text-choco rounded p-2 w-full my-1 focus:ring-5 focus:ring-caramel"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setshowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1.5 text-choco"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            <Link to="/" className="hover:underline">
              Forgot password?
            </Link>
          </div>

          <div>
            <button
              type="submit"
              className="bg-caramel text-center p-2 mt-5 rounded-3xl text-xl w-full transition-tansform hover:scale-95"
            >
              Login as {role === "admin" ? "Admin" : "User"}
            </button>
          </div>
        </form>

        <p className="text-center text-xl">
          Register your details?
          <Link to="/signup" className="text-caramel hover:underline mx-1">
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
