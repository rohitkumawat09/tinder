import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../../axiosConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false); // loader state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // start loader
    try {
      const res = await instance.post("/user/register", formData, {
        withCredentials: true
      });
      toast.success("🎉 Registration successful!");
      console.log(res.data);
      setTimeout(() => navigate("/loginform"), 1500);
    } catch (err) {
      console.error(err.response?.data);
      toast.error(err.response?.data?.error || "❌ Registration failed");
    } finally {
      setLoading(false); // stop loader
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Register</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="auth-input"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="auth-input"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="auth-input"
        />

        {/* 👇 Loader + disable button */}
        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? (
            <>
              <span className="spinner"></span> Registering...
            </>
          ) : (
            "Register"
          )}
        </button>

        <Link to="/loginform"><h3>Login</h3></Link>
      </form>
<ToastContainer 
  position="top-right"     // right top में आएगा
  autoClose={2000} 
  hideProgressBar={false} 
  newestOnTop={false} 
  closeOnClick 
  rtl={false} 
  pauseOnFocusLoss 
  draggable 
  pauseOnHover 
  theme="colored"          
/>

    </div>
  );
};

export default RegisterForm;
