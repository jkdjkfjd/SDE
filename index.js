require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const workstationRoutes = require("./routes/workstationRoutes");
const { startAutoUpdate } = require("./controllers/workstationController");

const app = express();

// SIMPLE CORS FIX - Allow all origins (for development only)
app.use(cors({
  origin: true,  // Allow any origin
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

connectDB()
  .then(() => {
    console.log("✅ Database connected");
    startAutoUpdate();
  })
  .catch(err => console.error("DB Error:", err));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/workstations", workstationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));