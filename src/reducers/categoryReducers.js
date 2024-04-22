import {
    CREATE_CATEGORY_REQUEST,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_FAIL,
    CREATE_CATEGORY_RESET,

    ALL_CATEGORY_REQUEST,
    ALL_CATEGORY_SUCCESS,
    ALL_CATEGORY_FAIL,

    CATEGORY_DETAILS_REQUEST,
    CATEGORY_DETAILS_SUCCESS,
    CATEGORY_DETAILS_FAIL,

    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAIL,
    UPDATE_CATEGORY_RESET,

    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_RESET,
    DELETE_CATEGORY_FAIL,

    CLEAR_ERRORS
} from "../constants/categoryConstants";


export const newCategoryReducer = (state = { category: {} }, action) => {
    switch (action.type) {
        case CREATE_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CREATE_CATEGORY_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                category: action.payload.category,
            };
        case CREATE_CATEGORY_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case CREATE_CATEGORY_RESET:
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

export const allCategoryReducer = (state = { categories: [] }, action) => {
    switch (action.type) {
        case ALL_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ALL_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: action.payload,

            }
        case ALL_CATEGORY_FAIL:
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

export const categoryDetailsReducer = (state = { category: {} }, action) => {
    switch (action.type) {
        case CATEGORY_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case CATEGORY_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                category: action.payload
            }
        case CATEGORY_DETAILS_FAIL:
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

export const deprovisionCategoryReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_CATEGORY_REQUEST:
        case DELETE_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case UPDATE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };

        case DELETE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            };

        case UPDATE_CATEGORY_RESET:
            return {
                ...state,
                isUpdated: false,
            };

        case DELETE_CATEGORY_RESET:
            return {
                ...state,
                isDeleted: false,
            };

        case UPDATE_CATEGORY_FAIL:
        case DELETE_CATEGORY_FAIL:
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