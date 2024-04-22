import axios from 'axios';
import {
    ADD_TO_SERVICE_CART,
    REMOVE_SERVICE_CART,
    AUTO_REMOVE_SERVICE_CART,
    CLEAR_SERVICE_CART,
    CART_SERVICE_RESET,
    SAVE_SERVICE_INFO,
    SAVE_BOOKING_INFO,
    SAVE_CUSTOMER_INFO,

} from "../constants/serviceCartConstants"

export const addServiceToCart = (id) => async (dispatch, getState) => {
    const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/showSingleService/${id}`, {withCredentials: true})
    dispatch({
        type: ADD_TO_SERVICE_CART,
        payload: {
            service: data.service._id,
            name: data.service.name,
            price: data.service.price,
            image: data.service.images[0].url,
        }
    })
    localStorage.setItem('cartServices', JSON.stringify(getState().serviceCart.cartServices))
}

export const removeServiceFromCart = id => async (dispatch, getState) => {
    dispatch({
        type: REMOVE_SERVICE_CART,
        payload: id
    })
    localStorage.setItem('cartServices', JSON.stringify(getState().serviceCart.cartServices))
}

export const saveBookingInfo = data => async dispatch => {
    dispatch({
        type: SAVE_BOOKING_INFO,
        payload: data
    })
    localStorage.setItem('bookingInfo', JSON.stringify(data))
}

export const saveServiceInfo = data => async dispatch => {
    dispatch({
        type: SAVE_SERVICE_INFO,
        payload: data
    })
    localStorage.setItem('cartServices', JSON.stringify(data))
}

export const saveCustomerInfo = data => async dispatch => {
    dispatch({
        type: SAVE_CUSTOMER_INFO,
        payload: data
    })

    localStorage.setItem('customerInfo', JSON.stringify(data))
}

export const clearServiceCart = () => async (dispatch) => {
    dispatch({
        type: CLEAR_SERVICE_CART,
    })
}