import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import Loader from '../layout/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { myOrders, clearErrors } from '../../actions/orderActions';
import { CiRead } from 'react-icons/ci';
import StatusSteps from './StatusSteps';

const ToPayOrders = () => {
    const dispatch = useDispatch();

    const { loading, error, orders } = useSelector(state => state.myOrders);

    useEffect(() => {
        dispatch(myOrders());

        if (error) {
            dispatch(clearErrors());
        }
    }, [dispatch, error]);

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
        };

        orders.forEach(order => {
            const orderStatus = order.orderStatus || [];
            const sortedStatus = orderStatus.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            const latestStatus = sortedStatus.length > 0 ? sortedStatus[0].status : 'No status';
            const formattedDate = new Date(order.dateOrdered).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: '2-digit',
            });
            if (latestStatus === 'TOPAY') {
                data.rows.push({
                    id: order._id,
                    date: formattedDate,
                    numOfItems: order.orderItems.length,
                    amount: `₱ ${order.totalPrice.toLocaleString()}`,
                    status: (
                        <span className={`badge badge-primary`}>
                            {'To Pay'}
                        </span>
                    ),
                    actions: (
                        <Link to={`/order/${order._id}`} className='btn btn-primary'>
                            <CiRead />
                        </Link>
                    )
                });
            }
        });

        return data;
    };

    return (
        <div className='container'>
            <StatusSteps />
            <h1 className='my-5'>My Orders</h1>
            {!loading ? (
                <Loader />
            ) : (
                <MDBDataTable
                    data={setOrders()}
                    className='px-3'
                    bordered
                    striped
                    hover
                    noBottomColumns
                />
            )}
        </div>
    );
};

export default ToPayOrders;
