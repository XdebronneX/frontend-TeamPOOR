import React, { Fragment, useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Loader from '../layout/Loader'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails, updateBySecretaryOrder, clearErrors } from '../../actions/orderActions'
import { UPDATE_ORDER_RESET } from '../../constants/orderConstants'

const SecretaryUpdateOrders = () => {

    const [status, setStatus] = useState('');
    const dispatch = useDispatch();
    let { id } = useParams();
    let navigate = useNavigate();
    const { loading, order = {} } = useSelector(state => state.orderDetails)
    const { shippingInfo, orderItems, paymentInfo, user, totalPrice } = order;
    const { error, isUpdated } = useSelector(state => state.adminOrders);
    const orderId = id;

    const errMsg = (message = '') => toast.error(message, {
        position: toast.POSITION.BOTTOM_CENTER
    });

    const successMsg = (message = '') => toast.success(message, {
        position: toast.POSITION.BOTTOM_CENTER
    });

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
        case 'PAID':
            badgeColor = 'success';
            badgeText = 'Paid';
            break;
        case 'COMPLETED':
            badgeColor = 'success';
            badgeText = 'Completed';
            break;
        default:
            badgeText = 'No status';
    }

    useEffect(() => {
        dispatch(getOrderDetails(orderId));

        if (error) {
            errMsg(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            navigate('/secretary/orders');
            successMsg('Status Updated');
            dispatch({ type: UPDATE_ORDER_RESET });
        }

    }, [dispatch, error, isUpdated, orderId, navigate]);

    const updateOrderHandler = (id) => {
        const formData = new FormData();
        formData.set('orderStatus', status);

        dispatch(updateBySecretaryOrder(id, formData));
    };

    console.log(order)

    return (
        <Fragment>
            <div className="row">
                <div className="col-12 col-md-10">
                    <Fragment>
                        {loading ? <Loader /> : (
                            <div className="row d-flex justify-content-around">
                                <div className="col-12 col-lg-7 order-details">
                                    <h2 className="my-5">Order # {order._id}</h2>
                                    <h4 className="mb-4">Delivery Address</h4>
                                    <p><b>Name:</b> {order && order.fullname}</p>
                                    <p><b>Phone:</b> {order && order.phone}</p>
                                    <p className="mb-4"><b>Address:</b>{order.region}, {order.province}, {order.city}, {order.barangay}, {order.address}, {order.postalcode}</p>
                                    {/* <p><b>Amount:</b> ${totalPrice}</p> */}
                                    <hr />
                                    <h4 className="my-4">Payment</h4>
                                    <p><b>{order && order.paymentMethod}</b></p>
                                    <h4 className="my-4">Order Status:</h4>
                                    <p>
                                        <span className={`badge badge-${badgeColor}`}>
                                            {badgeText}
                                        </span>
                                    </p>
                                    <h4 className="my-4">Order Items:</h4>
                                    <hr />
                                    <div className="cart-item my-1">
                                        {order && order.orderItems && order.orderItems.map(item => (
                                            <div key={item._id} className="row my-5">
                                                <div className="col-5 col-lg-2">
                                                    {item.product && item.product.images && (
                                                        <img src={item.product.images[0].url} alt={item.product.name} height="45" width="65" />
                                                    )}
                                                </div>
                                                <div className="col-5 col-lg-5">
                                                    {item.product && (
                                                        <Link to={`/products/${item.product._id}`}>{item.product.name}</Link>
                                                    )}
                                                </div>
                                                <div className="col-5 col-lg-2 mt-4 mt-lg-0">
                                                    {item.product && item.product.price !== undefined && (
                                                        <p>₱ {item.product.price.toLocaleString()}</p>
                                                    )}
                                                </div>
                                                <div className="col-5 col-lg-3 mt-4 mt-lg-0">
                                                    {item.quantity && <p>{item.quantity} Piece(s)</p>}
                                                </div>
                                                <div className='col-4 col-lg-4 mt-4 mt-lg-0'>
                                                    <p>
                                                        {item.quantity} x ₱ {item.product.price} ={' '}
                                                        <b>₱ {(item.quantity * item.product.price).toLocaleString(undefined, {minimumFractionDigits: 2})}</b>
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                        <div className='col-4 col-lg-4 mt-4 mt-lg-0'>
                                            <p><b>Total Amount: ₱ {totalPrice !== undefined ? totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 }) : ''}</b></p>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                                {latestStatus === 'COMPLETED' ? (
                                    <button className="btn btn-primary btn-block" onClick={() => updateOrderHandler(order._id)} hidden>
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
                                                <option value="TOPAY">To Pay</option>
                                                <option value="TOSHIP">To Ship</option>
                                                <option value="TORECEIVED">To Received</option>
                                                <option value="FAILEDATTEMPT">Failed Attempt</option>
                                                <option value="CANCELLED">Cancel</option>
                                                <option value="RETURNED">Returned Item</option>
                                                <option value="DELIVERED">Delivered</option>
                                            </select>
                                        </div>
                                        <button className="btn btn-primary btn-block" onClick={() => updateOrderHandler(order._id)}>
                                            Update status
                                        </button>
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

export default SecretaryUpdateOrders;