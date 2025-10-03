import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import swaggerSpec from "./swagger.js";
import swaggerUi from "swagger-ui-express";

import userRouter from "./routes/userRoutes.js";
dotenv.config();
const app = express();
const port = process.env.PORT;

connectDB();

const allowedOrigins = [
  process.env.BaCKEND_URL,
  process.env.FRONTEND_URL,
  process.env.LOCAL_URL,
  process.env.VERCEL_URL,
  "http://localhost:5173",
  "http://localhost:4000",
  "http://127.0.0.1:5500",
  "https://tinder-731x.onrender.com",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);




app.listen(port, () => {
  console.log(`🚀 Server started at port ${port}`);
});
