import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { DatePicker, message, TimePicker } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../redux/features/alertSlice';

const BookingPage = () => {
    const { user } = useSelector(state => state.user);
    const [doctors, setDoctors] = useState([]);
    const params = useParams();
    const [date, setDate] = useState();
    const [isAvailable, setIsAvailable] = useState();
    const [time, setTime] = useState();
    const dispatch = useDispatch();

    const getUserData = async () => {
        try {
            const res = await axios.post('/api/v1/doctor/getDoctorById', { doctorId: params.doctorId }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });
            if (res.data.success) {
                setDoctors(res.data.data);
            }
        } catch (error) {
        }
    };

    //handle availability
    const handleAvailability = async () => {
        try {
            if (!date || !time) {
                return alert("Date and Time are required.");
            }
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/booking-availability',
                { doctorId: params.doctorId, date, time },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                }
            );
            dispatch(hideLoading());
            if (res.data.success) {
                setIsAvailable(true);
                message.success(res.data.message);
            }
            else {
                message.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
        }
    }

    //handle booking
    const handleBooking = async () => {
        try {
            setIsAvailable(true);
            if (!date || !time) {
                return alert("Date and Time are required.");
            }
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/book-appointment', {
                doctorId: params.doctorId,
                userId: user._id,
                doctorInfo: doctors,
                userInfo: user,
                date: date,
                time: time,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
        }
    }

    useEffect(() => {
        getUserData();
        //eslint-disable-next-line
    }, []);


    return (
        <Layout>
            <h2 className='text-center'>Book Appointment</h2>
            <div className="booking-container">
                {doctors && (
                    <div className='booking-body'>
                        <h4>
                            Dr. {doctors.firstName} {doctors.lastName}
                        </h4>
                        <h4>
                            Fees: {doctors.feesPerCunsaltation}
                        </h4>
                        <h4>
                            Timing: {doctors.timings && doctors.timings[0]} - {doctors.timings && doctors.timings[1]}
                        </h4>
                        <div className="d-flex flex-column ">
                            <DatePicker format="DD-MM-YYYY" className='m-2'
                                onChange={(value) => {
                                    setDate(moment(value).format('DD-MM-YYYY'))
                                }}
                            />
                            <TimePicker format="HH:mm" className='m-2'
                                onChange={(value) => {
                                    setTime(moment(value).format('HH:mm'))
                                }}
                            />
                            <button className="btn btn-primary m-2" onClick={handleAvailability}>Check Availability</button>
                            <button className="btn btn-dark m-2" onClick={handleBooking}>Book Now</button>

                        </div>
                    </div>
                )}
            </div>
        </Layout>
    )
}

export default BookingPage;