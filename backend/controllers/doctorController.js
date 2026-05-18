const doctors = require("../data/doctors.json");

function normalizeAvailabilityDates(availability) {
    return availability.map((day, index) => {
        const normalizedDate = new Date();
        normalizedDate.setDate(normalizedDate.getDate() + index);
        return {
            ...day,
            date: normalizedDate.toISOString().split('T')[0],
        };
    });
}

function normalizeDoctors(doctorsList) {
    return doctorsList.map((doctor) => ({
        ...doctor,
        availability: normalizeAvailabilityDates(doctor.availability),
    }));
}
const getDoctors = (req, res) =>
{
    try
    {
        const normalizedDoctors = normalizeDoctors(doctors);
        res.json({
            success:true,
            totalDoctors:normalizedDoctors.length,
            doctors:normalizedDoctors,
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
        const normalizedDoctors = normalizeDoctors(doctors);
        const doctor=normalizedDoctors.find(
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