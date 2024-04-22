import {
    CREATE_MOTORCYCLES_REQUEST,
    CREATE_MOTORCYCLES_SUCCESS,
    CREATE_MOTORCYCLES_FAIL,
    CREATE_MOTORCYCLES_RESET,

    MY_MOTORCYCLES_REQUEST,
    MY_MOTORCYCLES_SUCCESS,
    MY_MOTORCYCLES_FAIL,

    ALL_MOTORCYCLES_REQUEST,
    ALL_MOTORCYCLES_SUCCESS,
    ALL_MOTORCYCLES_FAIL,

    MOTORCYCLE_DETAILS_REQUEST,
    MOTORCYCLE_DETAILS_SUCCESS,
    MOTORCYCLE_DETAILS_FAIL,

    UPDATE_MOTORCYCLES_REQUEST,
    UPDATE_MOTORCYCLES_SUCCESS,
    UPDATE_MOTORCYCLES_FAIL,
    UPDATE_MOTORCYCLES_RESET,

    DELETE_MOTORCYCLES_REQUEST,
    DELETE_MOTORCYCLES_SUCCESS,
    DELETE_MOTORCYCLES_FAIL,
    DELETE_MOTORCYCLES_RESET,

    CLEAR_ERRORS,
} from "../constants/motorcycleConstants";

export const newMotorcycleReducer = (state = { motorcycle: {}, createdMotorcycle: false }, action) => {
    switch (action.type) {
        case CREATE_MOTORCYCLES_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CREATE_MOTORCYCLES_SUCCESS:
            return {
                ...state,
                loading: false,
                createdMotorcycle: true, // Set to true when a motorcycle is created
                motorcycle: action.payload,
            };

        case CREATE_MOTORCYCLES_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case CREATE_MOTORCYCLES_RESET:
            return {
                ...state,
                createdMotorcycle: false, // Reset the createdMotorcycle flag
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

export const myMotorcycleReducer = (state = { userMotorcycles: [] }, action) => {
    switch (action.type) {
        case MY_MOTORCYCLES_REQUEST:
            return {
                loading: true,
            };

        case MY_MOTORCYCLES_SUCCESS:
            return {
                loading: false,
                userMotorcycles: action.payload,
            };

        case MY_MOTORCYCLES_FAIL:
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

// ADMIN ACCESS CONTROL
export const allMotorcyclesReducer = (state = { motorcycles: [] }, action) => {
    switch (action.type) {
        case ALL_MOTORCYCLES_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ALL_MOTORCYCLES_SUCCESS:
            return {
                ...state,
                loading: false,
                motorcycles: action.payload,

            }
        case ALL_MOTORCYCLES_FAIL:
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

export const motorcycleDetailsReducer = (state = { motorcycle: {} }, action) => {
    switch (action.type) {
        case MOTORCYCLE_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case MOTORCYCLE_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                motorcycle: action.payload
            }
        case MOTORCYCLE_DETAILS_FAIL:
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

export const deprovisionMotorcycleReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_MOTORCYCLES_REQUEST:
        case DELETE_MOTORCYCLES_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case UPDATE_MOTORCYCLES_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };

        case DELETE_MOTORCYCLES_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            };

        case UPDATE_MOTORCYCLES_RESET:
            return {
                ...state,
                isUpdated: false,
            };

        case DELETE_MOTORCYCLES_RESET:
            return {
                ...state,
                isDeleted: false,
            };

        case UPDATE_MOTORCYCLES_FAIL:
        case DELETE_MOTORCYCLES_FAIL:
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