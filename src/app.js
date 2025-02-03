const express = require("express");
const mongoose = require("mongoose");
const claimRoutes = require("./routes/claimRoutes");
const policyRoutes = require("./routes/policyRoutes");
const policyholderRoutes = require("./routes/policyholderRoutes");

const app = express();
app.use(express.json());

// MongoDB Connection
const MONGO_URI = "mongodb://localhost:27017/claimsDB"; // Change if using MongoDB Atlas
mongoose
  .connect(MONGO_URI)
  .then(() => console.log(" MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// API Routes
app.use("/api", claimRoutes);
app.use("/api", policyRoutes);
app.use("/api", policyholderRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send(" The Claim Management System is running!");
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
