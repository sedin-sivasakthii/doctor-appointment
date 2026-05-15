const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

app.use(
    cors({
        origin: "http://localhost:4200",
        credentials: true,
    })
);

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Doctor Appointment API Running");
});

app.use("/auth", authRoutes);
app.use("/bookings", bookingRoutes);

const PORT =
process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});