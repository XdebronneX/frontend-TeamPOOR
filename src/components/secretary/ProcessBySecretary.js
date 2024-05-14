import React, { Fragment, useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Loader from '../layout/Loader'
import { toast } from 'react-toastify';
import { Button } from '@chakra-ui/react';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux'
import { getAppointDetails, updateBysecretary, clearErrors } from '../../actions/appointmentActions';
import { UPDATE_APPOINTMENT_RESET } from '../../constants/appointmentConstants';

const ProcessBySecretary = () => {

    const [status, setStatus] = useState('');
    const [mechanic, setMechanic] = useState('');
    const dispatch = useDispatch();
    let { id } = useParams();
    let navigate = useNavigate();
    const { loading, booking = {} } = useSelector((state) => state.appointmentDetails);
    const { error, isUpdated } = useSelector((state) => state.adminAppointment);
    const { customerInfo, bookingInfo, appointmentServices, user, totalPrice } = booking;
    const orderId = id;

    const errMsg = (message = '') => toast.error(message, {
        position: toast.POSITION.BOTTOM_CENTER
    });

    const successMsg = (message = '') => toast.success(message, {
        position: toast.POSITION.BOTTOM_CENTER
    });

    const appointmentStatus = booking.appointmentStatus || [];
    const sortedStatus = appointmentStatus.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    const latestStatus = sortedStatus.length > 0 ? sortedStatus[0].status : 'No status';

    let badgeColor = '';
    let badgeText = '';

    switch (latestStatus) {
        case 'PENDING':
            badgeColor = 'warning';
            badgeText = 'Pending';
            break;
        case 'CONFIRMED':
            badgeColor = 'success';
            badgeText = 'Confirmed';
            break;
        case 'INPROGRESS':
            badgeColor = 'primary';
            badgeText = 'In Progress';
            break;
        case 'DONE':
            badgeColor = 'success';
            badgeText = 'Done';
            break;
        case 'COMPLETED':
            badgeColor = 'success';
            badgeText = 'Completed';
            break;
        case 'CANCELLED':
            badgeColor = 'danger';
            badgeText = 'Cancelled';
            break;
        case 'RESCHEDULED':
            badgeColor = 'primary';
            badgeText = 'Resheduled';
            break;
        case 'DELAYED':
            badgeColor = 'warning';
            badgeText = 'Delayed';
            break;
        case 'BACKJOBPENDING':
            badgeColor = 'warning';
            badgeText = 'Back job Pending';
            break;
        case 'BACKJOBCONFIRMED':
            badgeColor = 'primary';
            badgeText = 'Back job Confirmed';
            break;
        case 'BACKJOBCOMPLETED':
            badgeColor = 'success';
            badgeText = 'Back job Completed';
            break;
        case 'NOSHOW':
            badgeColor = 'gray';
            badgeText = 'No show';
            break;
        default:
            badgeText = 'No status';
    }

    useEffect(() => {
        dispatch(getAppointDetails(orderId));

        if (error) {
            errMsg(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            navigate('/secretary/appointment/list');
            successMsg('Status Updated');
            dispatch({ type: UPDATE_APPOINTMENT_RESET });
        }

    }, [dispatch, error, isUpdated, orderId, navigate]);

    const updateBookingHandler = (id) => {
        const formData = new FormData();
        formData.set('appointmentStatus', status);

        dispatch(updateBysecretary(id, formData));
    };

    // console.log(booking)

    return (
        <Fragment>
            <div className="row">
                <div className="col-12 col-md-10">
                    <Fragment>
                        {loading ? <Loader /> : (
                            <div className="row d-flex justify-content-around">
                                <div className="col-12 col-lg-7 order-details">
                                    <h2 className="my-5">Appointment # {booking._id}</h2>
                                    <h4 className="mb-4">Delivery Address</h4>
                                    <p><b>Name:</b> {booking && booking.fullname}</p>
                                    <p><b>Phone:</b> {booking && booking.phone}</p>
                                    <p className="mb-4"><b>Address:</b>{booking.region}, {booking.province}, {booking.city}, {booking.barangay}, {booking.address}, {booking.postalcode}</p>
                                    <hr />
                                    <h4 className="mb-4">Motorcycle Details</h4>
                                    <p><b>Bran name:</b> {booking && booking.brand}</p>
                                    <p><b>Year model:</b> {booking && booking.year}</p>
                                    <p><b>Plate number:</b> {booking && booking.plateNumber}</p>
                                    <p><b>Engine number:</b> {booking && booking.engineNumber}</p>
                                    <p><b>Type of fuel:</b> {booking && booking.fuel}</p>
                                    <p><b>Vehicle category:</b> {booking && booking.type}</p>
                                    <hr />
                                    <h4 className="my-4">Order Status:</h4>
                                    <p>
                                        <span className={`badge badge-${badgeColor}`}>
                                            {badgeText}
                                        </span>
                                    </p>
                                    <h4 className="my-4">Order Items:</h4>
                                    <div className="space-y-3">
                                        {booking &&
                                            booking.appointmentServices &&
                                            booking.appointmentServices.map((item) => (
                                                <>
                                                    <div className="flex flex-row justify-between items-start">
                                                        <div>
                                                            {item.service && item.service.images && (
                                                                <img
                                                                    src={item.service.images[0].url}
                                                                    alt={item.service.name}
                                                                    height="45"
                                                                    width="65"
                                                                />
                                                            )}
                                                        </div>
                                                        <div>
                                                            {item.service && (
                                                                <Link to={`/showSingleService/${item.service._id}`}>
                                                                    {item.service.name}
                                                                </Link>
                                                            )}
                                                        </div>
                                                        <div>
                                                            {item.service && item.service.price && (
                                                                <p>${item.service.price}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </>
                                            ))}
                                        <div className="border-b border-zinc-200 mt-4" />
                                        <div className="flex flex-row-reverse">
                                            <p className="">
                                                Grand Total: <b>₱{totalPrice?.toFixed(2)}</b>
                                            </p>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                                {latestStatus === 'COMPLETED' ? (
                                    <button className="btn btn-primary btn-block" onClick={() => updateBookingHandler(booking._id)} hidden>
                                        Update status
                                    </button>
                                ) : <Fragment>
                                    <div className="col-12 col-lg-3 mt-5">
                                        <h4 className="my-4">Status</h4>
                                        <div className="form-group">
                                            <select
                                                className="form-control"
                                                name='status'
                                                value={status}
                                                onChange={(e) => setStatus(e.target.value)}
                                            >
                                                <option>Please Select Status</option>
                                                <option value="PENDING">Pending</option>
                                                <option value="CONFIRMED">Accept</option>
                                                <option value="INPROGRESS">Working in progress</option>
                                                <option value="COMPLETED">Completed</option>
                                                <option value="CANCELLED">Cancel</option>
                                                <option value="RESCHEDULED">Rescheduled</option>
                                                <option value="DELAYED">Delayed</option>
                                                <option value="BACKJOBCONFIRMED">Backjob confirm</option>
                                                <option value="BACKJOBCOMPLETED">Backjob completed</option>
                                                <option value="NOSHOW">No show</option>
                                            </select>
                                        </div>
                                        <button className="btn btn-primary btn-block" onClick={() => updateBookingHandler(booking._id)}>
                                            Update status
                                        </button>
                                            <div className="col-12 col-lg-3 mt-5">
                                                {(latestStatus === "BACKJOBCONFIRMED" || latestStatus === "RESCHEDULED") && (
                                                    <Link to={`/backjob/reschedule/appointment/${booking._id}`}>
                                                        <Button colorScheme="blue" size="sm" ml="3">
                                                            Choose Schedule
                                                        </Button>
                                                    </Link>
                                                )}
                                            </div>
                                    </div>
                                </Fragment>
                                }
                            </div>
                        )}
                    </Fragment>
                </div>
            </div>
        </Fragment>
    );
}

export default ProcessBySecretary;