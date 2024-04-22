import {
    MY_TASKS_REQUEST,
    MY_TASKS_SUCCESS,
    MY_TASKS_FAIL,

    ALL_REVIEWS_MECHANIC_REQUEST,
    ALL_REVIEWS_MECHANIC_SUCCESS,
    ALL_REVIEWS_MECHANIC_FAIL,

    NEW_MECHANIC_REVIEW_REQUEST,
    NEW_MECHANIC_REVIEW_SUCCESS,
    NEW_MECHANIC_REVIEW_RESET,
    NEW_MECHANIC_REVIEW_FAIL,

    CLEAR_ERRORS,

} from "../constants/mechanicConstants";

import {
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_RESET,
    UPDATE_PROFILE_FAIL,

    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_RESET,
    UPDATE_PASSWORD_FAIL,
    
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_RESET,
    UPDATE_USER_FAIL,

    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_RESET,
    DELETE_USER_FAIL,

} from '../constants/userConstants'


export const myTasksReducer = (state = { taskAssigned: [] }, action) => {
    switch (action.type) {
        case MY_TASKS_REQUEST:
            return {
                loading: true
            }

        case MY_TASKS_SUCCESS:
            return {
                loading: false,
                taskAssigned: action.payload
            }

        case MY_TASKS_FAIL:
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

export const newMechanicReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case NEW_MECHANIC_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_MECHANIC_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload,
            };
        case NEW_MECHANIC_REVIEW_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case NEW_MECHANIC_REVIEW_RESET:
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
}

export const mechanicReviewsReducer = (state = { feedbacks: [] }, action) => {
    switch (action.type) {
        case ALL_REVIEWS_MECHANIC_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ALL_REVIEWS_MECHANIC_SUCCESS:
            return {
                ...state,
                loading: false,
                feedbacks: action.payload
            }
        case ALL_REVIEWS_MECHANIC_FAIL:
            return {
                ...state,
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

export const deprovisionReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_PROFILE_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
        case UPDATE_USER_REQUEST:
        case DELETE_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case UPDATE_PROFILE_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };

        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            };

        case UPDATE_PROFILE_RESET:
        case UPDATE_PASSWORD_RESET:
        case UPDATE_USER_RESET:
            return {
                ...state,
                isUpdated: false,
            };

        case DELETE_USER_RESET:
            return {
                ...state,
                isDeleted: false,
            };

        case UPDATE_PROFILE_FAIL:
        case UPDATE_PASSWORD_FAIL:
        case UPDATE_USER_FAIL:
        case DELETE_USER_FAIL:
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