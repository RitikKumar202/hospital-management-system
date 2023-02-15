import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Layout from './../../components/Layout';
import { useParams, useNavigate } from 'react-router-dom';
import { Col, Form, Input, Row, TimePicker, message } from 'antd';
import { hideLoading, showLoading } from '../../redux/features/alertSlice';
import moment from 'moment';

const Profile = () => {
    const { user } = useSelector((state) => state.user);
    const [doctor, setDoctor] = useState(null);
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //get doctor info
    const getDoctorInfo = async () => {
        try {
            const res = await axios.post('/api/v1/doctor/getDoctorInfo',
                { userId: params.id },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                });
            if (res.data.success) {
                setDoctor(res.data.data);
            }
        } catch (error) {
        }
    };

    //handle update doctor profile
    const handleFinish = async (values) => {
        try {
            dispatch(showLoading());
            const res = await axios.post('/api/v1/doctor/updateProfile', {
                ...values, userId: user._id,
                timings: [
                    moment(values.timings[0]).format("HH:mm"),
                    moment(values.timings[1]).format("HH:mm"),
                ],
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.message);
                navigate('/');
            }
            else {
                message.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            message.error("Opps! Something went wrong.");
        }
    }


    useEffect(() => {
        getDoctorInfo();
        //eslint-disable-next-line
    }, []);

    return (
        <Layout>
            <h2 className='text-center doc-profile'>Manage Profile</h2>
            {doctor && (
                <Form layout='vertical' onFinish={handleFinish} className='m-4 update-doc-profile' initialValues={{
                    ...doctor,
                    timings: [
                        moment(doctor.timings[0], "HH:mm"),
                        moment(doctor.timings[1], "HH:mm"),
                    ],
                }} >
                    <h5>Update Personal Details :</h5>
                    <Row>
                        <Col xs={24} md={24}>
                            <Form.Item label="First Name" name="firstName" required rules={[{ required: true }]} className='update-doc-input' >
                                <Input type='text' placeholder='Your First Name' />
                            </Form.Item>
                            <Form.Item label="Last Name" name="lastName" required rules={[{ required: true }]} className='update-doc-input'>
                                <Input type='text' placeholder='Your Last Name' />
                            </Form.Item>
                            <Form.Item label="Phone Number" name="phone" required rules={[{ required: true }]} className='update-doc-input' >
                                <Input type='text' placeholder='Your Contact Number' />
                            </Form.Item>
                            <Form.Item label="Email" name="email" required rules={[{ required: true }]} className='update-doc-input'>
                                <Input type='email' placeholder='Your Email Address' />
                            </Form.Item>
                            <Form.Item label="Website" name="website" required rules={[{ required: true }]} className='update-doc-input' >
                                <Input type='text' placeholder='Your Website' />
                            </Form.Item>
                            <Form.Item label="Address" name="address" required rules={[{ required: true }]} className='update-doc-input' >
                                <Input type='text' placeholder='Your Clinic Address' />
                            </Form.Item>
                        </Col>
                    </Row>
                    <h5>Fill Professional Details :</h5>
                    <Row>
                        <Col xs={24} md={24}>
                            <Form.Item label="Specialization" name="specialization" required rules={[{ required: true }]} className='update-doc-input' >
                                <Input type='text' placeholder='Your Specialization' />
                            </Form.Item>
                            <Form.Item label="Experience" name="experience" required rules={[{ required: true }]} className='update-doc-input'>
                                <Input type='text' placeholder='Your Experience' />
                            </Form.Item>
                            <Form.Item label="Fees" name="feesPerCunsaltation" required rules={[{ required: true }]} className='update-doc-input' >
                                <Input type='phone' placeholder='Fees Per Cunsaltation' />
                            </Form.Item>
                            <Form.Item label="Timings" name="timings" required className='update-doc-input' >
                                <TimePicker.RangePicker format="HH:mm" />
                            </Form.Item>
                            <button className='btn btn-primary update-doc-btn' type='submit'>Update Profile</button>
                        </Col>

                    </Row>
                </Form>
            )}
        </Layout>
    )
}

export default Profile;