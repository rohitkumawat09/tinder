import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "user_images",
    allowed_formats: ["jpg", "png", "jpeg", "webp", "avif"],
    public_id: (req, file) => `user-${Date.now()}`,
  },
});

const uploadCloud = multer({ storage });

export default uploadCloud;
