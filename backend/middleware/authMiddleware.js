import User from "../models/User.js";
import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token; // ✅ correct cookie name

    if (!token) {
      return res.status(401).json({ error: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId); // ✅ fetch full user

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = user; // ✅ attach full user object
    next();
  } catch (err) {
    console.error('Auth error:', err);
    res.status(401).json({ error: 'Token is not valid' });
  }
};

export default authMiddleware;