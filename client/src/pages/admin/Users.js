import { Table } from 'antd';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';

const Users = () => {
  const [users, setUsers] = useState([]);

  //getUsers
  const getUsers = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllUsers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  //antd table col
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Doctor',
      dataIndex: 'isDoctor',
      render: (text, record) => <span>{record.isDoctor ? 'Yes' : 'No'}</span>,
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <div className="d-flex">
          <button className="btn btn-danger">Block</button>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h2 className='text-center users-list'>Users List</h2>
      <Table columns={columns} dataSource={users} />
    </Layout>
  )
}

export default Users;