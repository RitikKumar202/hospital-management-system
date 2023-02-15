import React from 'react';
import Layout from '../components/Layout';
import { Col, Form, Input, Row, TimePicker, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import axios from 'axios';
import moment from 'moment';

const ApplyDoctor = () => {
    const { user } = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //handle form
    const handleFinish = async (values) => {
        try {
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/apply-doctor', {
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

    return (
        <Layout>
            <h2 className='text-center apply-doc-head'>Apply for Doctor</h2>
            <Form layout='vertical' onFinish={handleFinish} className='m-4 apply-doc-form' >
                <h5>Fill Personal Details :</h5>
                <Row>
                    <Col xs={24} md={24}>
                        <Form.Item label="First Name" name="firstName" required rules={[{ required: true }]} className='apply-doc-input' >
                            <Input type='text' placeholder='Your First Name' />
                        </Form.Item>
                        <Form.Item label="Last Name" name="lastName" required rules={[{ required: true }]} className='apply-doc-input'>
                            <Input type='text' placeholder='Your Last Name' />
                        </Form.Item>
                        <Form.Item label="Phone Number" name="phone" required rules={[{ required: true }]} className='apply-doc-input' >
                            <Input type='text' placeholder='Your Contact Number' />
                        </Form.Item>
                        <Form.Item label="Email" name="email" required rules={[{ required: true }]} className='apply-doc-input'>
                            <Input type='email' placeholder='Your Email Address' />
                        </Form.Item>
                        <Form.Item label="Website" name="website" required rules={[{ required: true }]} className='apply-doc-input' >
                            <Input type='text' placeholder='Your Website' />
                        </Form.Item>
                        <Form.Item label="Address" name="address" required rules={[{ required: true }]} className='apply-doc-input' >
                            <Input type='text' placeholder='Your Clinic Address' />
                        </Form.Item>
                    </Col>
                </Row>
                <h5>Fill Professional Details :</h5>
                <Row>
                    <Col xs={24} md={24}>
                        <Form.Item label="Specialization" name="specialization" required rules={[{ required: true }]} className='apply-doc-input' >
                            <Input type='text' placeholder='Your Specialization' />
                        </Form.Item>
                        <Form.Item label="Experience" name="experience" required rules={[{ required: true }]} className='apply-doc-input'>
                            <Input type='text' placeholder='Your Experience' />
                        </Form.Item>
                        <Form.Item label="Fees" name="feesPerCunsaltation" required rules={[{ required: true }]} className='apply-doc-input' >
                            <Input type='phone' placeholder='Fees Per Cunsaltation' />
                        </Form.Item>
                        <Form.Item label="Timings" name="timings" required className='apply-doc-input' >
                            <TimePicker.RangePicker format="HH:mm" />
                        </Form.Item>
                        <button className='btn btn-primary apply-doc-btn' type='submit'>Submit</button>
                    </Col>

                </Row>
            </Form>
        </Layout>
    )
}

export default ApplyDoctor;