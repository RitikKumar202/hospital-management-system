import React, { useRef } from 'react';
import { adminMenu, userMenu } from '../data/navBar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Badge, message } from 'antd';

function Layout({ children }) {
    const { user } = useSelector(state => state.user);
    const location = useLocation();
    const navigate = useNavigate();

    //Responsive navbar
    const navRef = useRef();
    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    }


    //Logout function
    const handleLogout = () => {
        localStorage.clear();
        message.success('Logged Out Successfully.');
        navigate('/login');
    }

    //Doctor menu
    const doctorMenu = [
        {
            name: 'Home',
            path: '/',
            icon: 'fa-solid fa-house',
        },
        {
            name: 'Appointments',
            path: '/doctor-appointments',
            icon: 'fa-solid fa-list',
        },
        {
            name: 'Profile',
            path: `/doctor/profile/${user?._id}`,
            icon: 'fa-solid fa-user',
        },
    ];

    // Rendering menu list
    const NavbarMenu = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu;

    return (
        <>
            <div className="main">
                <div className="layout">

                    <div className="content">
                        <div className="header">
                            <Link className="logo" to='/'><i class="fa-solid fa-hospital"></i></Link>
                            <div></div>

                            <div className="menu" ref={navRef}>
                                {NavbarMenu.map(menu => {
                                    const isActive = location.pathname === menu.path;

                                    return (
                                        <>
                                            <div className={`menu-item ${isActive && 'active'}`}>
                                                <i className={menu.icon}></i>
                                                <Link to={menu.path}>{menu.name}</Link>
                                            </div>
                                        </>
                                    )
                                })}
                                <div className={`menu-item`} onClick={handleLogout} >
                                    <i className="fa-solid fa-right-from-bracket"></i>
                                    <Link to='/login'>Logout</Link>
                                </div>
                                {/* responsive navbar  */}
                                <i class="fa-solid fa-times nav-btn nav-close-btn" onClick={showNavbar}></i>
                                {/* responsive navbar  */}

                            </div>

                            {/* responsive navbar  */}
                            <i class="fa-solid fa-bars nav-btn nav-btn-bars" onClick={showNavbar}></i>
                            {/* responsive navbar  */}

                            <div className="notification">
                                <Badge count={user && user.notification.length} onClick={() => { navigate('/notification') }}>
                                    <i class="fa-sharp fa-solid fa-bell"></i>
                                </Badge>
                            </div>
                            {/* <Link to="/profile">{user?.name}</Link> */}
                        </div>
                        <div className="body">{children}</div>
                    </div>
                </div>
                <footer>made by <i class="fa-solid fa-heart"></i> <span>Ritik Kumar</span></footer>
            </div>
        </>
    )
}

export default Layout