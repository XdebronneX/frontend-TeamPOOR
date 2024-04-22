import { 
    CREATE_APPOINTMENT_REQUEST, 
    CREATE_APPOINTMENT_SUCCESS, 
    CREATE_APPOINTMENT_FAIL,

    MY_APPOINTMENTS_REQUEST,
    MY_APPOINTMENTS_SUCCESS,
    MY_APPOINTMENTS_FAIL,

    APPOINTMENT_DETAILS_REQUEST,
    APPOINTMENT_DETAILS_SUCCESS,
    APPOINTMENT_DETAILS_FAIL,

    ALL_APPOINTMENTS_REQUEST,
    ALL_APPOINTMENTS_SUCCESS,
    ALL_APPOINTMENTS_FAIL,

    UPDATE_APPOINTMENT_REQUEST,
    UPDATE_APPOINTMENT_SUCCESS,
    UPDATE_APPOINTMENT_RESET,
    UPDATE_APPOINTMENT_FAIL,

    DELETE_APPOINTMENT_REQUEST,
    DELETE_APPOINTMENT_SUCCESS,
    DELETE_APPOINTMENT_RESET,
    DELETE_APPOINTMENT_FAIL, 

    CLEAR_ERRORS
} from "../constants/appointmentConstants";
import { ALL_USERS_REQUEST, ALL_USERS_SUCCESS, ALL_USERS_FAIL } from "../constants/userConstants";

export const createAppointmentReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_APPOINTMENT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case CREATE_APPOINTMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                appointment: action.payload,
                success: true
            }
        case CREATE_APPOINTMENT_FAIL:
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
            return state
    }
}

export const myAppointmentsReducer = (state = { bookings: [] }, action) => {
    switch (action.type) {
        case MY_APPOINTMENTS_REQUEST:
            return {
                loading: true
            }

        case MY_APPOINTMENTS_SUCCESS:
            return {
                loading: false,
                bookings: action.payload
            }

        case MY_APPOINTMENTS_FAIL:
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
            return state
    }
}

export const allAppointmentsReducer = (state = { allbookings: [] }, action) => {
    switch (action.type) {
        case ALL_APPOINTMENTS_REQUEST:
            return {
                loading: true
            }
        case ALL_APPOINTMENTS_SUCCESS:
            return {
                loading: false,
                allbookings: action.payload.allbookings,
                totalAmountServices: action.payload.totalAmountServices

            }
        case ALL_APPOINTMENTS_FAIL:
            return {
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

export const appointmentDetailsReducer = (state = { booking: {} }, action) => {
    switch (action.type) {
        case APPOINTMENT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case APPOINTMENT_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                booking: action.payload,
            };

        case APPOINTMENT_DETAILS_FAIL:
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

export const adminAppointmentReducer = (state = {}, action) => {

    switch (action.type) {
        case UPDATE_APPOINTMENT_REQUEST:
        case DELETE_APPOINTMENT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case UPDATE_APPOINTMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload

            }
        case DELETE_APPOINTMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case UPDATE_APPOINTMENT_FAIL:
        case DELETE_APPOINTMENT_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case UPDATE_APPOINTMENT_RESET:
            return {
                ...state,
                isUpdated: false

            }
        case DELETE_APPOINTMENT_RESET:
            return {
                ...state,
                isDeleted: false

            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

export const allMechanicsReducer = (state = { mechanics: [] }, action) => {
    switch (action.type) {
        case ALL_USERS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ALL_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                mechanics: action.payload,
            }
        case ALL_USERS_FAIL:
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