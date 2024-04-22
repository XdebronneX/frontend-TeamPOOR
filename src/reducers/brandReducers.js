import {
    CREATE_BRANDS_REQUEST,
    CREATE_BRANDS_SUCCESS,
    CREATE_BRANDS_FAIL,
    CREATE_BRANDS_RESET,

    ALL_BRANDS_REQUEST,
    ALL_BRANDS_SUCCESS,
    ALL_BRANDS_FAIL,

    BRAND_DETAILS_REQUEST,
    BRAND_DETAILS_SUCCESS,
    BRAND_DETAILS_FAIL,

    UPDATE_BRANDS_REQUEST,
    UPDATE_BRANDS_SUCCESS,
    UPDATE_BRANDS_FAIL,
    UPDATE_BRANDS_RESET,

    DELETE_BRANDS_REQUEST,
    DELETE_BRANDS_SUCCESS,
    DELETE_BRANDS_FAIL,
    DELETE_BRANDS_RESET,

    CLEAR_ERRORS,
} from "../constants/brandConstants";


export const newBrandReducer = (state = { brand: {} }, action) => {
    switch (action.type) {
        case CREATE_BRANDS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CREATE_BRANDS_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                brand: action.payload.brand,
            };
        case CREATE_BRANDS_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case CREATE_BRANDS_RESET:
            return {
                ...state,
                success: false,
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

export const allBrandReducer = (state = { brands: [] }, action) => {
    switch (action.type) {
        case ALL_BRANDS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ALL_BRANDS_SUCCESS:
            return {
                ...state,
                loading: false,
                brands: action.payload,

            }
        case ALL_BRANDS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
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

export const brandDetailsReducer = (state = { brand: {} }, action) => {
    switch (action.type) {
        case BRAND_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case BRAND_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                brand: action.payload
            }
        case BRAND_DETAILS_FAIL:
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

export const deprovisionBrandReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_BRANDS_REQUEST:
        case DELETE_BRANDS_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case UPDATE_BRANDS_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };

        case DELETE_BRANDS_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            };

        case UPDATE_BRANDS_RESET:
            return {
                ...state,
                isUpdated: false,
            };

        case DELETE_BRANDS_RESET:
            return {
                ...state,
                isDeleted: false,
            };

        case UPDATE_BRANDS_FAIL:
        case DELETE_BRANDS_FAIL:
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