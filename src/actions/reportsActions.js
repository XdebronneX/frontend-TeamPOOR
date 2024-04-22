import axios from "axios";
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

    CLEAR_ERRORS
} from "../constants/reportsConstants";

export const monthlySalesChart = () => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        }
        dispatch({ type: MONTHLY_SALES_REQUEST })
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/products/sales`, config)
        dispatch({
            type: MONTHLY_SALES_SUCCESS,
            payload: data.monthlySales,
        })
        console.log(data)
    } catch (error) {
        dispatch({
            type: MONHTLY_SALES_FAIL,
            payload: error.response.data.message
        })
    }
}

export const mostLoyalChart = () => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        }
        dispatch({ type: MOST_LOYAL_REQUEST })
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/most/loyal-user`, config)
        dispatch({
            type: MOST_LOYAL_SUCCESS,
            payload: data.mostPurchasedUser,
        })
        console.log(data)
    } catch (error) {
        dispatch({
            type: MOST_LOYAL_FAIL,
            payload: error.response.data.message
        })
    }
}

export const mostProductChart = () => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        }
        dispatch({ type: PRODUCT_SALES_REQUEST })
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/most/purchased-product`, config)
        dispatch({
            type: PRODUCT_SALES_SUCCESS,
            payload: data.mostPurchasedProduct,
        })
        console.log(data)
    } catch (error) {
        dispatch({
            type: PRODUCT_SALES_FAIL,
            payload: error.response.data.message
        })
    }
}

export const mostBrandChart = () => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials:true
        }
        dispatch({ type: MOST_BRAND_REQUEST })
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/most/purchased-brand`, config)
        dispatch({
            type: MOST_BRAND_SUCCESS,
            payload: data.mostPurchasedBrand,
        })
        console.log(data)
    } catch (error) {
        dispatch({
            type: MOST_BRAND_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS

    })
}