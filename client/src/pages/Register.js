import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, message } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';

function Register() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    //form handler
    const onFinishHandler = async (values) => {
        try {
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/register', values);
            dispatch(hideLoading());
            if (res.data.success) {
                message.success('Successfully Registered.');
                navigate("/login");
            }
            else {
                message.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            message.error("Oops! Something went wrong.")
        }
    };

    return (
        <>
            <div className="form-container">
                <Form layout='vertical' onFinish={onFinishHandler} className="register-form">
                    <h3 className='text-center'>Create Account</h3>
                    <Form.Item label="Name :" name="name">
                        <Input type='text' placeholder='Enter your name' required />
                    </Form.Item>
                    <Form.Item label="Email :" name="email">
                        <Input type='email' placeholder='Enter email address' required />
                    </Form.Item>
                    <Form.Item label="Password :" name="password">
                        <Input type='password' placeholder='Create password' required />
                    </Form.Item>
                    <button type='submit' className='btn btn-primary'>Register</button>
                    <Link to="/login" className='redirect-login'>Already user? Login here</Link>
                </Form>
            </div>
        </>
    )
}

export default Register;