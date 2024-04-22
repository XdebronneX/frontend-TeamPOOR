import {
    PRICE_HISTORY_REQUEST,
    PRICE_HISTORY_SUCCESS,
    PRICE_HISTORY_FAIL,
    CLEAR_ERRORS
} from "../constants/priceLogsConstants";

export const allPriceLogsReducer = (state = { priceHistoryLog: [] }, action) => {
    switch (action.type) {
        case PRICE_HISTORY_REQUEST:
            return {
                loading: true,
                priceHistoryLog: [],
            };
        case PRICE_HISTORY_SUCCESS:
            return {
                ...state,
                loading: false,
                priceHistoryLog: action.payload,
            }
        case PRICE_HISTORY_FAIL:
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