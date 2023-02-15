import React from 'react';
import Layout from '../components/Layout';
import { message, Tabs } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const NotificationPage = () => {
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //handle read notification
    const handleMarkAllRead = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.post("/api/v1/user/get-all-notification", {
                userId: user._id,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            });
            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.message);
                window.location.reload();
            }
            else {
                message.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            message.error("Opps! Something went wrong.");
        }
    };

    //handle delete notification
    const handleDeleteAllRead = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.post("/api/v1/user/delete-all-notification",
                { userId: user._id }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.message);
                window.location.reload();
            }
            else {
                message.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            message.error("Opps! Something went wrong.");
        }
    };

    return (
        <Layout>
            <h2 className='text-center notification-pg'>All Notifications</h2>
            <Tabs>
                <Tabs.TabPane tab="Unread" key={0}>
                    <div className='notification-read'>
                        <p onClick={handleMarkAllRead}>Mark All Read</p>
                    </div>
                    {
                        user?.notification.map((notificationMsg) => (
                            <div className="card" onClick={() => navigate(notificationMsg.onClickPath)}>
                                <div className="card-text">
                                    {notificationMsg.message}
                                </div>
                            </div>
                        ))
                    }
                </Tabs.TabPane>

                <Tabs.TabPane tab="Read" key={1}>
                    <div className='notification-read'>
                        <p onClick={handleDeleteAllRead}>Delete All Read</p>
                    </div>
                    {
                        user?.seennotification.map((notificationMsg) => (
                            <div className="card" onClick={() => navigate(notificationMsg.onClickPath)}>
                                <div className="card-text">
                                    {notificationMsg.message}
                                </div>
                            </div>
                        ))
                    }
                </Tabs.TabPane>
            </Tabs>
        </Layout>
    )
}