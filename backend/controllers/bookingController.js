const fs = require("fs");
const bookings = require("../data/booking.json");
const doctors = require("../data/doctors.json");


const saveBookings = () => {
    fs.writeFileSync("./data/booking.json", JSON.stringify(bookings, null, 2));
};

const saveDoctors = () => {
    fs.writeFileSync("./data/doctors.json", JSON.stringify(doctors, null, 2));
};

const generateBookingRef = () => {
    return "MED-" + Date.now();
};

const createBooking = (req, res) => {

    try {
        const { doctorId, date, slotTime, complaint, paymentMethod } = req.body;

        if (!doctorId || !date || !slotTime || !complaint || !paymentMethod) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        const doctor = doctors.find(
            (doctor) => doctor.id === doctorId
        );

        if (!doctor) {
            return res.status(404).json({
                message: "Doctor not found",
            });
        }

        const availabilityDay =
            doctor.availability.find((day) => day.date === date);

        if (!availabilityDay) {
            return res.status(400).json({
                message:
                    "Invalid booking date",
            });
        }

        const slot = availabilityDay.slots.find(
                (slot) => slot.time === slotTime
            );

        if (!slot) {
            return res.status(400).json({
                message: "Slot not found",
            });
        }

        if (!slot.available) {
            return res.status(409).json({
                message: "Slot already booked",
            });
        }

        slot.available = false;
        saveDoctors();

        const booking = {
            id: Date.now(),
            bookingRef: generateBookingRef(),

            userId: req.user.id,
            doctorId,
            doctorName: doctor.name,

            speciality: doctor.speciality,

            date,
            slotTime,
            complaint,

            paymentMethod,
            amountPaid: Number((doctor.consultationFee * 1.10).toFixed(2)),

            status: "Confirmed",
            createdAt: new Date().toISOString(),
        };

        bookings.push(booking);
        saveBookings();

        res.status(201).json({
            success: true,
            message: "Booking successful",
            bookingRef: booking.bookingRef,
            amountPaid: booking.amountPaid,
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
};

const getMyBookings = (req, res) => {

    try {

        const userBookings = bookings.filter((booking) => booking.userId === req.user.id);

        userBookings.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        res.json({
            success: true,
            bookings: userBookings,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const cancelBooking = (req, res) => {
    try {
        const bookingId =  Number(req.params.id);
        const booking = bookings.find((booking) => booking.id === bookingId);

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found",
            });
        }

        if (booking.userId !== req.user.id) {
            return res.status(403).json({
                message: "Unauthorized",
            });
        }

        if (booking.status === "Cancelled") {
            return res.status(400).json({
                message: "Booking already cancelled",
            });
        }

        booking.status = "Cancelled";

        const doctor = doctors.find(
            (doctor) => doctor.id === booking.doctorId
        );

        if (doctor) {
            const availabilityDay =
                doctor.availability.find(
                    (day) => day.date === booking.date
                );

            if (availabilityDay) {
                const slot =
                    availabilityDay.slots.find(
                        (slot) => slot.time === booking.slotTime
                    );

                if (slot) {
                    slot.available = true;
                }
            }
        }

        saveBookings();
        saveDoctors();
        res.json({
            success: true,
            message: "Booking cancelled",
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    createBooking,
    getMyBookings,
    cancelBooking,
};