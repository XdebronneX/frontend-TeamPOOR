import React, { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import Loader from '../layout/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { myAppointments, cancelBooking, clearErrors } from '../../actions/appointmentActions';
import { CiRead } from "react-icons/ci";
import { Container } from '@chakra-ui/react';
import { newReviewMechanic } from '../../actions/mechanicActions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Rating } from "react-simple-star-rating";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Textarea } from '@chakra-ui/react';
import { NEW_MECHANIC_REVIEW_RESET } from '../../constants/mechanicConstants';
import { UPDATE_APPOINTMENT_RESET } from '../../constants/appointmentConstants';

const ListAppointments = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, bookings } = useSelector(state => state.myBookings)
    const { isUpdated } = useSelector((state) => state.adminAppointment);
    const { error: reviewMechError, success } = useSelector(state => state.reviewMechanic);

    useEffect(() => {
        dispatch(myAppointments());

        if (error) {
            notify(error)
            dispatch(clearErrors());
        }
        if (isUpdated) {
            navigate("/appointment/list");
            successMsg("Reschedule");
            dispatch({ type: UPDATE_APPOINTMENT_RESET });
        }
    }, [dispatch, isUpdated, error]);

    const [showReviewModal, setShowReviewModal] = useState(false);
    const [selectedItemForReview, setSelectedItemForReview] = useState(null);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const [showRescheduleModal, setShowRescheduleModal] = useState(false);
    const [selectedItemForReschedule, setSelectedItemForReschedule] = useState(null);
    const [reason, setReason] = useState("");

    useEffect(() => {
        if (success) {
            successMsg("Review posted successfully");
            dispatch({ type: NEW_MECHANIC_REVIEW_RESET });
            setShowReviewModal(false);
            setComment("");
        }
        if (error) {
            notify(error);
            dispatch(clearErrors());
        }
        if (reviewMechError) {
            notify(reviewMechError);
            dispatch(clearErrors());
        }
    }, [dispatch, error, reviewMechError, success]);

    const handleRatingChange = (value) => {
        setRating(value);
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const openReviewModal = (item) => {
        setSelectedItemForReview(item);
        setShowReviewModal(true);
    };

    const closeReviewModal = () => {
        setSelectedItemForReview(null);
        setShowReviewModal(false);
    };

    // Function to open the reschedule modal
    const openRescheduleModal = (item) => {
        setSelectedItemForReschedule(item);
        setShowRescheduleModal(true);
    };

    // Function to handle changes in the reason input for rescheduling
    const handleReasonChange = (event) => {
        setReason(event.target.value);
    };

    const rescheduleHandler = () => {
        // Ensure selectedItemForReschedule is not null
        if (selectedItemForReschedule) {
            // Create a FormData object
            const formData = new FormData();
            // Set the reason for rescheduling
            formData.set("comment", reason); // Assuming your backend expects the reason in a field named "reason"

            // Dispatch an action to reschedule the appointment using selectedItemForReschedule._id and formData
            dispatch(cancelBooking(selectedItemForReschedule._id, formData));

            // Reset state variables and close the modal
            setSelectedItemForReschedule(null);
            setShowRescheduleModal(false);
            setReason("");
        }
    };


    const setListAppointments = () => {
        const data = {
            columns: [
                {
                    label: 'Appointment ID',
                    field: 'id',
                    sort: 'asc',
                },
                {
                    label: 'Appointment date',
                    field: 'appointmentDate',
                    sort: 'asc',
                },
                {
                    label: 'Time',
                    field: 'timeSlot',
                    sort: 'disabled',
                },
                {
                    label: 'Assigned mechanic',
                    field: 'mechanic',
                    sort: 'disabled',
                },
                {
                    label: 'No of service',
                    field: 'numofServices',
                    sort: 'disabled',
                },
                {
                    label: 'Service type',
                    field: 'serviceType',
                    sort: 'disabled',
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'disabled',
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'disabled',
                },
                {
                    label: 'View',
                    field: 'view',
                    sort: 'disabled'
                },
                {
                    label: 'Review mechanic',
                    field: 'review',
                    sort: 'disabled'
                },
                {
                    label: 'Request',
                    field: 'backjob',
                    sort: 'disabled'
                },
            ],
            rows: [],
        };

        // bookings.forEach((booking) => {
        //     const appointmentStatus = booking.appointmentStatus || [];
        //     const sortedStatus = appointmentStatus.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        //     const latestStatus = sortedStatus.length > 0 ? sortedStatus[0].status : 'No status';

        //     let badgeColor = '';
        //     let badgeText = '';

        //     switch (latestStatus) {
        //         case 'PENDING':
        //             badgeColor = 'warning';
        //             badgeText = 'Pending';
        //             break;
        //         case 'CONFIRMED':
        //             badgeColor = 'success';
        //             badgeText = 'Confirmed';
        //             break;
        //         case 'INPROGRESS':
        //             badgeColor = 'primary';
        //             badgeText = 'In Progress';
        //             break;
        //         case 'COMPLETED':
        //             badgeColor = 'success';
        //             badgeText = 'Completed';
        //             break;
        //         case 'DONE':
        //             badgeColor = 'success';
        //             badgeText = 'Done';
        //             break;
        //         case 'CANCELLED':
        //             badgeColor = 'danger';
        //             badgeText = 'Cancelled';
        //             break;
        //         case 'RESCHEDULED':
        //             badgeColor = 'purple';
        //             badgeText = 'Resheduled';
        //             break;
        //         case 'DELAYED':
        //             badgeColor = 'warning';
        //             badgeText = 'Delayed';
        //             break;
        //         case 'NOSHOW':
        //             badgeColor = 'gray';
        //             badgeText = 'No show';
        //             break;
        //         case 'BACKJOBPENDING':
        //             badgeColor = 'warning';
        //             badgeText = 'Back job Pending';
        //             break;
        //         case 'BACKJOBCONFIRMED':
        //             badgeColor = 'primary';
        //             badgeText = 'Back job Confirmed';
        //             break;
        //         case 'BACKJOBCOMPLETED':
        //             badgeColor = 'success';
        //             badgeText = 'Back job Completed';
        //             break;
        //         default:
        //             badgeText = 'No status';
        //     }
        //     const formattedDate = new Date(booking.appointmentDate).toLocaleDateString('en-US', {
        //         year: 'numeric',
        //         month: 'long',
        //         day: '2-digit',
        //     });
        //     const mechanicFullname = booking.mechanic ? `${booking.mechanic.firstname} ${booking.mechanic.lastname}` : 'No mechanic assigned yet';
        //     const reviewButton = latestStatus === 'COMPLETED' ? (
        //         <button onClick={() => openReviewModal(booking)} className="btn btn-success py-1 px-2">
        //             Review
        //         </button>
        //     ) : null;

        //     const rescheduleButton = latestStatus === 'COMPLETED' ? (
        //         <button onClick={() => openRescheduleModal(booking)} className="btn btn-success py-1 px-2">
        //             Reschedule
        //         </button>
        //     ) : null;

        //     data.rows.push({
        //         id: booking._id,
        //         numofServices: booking.appointmentServices.length,
        //         appointmentDate: formattedDate,
        //         timeSlot: booking.timeSlot,
        //         mechanic: mechanicFullname,
        //         amount: `$${booking.totalPrice}`,
        //         serviceType: booking.serviceType,
        //         status: (
        //             <span className={`badge badge-${badgeColor}`}>
        //                 {badgeText}
        //             </span>
        //         ),
        //         view: (
        //             <Link to={`/appointment/${booking._id}`} className="btn btn-primary py-1 px-2">
        //                 <CiRead />
        //             </Link>
        //         ),
        //         review: reviewButton,
        //         backjob: rescheduleButton,
        //     });
        // });

        if (bookings && Array.isArray(bookings)) {
            bookings.forEach((booking) => {
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
                    case 'COMPLETED':
                        badgeColor = 'success';
                        badgeText = 'Completed';
                        break;
                    case 'DONE':
                        badgeColor = 'success';
                        badgeText = 'Done';
                        break;
                    case 'CANCELLED':
                        badgeColor = 'danger';
                        badgeText = 'Cancelled';
                        break;
                    case 'RESCHEDULED':
                        badgeColor = 'purple';
                        badgeText = 'Resheduled';
                        break;
                    case 'DELAYED':
                        badgeColor = 'warning';
                        badgeText = 'Delayed';
                        break;
                    case 'NOSHOW':
                        badgeColor = 'gray';
                        badgeText = 'No show';
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
                    default:
                        badgeText = 'No status';
                }
                const formattedDate = new Date(booking.appointmentDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: '2-digit',
                });
                const mechanicFullname = booking.mechanic ? `${booking.mechanic.firstname} ${booking.mechanic.lastname}` : 'No mechanic assigned yet';
                const reviewButton = latestStatus === 'COMPLETED' ? (
                    <button onClick={() => openReviewModal(booking)} className="btn btn-success py-1 px-2">
                        Review
                    </button>
                ) : null;

                const rescheduleButton = latestStatus === 'COMPLETED' ? (
                    <button onClick={() => openRescheduleModal(booking)} className="btn btn-success py-1 px-2">
                        Reschedule
                    </button>
                ) : null;

                data.rows.push({
                    id: booking._id,
                    numofServices: booking.appointmentServices.length,
                    appointmentDate: formattedDate,
                    timeSlot: booking.timeSlot,
                    mechanic: mechanicFullname,
                    amount: `$${booking.totalPrice}`,
                    serviceType: booking.serviceType,
                    status: (
                        <span className={`badge badge-${badgeColor}`}>
                            {badgeText}
                        </span>
                    ),
                    view: (
                        <Link to={`/appointment/${booking._id}`} className="btn btn-primary py-1 px-2">
                            <CiRead />
                        </Link>
                    ),
                    review: reviewButton,
                    backjob: rescheduleButton,
                });
            });
        }


        return data;
    };

    const reviewHandler = () => {
        const formData = new FormData();
        formData.set("comment", comment);
        formData.set("rating", rating);
        dispatch(newReviewMechanic(selectedItemForReview._id, formData)); // Pass the appointment ID
    };

    const notify = (error) => {
        toast.error(error, {
            position: toast.POSITION.BOTTOM_CENTER,
        });
    };

    const successMsg = (message) => {
        toast.success(message, {
            position: toast.POSITION.BOTTOM_CENTER,
        });
    };

    // console.log(selectedItemForReview);

    return (
        <Container maxW="container.xl">
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MDBDataTable
                        striped
                        bordered
                        noBottomColumns
                        data={setListAppointments()}
                    />
                    <Modal isOpen={showReviewModal} size="xl" onClose={closeReviewModal}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Review Mechanic</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                {selectedItemForReview && (
                                    <div className="space-y-4">
                                        <div className="flex flex-col justify-center items-center space-y-3">
                                            <p className="font-bold">{selectedItemForReview.mechanic.firstname} {selectedItemForReview.mechanic.lastname}</p>
                                            <img src={selectedItemForReview.mechanic.avatar.url}
                                                alt={`${selectedItemForReview.mechanic.firstname} ${selectedItemForReview.mechanic.lastname}`}
                                                height="250" width="250"
                                                className="rounded-xl" />
                                        </div>
                                        <div className="space-y-5">
                                            <div className="flex flex-row justify-center items-center">
                                                <Rating
                                                    onClick={(value) => handleRatingChange(value)}
                                                    ratingValue={rating} // Pass rating value
                                                    size={30} // Adjust the size if needed
                                                    fillColor="orange" // Adjust the color of filled stars
                                                    emptyColor="gray" // Adjust the color of empty stars
                                                    strokeColor="black" // Adjust the color of star borders
                                                    strokeWidth={0} // Adjust the width of star borders
                                                    starCount={5} // Adjust the total number of stars
                                                    showTooltip
                                                    tooltipArray={[
                                                        "Terrible",
                                                        "Bad",
                                                        "Average",
                                                        "Great",
                                                        "Perfect",
                                                    ]}
                                                    SVGstyle={{ display: "inline" }}
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <p>Comment</p>
                                                <Textarea
                                                    placeholder="Insert comment here..."
                                                    value={comment} // Bind value to comment state
                                                    onChange={handleCommentChange} // Call handleCommentChange on change
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </ModalBody>

                            <ModalFooter>
                                <Button colorScheme="green" mr={3} onClick={reviewHandler}>
                                    Post
                                </Button>
                                <Button variant="ghost" onClick={closeReviewModal}>
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                    {/* Reschedule Modal */}
                    <Modal isOpen={showRescheduleModal} size="xl" onClose={() => setShowRescheduleModal(false)}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Reschedule Appointment</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                {selectedItemForReschedule && (
                                    <div className="space-y-4">
                                        {/* Display appointment details */}
                                        <p>{selectedItemForReschedule.appointmentDate}</p>
                                        {/* Add more appointment details as needed */}

                                        {/* Input for reschedule reason */}
                                        <Textarea
                                            placeholder="Reason for rescheduling..."
                                            value={reason}
                                            onChange={handleReasonChange}
                                        />
                                    </div>
                                )}
                            </ModalBody>
                            <ModalFooter>
                                <Button colorScheme="green" mr={3} onClick={rescheduleHandler}>
                                    Backjob
                                </Button>
                                <Button variant="ghost" onClick={() => setShowRescheduleModal(false)}>
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Fragment>
            )}
        </Container>
    )
}

export default ListAppointments;
