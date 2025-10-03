import React, { useEffect, useState } from "react";
import { instance } from "../axiosConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "other",
    bio: "",
    profilePic: "",
    password: ""
  });

  const [file, setFile] = useState(null); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await instance.get("/user/profile");
        setFormData({
          name: res.data.name,
          email: res.data.email,
          phone: res.data.phone || "",
          dob: res.data.dob ? res.data.dob.split("T")[0] : "",
          gender: res.data.gender || "other",
          bio: res.data.bio || "",
          profilePic: res.data.profilePic || "",
          password: ""
        });
      } catch (err) {
        console.log(err);
        toast.error("Failed to load profile");
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("dob", formData.dob);
      data.append("gender", formData.gender);
      data.append("bio", formData.bio);
      data.append("password", formData.password);

      if (file) {
        data.append("profilePic", file); 
      }

      await instance.put("/user/profile", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Profile updated successfully!");
      setFormData((prev) => ({ ...prev, password: "" }));
    } catch (err) {
      console.log(err);
      toast.error("Update failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <h2>Edit Profile</h2>
      <input className="profile-input" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
      <input className="profile-input" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <input className="profile-input" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
      <input className="profile-input" type="date" name="dob" value={formData.dob} onChange={handleChange} />
      <select className="profile-select" name="gender" value={formData.gender} onChange={handleChange}>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <textarea className="profile-textarea" name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio" />

      <input className="profile-input" type="file" accept="image/*" onChange={handleFileChange} />

      {file && (
        <img
          src={URL.createObjectURL(file)}
          alt="preview"
          style={{ width: "100px", height: "100px", marginTop: "10px", borderRadius: "50%" }}
        />
      )}

      <input
        className="profile-input"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="New Password"
      />

      <button
        className={`profile-button ${loading ? "disabled" : ""}`}
        onClick={handleUpdate}
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default UpdateProfile;
