import {
    NEW_SERVICE_REQUEST,
    NEW_SERVICE_SUCCESS,
    NEW_SERVICE_FAIL,
    NEW_SERVICE_RESET,

    ALL_SERVICES_REQUEST,
    ALL_SERVICES_SUCCESS,
    ALL_SERVICES_FAIL,

    SERVICE_DETAILS_REQUEST,
    SERVICE_DETAILS_SUCCESS,
    SERVICE_DETAILS_FAIL,

    ADMIN_SERVICES_REQUEST,
    ADMIN_SERVICES_SUCCESS,
    ADMIN_SERVICES_FAIL,

    UPDATE_SERVICE_REQUEST,
    UPDATE_SERVICE_SUCCESS,
    UPDATE_SERVICE_FAIL,
    UPDATE_SERVICE_RESET,

    DELETE_SERVICE_REQUEST,
    DELETE_SERVICE_SUCCESS,
    DELETE_SERVICE_FAIL,
    DELETE_SERVICE_RESET,

    CLEAR_ERRORS
} from "../constants/serviceConstants";

export const allServiceReducer = (state = { services: [] }, action) => {
    switch (action.type) {
        case ALL_SERVICES_REQUEST:
        case ADMIN_SERVICES_REQUEST:
            return {
                loading: true,
                services: [],
            };
        case ALL_SERVICES_SUCCESS:
            return {
                ...state,
                loading: false,
                services: action.payload.services,
            }
        case ADMIN_SERVICES_SUCCESS:
            return {
                ...state,
                loading: false,
                services: action.payload,
            };
        case ALL_SERVICES_FAIL:
        case ADMIN_SERVICES_FAIL:
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

export const deprovisionServiceReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_SERVICE_REQUEST:
        case UPDATE_SERVICE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DELETE_SERVICE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            };
        case UPDATE_SERVICE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };
        case DELETE_SERVICE_FAIL:
        case UPDATE_SERVICE_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case DELETE_SERVICE_RESET:
            return {
                ...state,
                isDeleted: false,
            };
        case UPDATE_SERVICE_RESET:
            return {
                ...state,
                isUpdated: false,
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

export const serviceDetailsReducer = (state = { service: {} }, action) => {
    switch (action.type) {
        case SERVICE_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case SERVICE_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                service: action.payload
            }
        case SERVICE_DETAILS_FAIL:
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

export const newServiceReducer = (state = { service: {} }, action) => {
    switch (action.type) {
        case NEW_SERVICE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_SERVICE_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                service: action.payload.service,
            };
        case NEW_SERVICE_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case NEW_SERVICE_RESET:
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