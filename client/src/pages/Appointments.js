import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import moment from 'moment';
import { Table } from 'antd';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);

    const getAppointments = async () => {
        try {
            const res = await axios.get('/api/v1/user/user-appointments', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            });
            if (res.data.success) {
                setAppointments(res.data.data);
            }
        } catch (error) {
        }
    }

    useEffect(() => {
        getAppointments();
    }, []);

    const columns = [
        {
            title: "ID",
            dataIndex: "_id",
        },
        // {
        //     title: "Name",
        //     dataIndex: "name",
        //     render: (text, record) => (
        //         <span>
        //             {record.doctorId.firstName} {record.doctorId.lasttName}
        //         </span>
        //     )
        // },
        // {
        //     title: "Phone",
        //     dataIndex: "phone",
        //     render: (text, record) => (
        //         <span>
        //             {record.doctorId.phone}
        //         </span>
        //     )
        // },
        {
            title: "Date",
            dataIndex: "date",
            render: (text, record) => (
                <span>
                    {moment(record.date).format("DD-MM-YYYY")}
                </span>
            )
        },
        {
            title: "Time",
            dataIndex: "time",
            render: (text, record) => (
                <span>
                    {moment(record.time).format("HH:mm")}
                </span>
            )
        },
        {
            title: "Status",
            dataIndex: "status",
        },
    ];

    return (
        <Layout>
            <h2 className='text-center'>Your Appointment List</h2>
            <Table className='appointments' columns={columns} dataSource={appointments} />
        </Layout>
    );
}

export default Appointments;