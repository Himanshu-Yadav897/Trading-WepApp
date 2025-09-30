const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/database.js");
const userRoutes = require("./routes/userRoutes.js");
const transactionRoutes = require("./routes/transactionRoutes");
const productRoutes = require('./routes/productRoutes');
const watchlistRoutes = require('./routes/watchlistRoutes');


const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT;

app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);
app.use('/api/products', productRoutes);
app.use('/api/watchlist', watchlistRoutes);


app.get("/", (req, res) => {
  res.send("EnxtAI Financial App Backend is running!");
});

connectDB()
  .then(() => {
    console.log("Database connection successful");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(() => {
    console.log("Database connection Unsuccessful");
  });
