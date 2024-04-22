import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import Loader from '../layout/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { myOrders, clearErrors } from '../../actions/orderActions'
import { CiRead } from "react-icons/ci";
import StatusSteps from './StatusSteps'
import TrackingOrders from './TrackingOrders'
import { Flex, Heading, Text, Button, useToast, Box, Container } from '@chakra-ui/react';
import { RiCurrencyFill } from "react-icons/ri";

const ListOrders = () => {
    const dispatch = useDispatch()

    const { loading, error, orders } = useSelector(state => state.myOrders)

    useEffect(() => {
        dispatch(myOrders())

        if (error) {
            dispatch(clearErrors())
        }
    }, [dispatch, error])

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Date Order',
                    field: 'date',
                    sort: 'disabled'
                },
                {
                    label: 'Number Of Items Purchase',
                    field: 'numOfItems',
                    sort: 'disabled'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'disabled'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'disabled'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'disabled'
                }
            ],

            rows: []
        }

        orders.forEach(order => {
            const orderStatus = order.orderStatus || [];
            const sortedStatus = orderStatus.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            const latestStatus = sortedStatus.length > 0 ? sortedStatus[0].status : 'No status';

            let badgeColor = '';
            let badgeText = '';

            switch (latestStatus) {
                case 'Pending':
                case 'TOPAY':
                    badgeColor = 'primary';
                    badgeText = 'Pending';
                    break;
                case 'TOSHIP':
                    badgeColor = 'info';
                    badgeText = 'To Ship';
                    break;
                case 'TORECEIVED':
                    badgeColor = 'primary';
                    badgeText = 'Out Of Delivery';
                    break;
                case 'FAILEDATTEMPT':
                    badgeColor = 'warning';
                    badgeText = 'Failed Attempt';
                    break;
                case 'CANCELLED':
                    badgeColor = 'danger';
                    badgeText = 'Cancelled';
                    break;
                case 'RETURNED':
                    badgeColor = 'danger';
                    badgeText = 'Returned';
                    break;
                case 'DELIVERED':
                    badgeColor = 'success';
                    badgeText = 'Received';
                    break;
                case 'COMPLETED':
                    badgeColor = 'success';
                    badgeText = 'Completed';
                    break;
                case 'PAID':
                    badgeColor = 'success';
                    badgeText = 'Paid';
                    break;
                default:
                    badgeText = 'No status';
            }
            const formattedDate = new Date(order.dateOrdered).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: '2-digit',
            });
            data.rows.push({
                id: order._id,
                date: formattedDate,
                numOfItems: order.orderItems.length,
                amount: `₱ ${order.totalPrice.toLocaleString()}`,
                status: (
                    <span className={`badge badge-${badgeColor}`}>
                        {badgeText}
                    </span>
                ),
                actions: (
                    <Link to={`/order/${order._id}`} className='btn btn-primary'>
                        <CiRead />
                    </Link>
                )
            })
        })

        return data
    }

    const totalPrice = orders ? orders.reduce((acc, curr) => acc + curr.totalPrice, 0) : 0;
    const formattedTotalCost = totalPrice.toLocaleString();
    return (
        <Container maxW="container.xl">
            <StatusSteps />
            <Flex justifyContent="space-between" alignItems="center" mb={4}>
                <Box mt={4} p={4} bg="gray.100" rounded="md" boxShadow="md" display="flex" alignItems="center">
                    <RiCurrencyFill style={{ marginRight: '8px' }} />
                    <Text>Total Expenses: <strong>₱{formattedTotalCost}</strong></Text>
                </Box>
                <Heading as="h1" fontSize="3xl" fontWeight="bold">
                    Order List
                </Heading>
            </Flex>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    {orders && orders.length === 0 ? (
                        <Text>No orders found.</Text>
                    ) : (
                        <MDBDataTable
                            striped
                            bordered
                            noBottomColumns
                            data={setOrders()}
                        />
                    )}
                </Fragment>
            )}
        </Container>
    )
}

export default ListOrders;