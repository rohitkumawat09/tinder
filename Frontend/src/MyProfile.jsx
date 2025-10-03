import React, { useEffect, useState } from "react";
import { instance } from "../axiosConfig";

const MyProfile = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await instance.get("/user/profile");
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProfile();
  }, []);

  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" }); 
    const year = date.getFullYear();
    return `${day}, ${month} ${year}`; 
  };

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      {user.profilePic && <img className="profile-image" src={user.profilePic} alt="Profile" />}
      <div className="profile-field"><strong>Name:</strong> {user.name}</div>
      <div className="profile-field"><strong>Email:</strong> {user.email}</div>
      <div className="profile-field"><strong>Phone:</strong> {user.phone}</div>
      <div className="profile-field"><strong>DOB:</strong> {formatDate(user.dob)}</div>
      <div className="profile-field"><strong>Gender:</strong> {user.gender}</div>
      <div className="profile-field"><strong>Bio:</strong> {user.bio}</div>
    </div>
  );
};

export default MyProfile;
