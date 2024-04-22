import {
    SUPPLIER_HISTORY_REQUEST,
    SUPPLIER_HISTORY_SUCCESS,
    SUPPLIER_HISTORY_FAIL,
    SUPPLIER_HISTORY_RESET,

    SUPPLIED_DETAILS_REQUEST,
    SUPPLIED_DETAILS_SUCCESS,
    SUPPLIED_DETAILS_FAIL,

    CLEAR_ERRORS
} from "../constants/supplierLogsConstants";

import {
    ALL_SUPPLIERS_REQUEST,
    ALL_SUPPLIERS_SUCCESS,
    ALL_SUPPLIERS_FAIL,
} from "../constants/userConstants";

export const newSupplierLogsReducer = (state = { newSupplierLog: {} }, action) => {
    switch (action.type) {
        case SUPPLIER_HISTORY_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case SUPPLIER_HISTORY_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                newSupplierLog: action.payload,
            };
        case SUPPLIER_HISTORY_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case SUPPLIER_HISTORY_RESET:
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

export const allSuppliedProductsReducer = (state = { suppliedHistoryLog: [] }, action) => {
    switch (action.type) {
        case ALL_SUPPLIERS_REQUEST:
            return {
                loading: true,
                suppliedHistoryLog: [],
            };
        case ALL_SUPPLIERS_SUCCESS:
            return {
                ...state,
                loading: false,
                suppliedHistoryLog: action.payload,
            }
        case ALL_SUPPLIERS_FAIL:
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

export const suppliedDetailsReducer = (state = { supplied: {} }, action) => {
    switch (action.type) {
        case SUPPLIED_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case SUPPLIED_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                supplied: action.payload,
            };

        case SUPPLIED_DETAILS_FAIL:
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