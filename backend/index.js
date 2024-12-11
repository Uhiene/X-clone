if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const connectToDB = require("./config/connectToDB");
const postRoutes = require("./routes/postRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser());

// Middleware for serving static files (uploads folder)
const path = require("path");

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/uploads", (req, res, next) => {
  console.log(`Request for file: ${req.url}`);
  res.set("Cache-Control", "no-cache");
  next();
});

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", 
    credentials: true,
  })
);


connectToDB();

app.use("/api", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/notifications", notificationRoutes);

app.listen(process.env.PORT);
