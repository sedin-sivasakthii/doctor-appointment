const express=require ("express");
const cors=require("cors");
require("dotenv").config();

const app = express();
app.use(cors(
    {
        origin:"http://localhost:4200",
        credentials:true,
    }
));
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Doctor Appointment API Running");
});
const authRoutes=require("./routes/authRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
app.use("/auth",authRoutes);
app.use("/doctors",doctorRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});