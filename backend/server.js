const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

const app = express();

// CORS: allow local and deployed frontend
app.use(cors({
  origin: ['http://localhost:3000', process.env.FRONTEND_URL || "https://codepranjali.vercel.app"],
  credentials: true
}));

app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(
  process.env.MONGO_URI || "mongodb+srv://pranjalichavan870_db_user:Pranjali2003@cluster0.6nj822y.mongodb.net/smartTaskDB?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// Auth routes
app.use("/api/auth", authRoutes);

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
