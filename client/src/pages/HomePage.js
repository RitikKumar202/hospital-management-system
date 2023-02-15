import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { Row } from 'antd';
import DoctorList from '../components/DoctorList';

function HomePage() {
  const [doctors, setDoctors] = useState([]);

  //login user data
  const getUserData = async () => {
    try {
      const res = await axios.get('/api/v1/user/getAllDoctors', {
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

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <h2 className='text-center doc-list'>Doctor's List. Book now</h2>
      <Row className='doc-list-container'>
        {doctors && doctors.map(doctor => (
          <DoctorList doctor={doctor} />
        ))}
      </Row>
    </Layout>
  )
}

export default HomePage