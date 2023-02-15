const appointmentModel = require('../models/appointmentModel');
const doctorModel = require('../models/doctorModel');
const userModel = require('../models/userModels');

const getDoctorInfoController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOne({ userId: req.body.userId });
        res.status(200).send({
            success: true,
            message: "Doctor data fetch success.",
            data: doctor,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: "Error in Fetching Doctor Details.",
        });
    }
};

// Update Doctor Profile
const updateProfileController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOneAndUpdate({ userId: req.body.userId }, req.body);
        res.status(201).send({
            success: true,
            message: "Doctor Profile Updated.",
            data: doctor,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in Doctor Profile Update.",
            error,
        });
    }
};

//get single doctor
const getDoctorByIdController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOne({ _id: req.body.doctorId });
        res.status(200).send({
            success: true,
            message: "Fetched Single Doctor Info.",
            data: doctor,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in Single Doctor Info.",
            error,
        });
    }
};

//Get appointments
const doctorAppointmentsController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOne({ userId: req.body.userId });
        const appointments = await appointmentModel.find({ doctorId: doctor._id });
        res.status(200).send({
            success: true,
            message: "Doctor appointments fetched successfully.",
            data: appointments,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in fetching doctor appointments.",
            error,
        });
    }
};

//appointment status
const appointmentStatusController = async (req, res) => {
    try {
        const { appointmentsId, status } = req.body;
        const appointments = await appointmentModel.findByIdAndUpdate(appointmentsId, { status });
        const user = await userModel.findOne({ _id: appointments.userId });
        const notification = user.notification;
        notification.push({
            type: "status-updated",
            message: `Your appointment status has been ${status}`,
            onClickPath: "/doctor-appointments",
        });
        await user.save();
        res.status(200).send({
            success: true,
            message: "Appointment Status Updated.",
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in appointment update status.",
            error,
        });
    }
};

module.exports = {
    getDoctorInfoController,
    updateProfileController,
    getDoctorByIdController,
    doctorAppointmentsController,
    appointmentStatusController,
};