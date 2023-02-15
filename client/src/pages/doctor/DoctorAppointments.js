import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import axios from 'axios';
import moment from 'moment';
import { message, Table } from 'antd';

const DoctorAppointments = () => {
    const [appointments, setAppointments] = useState([]);

    const getAppointments = async () => {
        try {
            const res = await axios.get('/api/v1/doctor/doctor-appointments', {
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

    const handleStatus = async (record, status) => {
        try {
            const res = await axios.post('/api/v1/doctor/appointment-status',
                { appointmentsId: record._id, status },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                }
            );
            if (res.data.success) {
                message.success(res.data.message);
                getAppointments();
            }

        } catch (error) {
            message.error("Something went wrong!");
        }
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "_id",
        },
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
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) => (
                <div className="d-flex">
                    {record.status === 'pending' && (
                        <div className="d-flex">
                            <button className='btn btn-success' onClick={() => handleStatus(record, 'Approved')}>Approve</button>
                            <button className='btn btn-danger ms-2' onClick={() => handleStatus(record, 'Rejected')}>Reject</button>
                        </div>
                    )}
                </div>
            )
        }
    ];

    return (
        <Layout>
            <h2 className='text-center'>Your Appointment List</h2>
            <Table className='appointments' columns={columns} dataSource={appointments} />
        </Layout>
    )
}

export default DoctorAppointments;