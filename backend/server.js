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
app.use("/auth",authRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});