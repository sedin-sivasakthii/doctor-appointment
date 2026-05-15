const doctors =require("../data/doctors.json");
const getDoctors =(req,res)=>
{
    try
    {
        res.json({
            success:true,
            totalDoctors:doctors.length,
            doctors,
        });
    }catch(error)
    {
        res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};
const getDoctorById = (req,res)=>
{
    try
    {
        const doctorId=parseInt(req.params.id);
        const doctor=doctors.find(
            (doc)=>doc.id===doctorId
        );
        if(!doctor)
        {
            return res.status(404).json({
                success:false,
                message:"Doctor not found",
            });
        }
    
    res.json({
        success:true,
        doctor,
    });
}catch(error)
{
    res.status(500).json({
        success:false,
        message:error.message,
    });
}
};
module.exports={
    getDoctors,
    getDoctorById,
};