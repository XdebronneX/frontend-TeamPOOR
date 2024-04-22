import {
    ADD_TO_SERVICE_CART,
    REMOVE_SERVICE_CART,
    AUTO_REMOVE_SERVICE_CART,
    CLEAR_SERVICE_CART,
    CART_SERVICE_RESET,
    SAVE_BOOKING_INFO,
    SAVE_CUSTOMER_INFO,
    SAVE_SERVICE_INFO
} from "../constants/serviceCartConstants"

export const cartServiceReducer = (state = { cartServices: [], bookingInfo: {}, customerInfo: {}  }, action) => {
    console.log(state.cartServices)
    switch (action.type) {
        case ADD_TO_SERVICE_CART:
            const item = action.payload
            const isItemExist = state.cartServices.find(i => i.service === item.service)
            if (isItemExist) {
                return {
                    ...state,
                    cartServices: state.cartServices.map(i =>
                        i.service === isItemExist.service ? item : i
                    )
                }
            } else {
                return {
                    ...state,
                    cartServices: [...state.cartServices, item]
                }
            }
        case REMOVE_SERVICE_CART:
        case AUTO_REMOVE_SERVICE_CART:
            return {
                ...state,
                cartServices: state.cartServices.filter(i => i.service !== action.payload)
            }
        case SAVE_BOOKING_INFO:
            return {
                ...state,
                bookingInfo: action.payload,
            }
        case SAVE_SERVICE_INFO:
            return {
                ...state,
                cartServices: action.payload,
            };
        case SAVE_CUSTOMER_INFO:
            return {
                ...state,
                customerInfo: action.payload,
            }
        case CLEAR_SERVICE_CART:
            return {
                ...state,
                cartServices: [],
                bookingInfo: {},
                customerInfo: {},
            }
        default:
            return state
    }
}
