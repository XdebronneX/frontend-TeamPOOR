import {
    STOCK_HISTORY_REQUEST,
    STOCK_HISTORY_SUCCESS,
    STOCK_HISTORY_FAIL,
    CLEAR_ERRORS

} from "../constants/stockLogsConstants";

export const allStockLogsReducer = (state = { stockLogs: [] }, action) => {
    switch (action.type) {
        case STOCK_HISTORY_REQUEST:
            return {
                loading: true,
                stockLogs: [],
            };
        case STOCK_HISTORY_SUCCESS:
            return {
                ...state,
                loading: false,
                stockLogs: action.payload,
            }
        case STOCK_HISTORY_FAIL:
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

