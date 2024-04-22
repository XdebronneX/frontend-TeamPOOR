import { 
    CREATE_FUEL_REQUEST,
    CREATE_FUEL_SUCCESS,
    CREATE_FUEL_FAIL,
    CREATE_FUEL_RESET,

    MY_FUEL_REQUEST,
    MY_FUEL_SUCCESS,
    MY_FUEL_FAIL,

    ALL_FUEL_REQUEST,
    ALL_FUEL_SUCCESS,
    ALL_FUEL_FAIL,

    FUEL_DETAILS_REQUEST,
    FUEL_DETAILS_SUCCESS,
    FUEL_DETAILS_FAIL,

    UPDATE_FUEL_REQUEST,
    UPDATE_FUEL_SUCCESS,
    UPDATE_FUEL_FAIL,
    UPDATE_FUEL_RESET,

    DELETE_FUEL_REQUEST,
    DELETE_FUEL_SUCCESS,
    DELETE_FUEL_FAIL,
    DELETE_FUEL_RESET,

    CLEAR_ERRORS

} from "../constants/fuelConstants";

export const newFuelReducer = (state = { fuel: {}, createdFuel: false }, action) => {
    switch (action.type) {
        case CREATE_FUEL_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CREATE_FUEL_SUCCESS:
            return {
                ...state,
                loading: false,
                createdFuel: true,
                fuel: action.payload,
            };
        case CREATE_FUEL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case CREATE_FUEL_RESET:
            return {
                ...state,
                createdFuel: false,
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

export const myFuelReducer = (state = { userFuel: [] }, action) => {
    switch (action.type) {
        case MY_FUEL_REQUEST:
            return {
                loading: true,
            };
        case MY_FUEL_SUCCESS:
            return {
                loading: false,
                userFuel: action.payload,
            };
        case MY_FUEL_FAIL:
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

export const deprovisionFuelReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_FUEL_REQUEST:
        case DELETE_FUEL_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_FUEL_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };
        case DELETE_FUEL_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            };
        case UPDATE_FUEL_RESET:
            return {
                ...state,
                isUpdated: false,
            };
        case DELETE_FUEL_RESET:
            return {
                ...state,
                isDeleted: false,
            };
        case UPDATE_FUEL_FAIL:
        case DELETE_FUEL_FAIL:
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
