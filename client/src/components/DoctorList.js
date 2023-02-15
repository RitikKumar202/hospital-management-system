import React from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorList = ({ doctor }) => {
    const navigate = useNavigate();

    return (
        <>
            <div className="card-container">
                <div className="card"
                    onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}
                >
                    <div className="card-header">
                        Dr. {doctor.firstName} {doctor.lastName}
                    </div>
                    <div className="card-body">
                        <p><span>Specialization:</span> {doctor.specialization}</p>
                        <p><span>Experience:</span> {doctor.experience}</p>
                        <p><span>Fees:</span> {doctor.feesPerCunsaltation}</p>
                        <p><span>Timings:</span> {doctor.timings[0]} - {doctor.timings[1]}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DoctorList;