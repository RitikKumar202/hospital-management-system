import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, message } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';

function Login() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //form handler
  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post('/api/v1/user/login', values);
      // window.location.reload();
      dispatch(hideLoading());
      if (res.data.success) {
        window.location.reload();
        message.success("Successfully Loggedin.");
        localStorage.setItem("token", res.data.token);
        navigate("/");
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
          <h3 className='text-center'>Login</h3>
          <Form.Item label="Email :" name="email">
            <Input type='email' placeholder='Enter email address' required />
          </Form.Item>
          <Form.Item label="Password :" name="password">
            <Input type='password' placeholder='Enter password' required />
          </Form.Item>
          <button type='submit' className='btn btn-primary'>Login</button>
          <Link to="/register" className='redirect-register'>Not a user? Register here</Link>
        </Form>
      </div>
    </>
  )
}

export default Login;