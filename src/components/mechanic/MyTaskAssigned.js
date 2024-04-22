import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import Loader from '../layout/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { myAssignTasks, clearErrors } from '../../actions/mechanicActions'
import { CiRead } from "react-icons/ci";
import { Flex, Heading, Text, Button, useToast, Box, Container } from '@chakra-ui/react';
import { RiCurrencyFill } from "react-icons/ri";
import TaskStatus from "./TaskStatus";

const MyTaskAssigned = () => {
    const dispatch = useDispatch()

    const { loading, error, taskAssigned } = useSelector(state => state.myTasks)

    useEffect(() => {
        dispatch(myAssignTasks())

        if (error) {
            dispatch(clearErrors())
        }
    }, [dispatch, error])

    const setTasks = () => {
        const data = {
            columns: [
                {
                    label: 'Task ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Appointment date',
                    field: 'appointmentDate',
                    sort: 'disabled',
                },
                {
                    label: 'Time',
                    field: 'timeSlot',
                    sort: 'disabled',
                },
                {
                    label: 'No of service',
                    field: 'numofServices',
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
                    label: 'Actions',
                    field: 'actions',
                    sort: 'disabled'
                }
            ],

            rows: []
        }


        taskAssigned.forEach(task => {
            const appointmentStatus = task.appointmentStatus || [];
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
                    badgeColor = 'purple';
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
            const formattedDate = new Date(task.appointmentDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: '2-digit',
            });
            data.rows.push({
                id: task._id,
                numofServices: task.appointmentServices.length,
                amount: `$${task.totalPrice}`,
                appointmentDate: formattedDate,
                timeSlot: task.timeSlot,
                serviceType: task.serviceType,
                status: (
                    <span className={`badge badge-${badgeColor}`}>
                        {badgeText}
                    </span>
                ),
                actions: (
                    <Link to={`/task/${task._id}`} className='btn btn-primary'>
                        <CiRead />
                    </Link>
                )
            })
        })

        return data
    }

    return (
        <Container maxW="container.xl">
            <TaskStatus />
            <Flex justifyContent="space-between" alignItems="center" mb={4}>
                <Box mt={4} p={4} bg="gray.100" rounded="md" boxShadow="md" display="flex" alignItems="center">
                    <Heading as="h1" fontSize="1xl" fontWeight="bold">
                        Task list
                    </Heading>
                </Box>
            </Flex>
            {!loading ? (
                <Loader />
            ) : (
                <Fragment>
                    {taskAssigned && taskAssigned.length === 0 ? (
                        <Text>No task found.</Text>
                    ) : (
                        <MDBDataTable
                            striped
                            bordered
                            responsive
                            hover
                            noBottomColumns
                            data={setTasks()}
                        />
                    )}
                </Fragment>
            )}
        </Container>
    )
}

export default MyTaskAssigned;
