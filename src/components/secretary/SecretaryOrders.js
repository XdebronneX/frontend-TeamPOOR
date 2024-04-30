import React, { Fragment, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import Loader from '../layout/Loader'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux'
import { listOrders, clearErrors, deleteOrder } from '../../actions/orderActions'
import { CiRead } from "react-icons/ci";
import { Button } from '@chakra-ui/react';

const SecretaryOrders = () => {

    const dispatch = useDispatch();
    let navigate = useNavigate();
    const { loading, error, alllistorders } = useSelector((state) => state.allOrders);

    const errMsg = (message = '') => toast.error(message, {
        position: toast.POSITION.BOTTOM_CENTER
    });
    const successMsg = (message = '') => toast.success(message, {
        position: toast.POSITION.BOTTOM_CENTER
    });

    useEffect(() => {
        dispatch(listOrders());
        if (error) {
            errMsg(error)
            dispatch(clearErrors())
        }
    }, [dispatch, error, navigate])

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc',
                },
                {
                    label: 'Date Order',
                    field: 'date',
                    sort: 'disabled',
                },
                {
                    label: 'No of Items',
                    field: 'numofItems',
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
                    label: 'Actions',
                    field: 'actions',
                    sort: 'disabled',
                },
            ],
            rows: [],
        };

        if (alllistorders && alllistorders.length > 0) {
            alllistorders.forEach((order) => {
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
                    default:
                        badgeText = 'No status';
                }
                const formattedDateOrdered = new Date(order.dateOrdered).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: '2-digit',
                });

                data.rows.push({
                    id: order._id,
                    numofItems: order.orderItems.length,
                    amount: `₱ ${order.totalPrice.toLocaleString()}`,
                    status: (
                        <span className={`badge badge-${badgeColor}`}>
                            {badgeText}
                        </span>
                    ),
                    date: formattedDateOrdered,
                    actions: (
                        <Link to={`/secretary/order/${order._id}`}>
                            <Button colorScheme="blue" size="sm" ml="3" leftIcon={<CiRead />}>
                                View
                            </Button>
                        </Link>
                    ),
                });
            });
        }

        return data;
    };

    return (
        <Fragment>
            <h1>List of Orders</h1>
            {loading ? <Loader /> : (
                <MDBDataTable
                    data={setOrders()}
                    className="px-3"
                    bordered
                    striped
                    hover
                    noBottomColumns
                />
            )}
        </Fragment>
    );
}

export default SecretaryOrders;

