const express = require('express');
const {
    loginController,
    registerController,
    authController,
    applyDoctorController,
    getAllNotificationController,
    deleteAllNotificationController,
    getAllDoctorsController,
    bookAppointmentController,
    bookingAvailabilityController,
    userAppointmentsController,
} = require('../controllers/userCtrl');
const authMiddleware = require('../middlewares/authMiddleware');

//router object
const router = express.Router();

//routes
//LOGIN || POST
router.post('/login', loginController);

//REGISTER || POST
router.post('/register', registerController);

// Auth || POST
router.post('/getUserData', authMiddleware, authController);

// Apply Doctor || POST
router.post('/apply-doctor', authMiddleware, applyDoctorController);

// Notification Read || POST
router.post('/get-all-notification', authMiddleware, getAllNotificationController);

// Notification Delete || POST
router.post('/delete-all-notification', authMiddleware, deleteAllNotificationController);

//get all doctors on homepage
router.get('/getAllDoctors', authMiddleware, getAllDoctorsController);

// Book Appointment
router.post('/book-appointment', authMiddleware, bookAppointmentController);

// Check booking Availability
router.post('/booking-availability', authMiddleware, bookingAvailabilityController);

//User Appointments List
router.get('/user-appointments', authMiddleware, userAppointmentsController);

module.exports = router;