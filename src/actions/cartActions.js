import axios from 'axios'
import { ADD_TO_CART, CLEAR_CART, REMOVE_ITEM_CART, SAVE_SHIPPING_INFO, SAVE_PAYMENT_INFO, AUTO_REMOVE_ITEM_CART } from '../constants/cartConstants'
const SECONDS_IN_MINUTE = 60;
const STOCK_REMOVE_TIMEFRAME = 1 * SECONDS_IN_MINUTE;
export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/showSingleProduct/${id}`, {withCredentials:true})
    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.stock,
            quantity
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeItemFromCart = id => async (dispatch, getState) => {
    dispatch({
        type: REMOVE_ITEM_CART,
        payload: id
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const autoremoveItemFromCart = (id) => (dispatch, getState) => {
    const { cartItems } = getState().cart;

    // Check if the item is in the cart
    const isItemInCart = cartItems.find((item) => item.product === id);

    if (isItemInCart) {
        // Dispatch the action to remove the item from the cart
        dispatch({
            type: AUTO_REMOVE_ITEM_CART,
            payload: id,
        });

        // Remove the item from local storage
        const updatedCartItems = cartItems.filter((item) => item.product !== id);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    }
};

export const saveShippingInfo = data => async dispatch => {
    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data
    })

    localStorage.setItem('shippingInfo', JSON.stringify(data))
}

export const savePaymentInfo = data => async dispatch => {
    dispatch({
        type: SAVE_PAYMENT_INFO,
        payload: data
    })
    localStorage.setItem('paymentInfo', JSON.stringify(data))
}

export const clearCart = () => async (dispatch) => {
    dispatch({
        type: CLEAR_CART,
    })
}
