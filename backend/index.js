if (process.env.NODE_ENV != "production") {
    require("dotenv").config()
}

const express = require("express")
const cors = require("cors")
const connectToDB = require("./config/connectToDB")
const postRoutes = require("./routes/postRoutes")
const path = require("path");


const app = express()

// Middleware for serving static files (uploads folder)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.json())
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
  };
app.use(cors(corsOptions));

connectToDB()

app.use("/api", postRoutes);

app.listen(process.env.PORT)