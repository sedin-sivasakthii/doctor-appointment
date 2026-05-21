const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const doctorRoutes = require("./routes/doctorRoutes");

const app = express();

const corsOrigins = (process.env.CORS_ORIGIN || "http://localhost:4200")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || corsOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`CORS origin denied: ${origin}`));
        }
    },
    credentials: true,
}));

app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.get("/", (req, res) => {
    res.send("Doctor Appointment API Running");
});

app.use("/auth", authRoutes);
app.use("/doctors", doctorRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});