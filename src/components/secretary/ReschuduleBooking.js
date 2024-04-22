import React, { Fragment, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Importing useParams and useNavigate
import { useDispatch, useSelector } from "react-redux";
import { reschedBooking, clearErrors } from "../../actions/appointmentActions";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RescheduleBooking = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams(); // Using useParams to get the id parameter from the URL
    const { loading, error } = useSelector((state) => state.allAppointment);

    const [booking, setBooking] = useState({
        appointmentDate: "",
        timeSlot: "",
    });

    const handleChange = (e) => {
        setBooking({
            ...booking,
            [e.target.name]: e.target.value
        });
    };
    const successMsg = (message = '') => toast.success(message, {
        position: toast.POSITION.BOTTOM_CENTER
    });
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('appointmentDate', booking.appointmentDate);
            formData.append('timeSlot', booking.timeSlot);

            await dispatch(reschedBooking(id, formData));
            navigate("/secretary/appointment/list");
            successMsg('Reschedule Successful!');
        } catch (error) {
            console.error("Error rescheduling booking:", error);
            // Handle error
        }
    };

    return (
        <Fragment>
            <div>Reschedule Booking</div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="appointmentDate">Select Date:</label>
                    <input
                        type="date"
                        id="appointmentDate"
                        name="appointmentDate"
                        value={booking.appointmentDate}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="timeSlot">Select Time Slot:</label>
                    <input
                        type="time"
                        id="timeSlot"
                        name="timeSlot"
                        value={booking.timeSlot}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
        </Fragment>
    );
};

export default RescheduleBooking;
