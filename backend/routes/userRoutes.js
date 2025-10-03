import express from "express";
import { registerUser, loginUser, logoutUser } from '../controllers/userController.js';
import authMiddleware from "../middleware/authMiddleware.js";
import { getProfile, updateProfile } from "../controllers/Userprofile.js";
import uploadCloud from "../middleware/uploadMiddleware.js";

const router = express.Router();
/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: 
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *               dob:
 *                 type: string
 *                 format: date
 *               gender:
 *                 type: string
 *                 enum: [male, female, other]
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */
router.post('/register', registerUser);
/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: 
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', loginUser)

/**
 * @swagger
 * /api/logout:
 *   post:
 *     summary: Logout user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User logged out successfully
 */;
router.post("/logout", logoutUser);
/**
 * @swagger
 * /api/checkToken:
 *   get:
 *     summary: Check user token
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token is valid
 *       401:
 *         description: Unauthorized
 */
router.get("/checkToken", authMiddleware, (req, res) => {
  res.json({ user: req.user });
});


/**
 * @swagger
 * /api/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile returned
 */

router.get("/profile", authMiddleware, getProfile);


/**
 * @swagger
 * /api/profile:
 *   put:
 *     summary: Update user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               bio:
 *                 type: string
 *               profilePic:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile updated
 */

router.put("/profile", authMiddleware, uploadCloud.single("profilePic"), updateProfile);

export default router;
