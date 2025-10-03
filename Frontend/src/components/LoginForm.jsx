import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { instance } from "../../axiosConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const referer =
    new URLSearchParams(location.search).get("referer") || "/home";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await instance.post(
        "/user/login",
        { email, password },
        { withCredentials: true }
      );

      toast.success("🎉 Login successful");

      setTimeout(() => {
        if (res.data.user.role === "admin") {
          navigate("/AddProduct");
        } else {
          navigate("/home");
        }
      }, 1500);
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      toast.error(error.response?.data?.error || "❌ Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-box">
        <h2 className="form-heading">Login</h2>

        <input
          type="email"
          className="form-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="form-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="form-button" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <Link to="/">
          <h3 className="form-link">Register</h3>
        </Link>
      </form>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default LoginForm;
