import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const OrderReceipt = ({ }) => {
    let { id } = useParams();
    const { loading, order = {} } = useSelector((state) => state.orderDetails);
    const { shippingInfo, orderItems, paymentInfo, user, totalPrice } = order;
    const orderId = id;

    const orderStatus = order.orderStatus || [];
    const sortedStatus = orderStatus.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    const latestStatus = sortedStatus.length > 0 ? sortedStatus[0].status : 'No status';

    let badgeColor = '';
    let badgeText = '';

    switch (latestStatus) {
        case 'TOPAY':
            badgeColor = 'primary';
            badgeText = 'To Pay';
            break;
        case 'Pending':
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
            badgeText = 'No Status';
    }

    return (
        <div className="col-12 col-lg-7 order-details">
            <h2 className="my-5">Order # {order._id}</h2>
            <h4>Delivery Address</h4>
            <p >
                <b>Name:</b> {order && order.fullname}
            </p>
            <p>
                <b>Phone:</b> {order && order.phone}
            </p>
            <p>
                <b>Address:</b> {order.region}, {order.province}, {order.city}, {order.barangay}, {order.address},{' '}
                {order.postalcode}
            </p>
            <hr />
            <h4>Payment</h4>
            <p>
                <b>{order && order.paymentMethod}</b>
            </p>
            <hr />
            <h4>Order Status</h4>
            <p>
                <span className={`badge badge-${badgeColor}`}>{badgeText}</span>
            </p>
            <hr />
            <h4>Order Items</h4>
            {order &&
                order.orderItems &&
                order.orderItems.map((item) => (
                    <div key={item._id} className="row my-5">
                        <div className="col-5 col-lg-2">
                            {item.product && item.product.images && (
                                <img src={item.product.images[0].url} alt={item.product.name} height="45" width="65" />
                            )}
                        </div>
                        <div className="col-5 col-lg-5">
                            {item.product && <Link to={`/showSingleProduct/${item.product._id}`}>{item.product.name}</Link>}
                        </div>
                        <div className="col-5 col-lg-2 mt-4 mt-lg-0">
                            {item.product && item.product.price && <p>₱ {item.product.price.toLocaleString()}</p>}
                        </div>
                        <div className="col-5 col-lg-3 mt-4 mt-lg-0">
                            {item.quantity && <p>{item.quantity} Piece(s)</p>}
                        </div>
                        <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                            <p>
                                {item.quantity} x ₱ {item.product?.price} = <b>₱ {(item.quantity * item.product?.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}</b>
                            </p>
                        </div>
                    </div>
                ))}
            <div className="row">
                <div className="col-8 offset-4">
                    <p className="text-right">
                        <b>Total amount: ₱ {totalPrice}</b>
                    </p>
                </div>
            </div>
            <hr />
        </div>
    );
};

export default OrderReceipt;

