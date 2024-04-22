import {
    ADD_TO_CART,
    REMOVE_ITEM_CART,
    AUTO_REMOVE_ITEM_CART,
    SAVE_SHIPPING_INFO,
    SAVE_PAYMENT_INFO,
    CLEAR_CART,
} from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [], shippingInfo: {}, paymentInfo: {} }, action) => {
    console.log(state.cartItems)
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload
            const isItemExist = state.cartItems.find(i => i.product === item.product)
            if (isItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(i =>
                        i.product === isItemExist.product ? item : i
                    )
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case REMOVE_ITEM_CART:
        case AUTO_REMOVE_ITEM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(i => i.product !== action.payload)
            }
        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload,
            }
        case SAVE_PAYMENT_INFO:
            return {
                ...state,
                paymentInfo: action.payload
            }
        case CLEAR_CART:
            return {
                ...state,
                cartItems: [],
                shippingInfo: {},
                paymentInfo: {}
            }
        default:
            return state
    }
}
