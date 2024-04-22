import { 
    CREATE_ADDRESSES_REQUEST,
    CREATE_ADDRESSES_SUCCESS,
    CREATE_ADDRESSES_FAIL,
    CREATE_ADDRESSES_RESET,

    MY_ADDRESSES_REQUEST,
    MY_ADDRESSES_SUCCESS,
    MY_ADDRESSES_FAIL,

    UPDATE_ADDRESSES_REQUEST,
    UPDATE_ADDRESSES_SUCCESS,
    UPDATE_ADDRESSES_FAIL,
    UPDATE_ADDRESSES_RESET,

    DELETE_ADDRESSES_REQUEST,
    DELETE_ADDRESSES_SUCCESS,
    DELETE_ADDRESSES_FAIL,
    DELETE_ADDRESSES_RESET,

    ADDRESS_DETAILS_REQUEST,
    ADDRESS_DETAILS_SUCCESS,
    ADDRESS_DETAILS_FAIL,
    
    CLEAR_ERRORS
}  from '../constants/addressConstants';

export const newAddressesReducer = (state = { addresses: {}, createdAddresses: false }, action) => {
    switch (action.type) {
        case CREATE_ADDRESSES_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CREATE_ADDRESSES_SUCCESS:
            return {
                ...state,
                loading: false,
                createdAddresses: true, 
                addresses: action.payload,
            };

        case CREATE_ADDRESSES_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case CREATE_ADDRESSES_RESET:
            return {
                ...state,
                createdAddresses: false,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};

export const myAddressesReducer = (state = { userAddresses: [] }, action) => {
    switch (action.type) {
        case MY_ADDRESSES_REQUEST:
            return {
                loading: true,
            };

        case MY_ADDRESSES_SUCCESS:
            return {
                loading: false,
                userAddresses: action.payload,
            };

        case MY_ADDRESSES_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};

export const addressDetailsReducer = (state = { addresses: {} }, action) => {
    switch (action.type) {
        case ADDRESS_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ADDRESS_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                addresses: action.payload
            }
        case ADDRESS_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const deprovisionMyAddressesReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_ADDRESSES_REQUEST:
        case DELETE_ADDRESSES_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case UPDATE_ADDRESSES_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };

        case DELETE_ADDRESSES_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            };

        case UPDATE_ADDRESSES_RESET:
            return {
                ...state,
                isUpdated: false,
            };

        case DELETE_ADDRESSES_RESET:
            return {
                ...state,
                isDeleted: false,
            };

        case UPDATE_ADDRESSES_FAIL:
        case DELETE_ADDRESSES_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};