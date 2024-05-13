import React, { Fragment, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import Loader from '../layout/Loader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { CiRead } from 'react-icons/ci';
import { FaTrashAlt } from 'react-icons/fa';
import { Box, Flex, Stack, Heading, Button } from '@chakra-ui/react';
import { allSecAppointments, clearErrors } from '../../actions/appointmentActions';
import { MdOutlineAssignmentInd } from 'react-icons/md';
import { VscDiffAdded } from "react-icons/vsc";

const SecretaryAppointmentList = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const { loading, error, allbookings } = useSelector((state) => state.allAppointment);
    const { isDeleted } = useSelector((state) => state.adminAppointment);

    const errMsg = (message = '') => toast.error(message, {
        position: toast.POSITION.BOTTOM_CENTER
    });
    const successMsg = (message = '') => toast.success(message, {
        position: toast.POSITION.BOTTOM_CENTER
    });

    useEffect(() => {
        dispatch(allSecAppointments());
        if (error) {
            errMsg(error);
            dispatch(clearErrors());
        }

    }, [dispatch, error, navigate]);


    const setAppointments = () => {
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
                    sort: 'desc',
                },
                {
                    label: 'Time Schedule',
                    field: 'timeSlot',
                    sort: 'disabled',
                },
                {
                    label: 'Mechanic',
                    field: 'mechanic',
                    sort: 'disabled',
                },
                {
                    label: 'No of service',
                    field: 'numofServices',
                    sort: 'disabled',
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'disabled',
                },
                {
                    label: 'Service Type',
                    field: 'serviceType',
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
                    label: 'Additional',
                    field: 'parts',
                    sort: 'disabled'
                },
                {
                    label: 'Assign Task',
                    field: 'assign',
                    sort: 'disabled'
                },
            ],
            rows: [],
        };

        allbookings.forEach((booking) => {
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
                    badgeText = 'Rescheduled';
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

            const formattedApppoinmentDate = new Date(booking.appointmentDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: '2-digit',
            });

            // Populate the mechanic field to get the details
            const mechanicFullname = booking.mechanic ? `${booking.mechanic.firstname} ${booking.mechanic.lastname}` : 'No mechanic assigned yet';
            data.rows.push({
                id: booking._id,
                numofServices: booking.appointmentServices.length,
                amount: `₱ ${booking.totalPrice.toLocaleString()}`,
                appointmentDate: formattedApppoinmentDate,
                timeSlot: booking.timeSlot,
                mechanic: mechanicFullname,
                serviceType: booking.serviceType,
                status: (
                    <span className={`badge badge-${badgeColor}`}>
                        {badgeText}
                    </span>
                ),
                view: (
                    <Link to={`/secretary/appointment/${booking._id}`}>
                        <Button colorScheme="blue" size="sm" ml="3" leftIcon={<CiRead />}>
                            View
                        </Button>
                    </Link>
                ),
                parts: (
                    latestStatus === 'DONE' && (
                        <Link to={`/secretary/additional/${booking._id}`}>
                            <Button colorScheme="yellow" size="sm" ml="3" leftIcon={<VscDiffAdded />}>
                                Additional
                            </Button>
                        </Link>
                    )
                ),
                assign: (
                    latestStatus === 'CONFIRMED' && (
                        <Link to={`/secretary/assign/mechanic/${booking._id}`}>
                            <Button colorScheme="green" size="sm" ml="3" leftIcon={<MdOutlineAssignmentInd />}>
                                Assign mechanic
                            </Button>
                        </Link>
                    )
                ),
            });
        });

        return data;
    };

    return (
        <Fragment>
            <Flex>
                <Box flex="1" p="10">
                    <Fragment>
                        <Stack><Heading> All Appointments</Heading></Stack>
                        {loading ? (
                            <Loader />
                        ) : (
                            <MDBDataTable
                                data={setAppointments()}
                                className="px-3"
                                bordered
                                hover
                                responsive
                                noBottomColumns
                            />
                        )}
                    </Fragment>
                </Box>
            </Flex>
        </Fragment>
    );
};

export default SecretaryAppointmentList;
