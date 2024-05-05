import {
    MONTHLY_SALES_REQUEST,
    MONTHLY_SALES_SUCCESS,
    MONHTLY_SALES_FAIL,

    PRODUCT_SALES_REQUEST,
    PRODUCT_SALES_SUCCESS,
    PRODUCT_SALES_FAIL,

    MOST_LOYAL_REQUEST,
    MOST_LOYAL_SUCCESS,
    MOST_LOYAL_FAIL,

    MOST_BRAND_REQUEST,
    MOST_BRAND_SUCCESS,
    MOST_BRAND_FAIL,

    MOST_RATED_REQUEST,
    MOST_RATED_SUCCESS,
    MOST_RATED_FAIL,

    CLEAR_ERRORS
} from "../constants/reportsConstants";

export const monthlySalesReducer = (state = { monthlySales: [] }, action) => {
    switch (action.type) {
        case MONTHLY_SALES_REQUEST:
            return {
                ...state,
                loading: true
            }
        case MONTHLY_SALES_SUCCESS:
            return {
                ...state,
                loading: false,
                monthlySales: action.payload
            }
        case MONHTLY_SALES_FAIL:
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

export const mostLoyalReducer = (state = { mostPurchasedUser: [] }, action) => {
    switch (action.type) {
        case MOST_LOYAL_REQUEST:
            return {
                ...state,
                loading: true
            }
        case MOST_LOYAL_SUCCESS:
            return {
                ...state,
                loading: false,
                mostPurchasedUser: action.payload
            }
        case MOST_LOYAL_FAIL:
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

export const mostProductPurchasedReducer = (state = { mostPurchasedProduct: [] }, action) => {
    switch (action.type) {
        case PRODUCT_SALES_REQUEST:
            return {
                ...state,
                loading: true
            }
        case PRODUCT_SALES_SUCCESS:
            return {
                ...state,
                loading: false,
                mostPurchasedProduct: action.payload
            }
        case PRODUCT_SALES_FAIL:
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

export const mostBrandPurchasedReducer = (state = { mostPurchasedBrand: [] }, action) => {
    switch (action.type) {
        case MOST_BRAND_REQUEST:
            return {
                ...state,
                loading: true
            }
        case MOST_BRAND_SUCCESS:
            return {
                ...state,
                loading: false,
                mostPurchasedBrand: action.payload
            }
        case MOST_BRAND_FAIL:
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

export const mostRatedReducer = (state = { mostRatedMechanics: [] }, action) => {
    switch (action.type) {
        case MOST_RATED_REQUEST:
            return {
                ...state,
                loading: true
            }
        case MOST_RATED_SUCCESS:
            return {
                ...state,
                loading: false,
                mostRatedMechanics: action.payload
            }
        case MOST_RATED_FAIL:
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