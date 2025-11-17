const express = require("express");
const dotenv = require("dotenv");

// 1. CONFIG DOTENV FIRST - Before any other imports that might use env vars
dotenv.config();

const cors = require("cors");
const connectDB = require("./config/database.js");
const userRoutes = require("./routes/userRoutes.js");
const transactionRoutes = require("./routes/transactionRoutes");
const productRoutes = require("./routes/productRoutes");
const watchlistRoutes = require("./routes/watchlistRoutes");

const app = express();

// 2. ROBUST CORS CONFIGURATION
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:5173"], // Use array for flexibility
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Essential for cookies/tokens
  })
);

app.use(express.json());

const PORT = process.env.PORT || 5000; // Fallback if env is missing

app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/products", productRoutes);
app.use("/api/watchlist", watchlistRoutes);

app.get("/", (req, res) => {
  res.send("EnxtAI Financial App Backend is running!");
});

connectDB()
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database connection Unsuccessful", err); // Log the actual error!
  });
