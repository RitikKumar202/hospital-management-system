const express = require("express");
const {
    getDoctorInfoController,
    updateProfileController,
    getDoctorByIdController,
    doctorAppointmentsController,
    appointmentStatusController,
} = require("../controllers/doctorCtrl");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

//POST SINGLE DOCTOR INFO
router.post("/getDoctorInfo", authMiddleware, getDoctorInfoController);

//POST UPdate Doctor Profile
router.post("/updateProfile", authMiddleware, updateProfileController);

//POST get single Doctor info
router.post("/getDoctorById", authMiddleware, getDoctorByIdController);

//GET appointments
router.get("/doctor-appointments", authMiddleware, doctorAppointmentsController);

//appointment status
router.post('/appointment-status', authMiddleware, appointmentStatusController);

module.exports = router;