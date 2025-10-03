import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String },
    dob: { type: Date },
    gender: { type: String, enum: ["male", "female", "other"], default: "other" },
    bio: { type: String },
    profilePic: { type: String },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], default: [0, 0] }, // [longitude, latitude]
    },

     failedLoginAttempts: {
    type: Number,
    default: 0
  },
  blockedUntil: {
    type: Date,
    default: null
  }

  },
  { timestamps: true }
);

UserSchema.index({ location: "2dsphere" }); // geolocation for Tinder discovery

const User = mongoose.model("User", UserSchema);
export default User;
