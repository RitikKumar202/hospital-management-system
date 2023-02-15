const express = require('express');
const { getAllUsersController, getAllDoctorsController, changeAccountStatusController } = require('../controllers/adminCtrl');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

//GET method || Users
router.get('/getAllUsers', authMiddleware, getAllUsersController);

//GET method || Doctors
router.get('/getAllDoctors', authMiddleware, getAllDoctorsController);

//POST Account Status
router.post('/changeAccountStatus', authMiddleware, changeAccountStatusController);

module.exports = router;