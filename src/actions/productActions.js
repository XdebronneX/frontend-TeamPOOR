import axios from "axios";
import {
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_RESET,

    GET_REVIEWS_REQUEST,
    GET_REVIEWS_SUCCESS,
    GET_REVIEWS_FAIL,

    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    DELETE_REVIEW_RESET,

    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,

    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    ADMIN_PRODUCTS_FAIL,

    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_RESET,
    NEW_PRODUCT_FAIL,

    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_RESET,
    DELETE_PRODUCT_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_RESET,
    UPDATE_PRODUCT_FAIL,

    CLEAR_ERRORS
} from "../constants/productConstants";

import {
    STOCK_HISTORY_REQUEST,
    STOCK_HISTORY_SUCCESS,
    STOCK_HISTORY_FAIL,
} from "../constants/stockLogsConstants";

import {
    PRICE_HISTORY_REQUEST,
    PRICE_HISTORY_SUCCESS,
    PRICE_HISTORY_FAIL
} from "../constants/priceLogsConstants";

import {
    SUPPLIER_HISTORY_REQUEST,
    SUPPLIER_HISTORY_SUCCESS,
    SUPPLIER_HISTORY_FAIL,
    SUPPLIER_HISTORY_RESET,

    SUPPLIED_DETAILS_REQUEST,
    SUPPLIED_DETAILS_SUCCESS,
    SUPPLIED_DETAILS_FAIL,
} from "../constants/supplierLogsConstants";

import {
    ALL_SUPPLIERS_REQUEST,
    ALL_SUPPLIERS_SUCCESS,
    ALL_SUPPLIERS_FAIL
} from "../constants/userConstants";

export const getAllProducts = (keyword = "", price, category) => async (dispatch) => {
    try {
        dispatch({
            type: ALL_PRODUCTS_REQUEST,
            ADMIN_PRODUCTS_REQUEST,
        })
        let link = `${process.env.REACT_APP_API}/api/v1/showAllProducts?keyword=${keyword}`
        if (category) {
            link = `${process.env.REACT_APP_API}/api/v1/showAllProducts?keyword=${keyword}&category=${category}`
        }
        const { data } = await axios.get(link);

        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data.message,
        })
    }
}

export const getAdminProducts = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_PRODUCTS_REQUEST });

        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/view/all/products`, {withCredentials: true});

        dispatch({
            type: ADMIN_PRODUCTS_SUCCESS,
            payload: data.products,
        });
    } catch (error) {
        dispatch({
            type: ADMIN_PRODUCTS_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const newProduct = (productData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_PRODUCT_REQUEST })
        const config = {
            headers: {

                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        }
        const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/add/product/new`, productData, config)

        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data

        })

    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
};

export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_PRODUCT_REQUEST })
        const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/admin/product/${id}`, {withCredentials:true})
        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/showSingleProduct/${id}`, {withCredentials:true})

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product

        })

    } catch (error) {

        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateProduct = (id, productData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PRODUCT_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials:true
        }
        const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/admin/product/${id}`, productData, config)
        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
};

export const updateStock = (id, productData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PRODUCT_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
        const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/admin/stock/${id}`, productData, config)
        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
};

export const getStockLogs = () => async (dispatch) => {
    try {
        dispatch({ type: STOCK_HISTORY_REQUEST });

        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/admin/stock/history/logs`, {withCredentials:true});

        dispatch({
            type: STOCK_HISTORY_SUCCESS,
            payload: data.stockLogs,
        });
    } catch (error) {
        dispatch({
            type: STOCK_HISTORY_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const getPriceLogs = () => async (dispatch) => {
    try {
        dispatch({ type: PRICE_HISTORY_REQUEST });

        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/admin/price/history/logs`, {withCredentials:true});

        dispatch({
            type: PRICE_HISTORY_SUCCESS,
            payload: data.priceHistoryLog,
        });
    } catch (error) {
        dispatch({
            type: PRICE_HISTORY_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const supplierlogHistory = (supLogData) => async (dispatch) => {
    try {
        dispatch({
            type: SUPPLIER_HISTORY_REQUEST
        })
        const config = {
            headers: {
                "Content-Type": 'application/json',
            },
            withCredentials: true
        }
        const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/admin/supplier/history/logs`, supLogData, config)

        dispatch({
            type: SUPPLIER_HISTORY_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: SUPPLIER_HISTORY_FAIL,
            payload: error.response.data.message
        })
    }
};

export const getSuppliedLogs = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_SUPPLIERS_REQUEST });

        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/admin/supplied/product/history`, {withCredentials:true});

        dispatch({
            type: ALL_SUPPLIERS_SUCCESS,
            payload: data.suppliedHistoryLog,
        });
    } catch (error) {
        dispatch({
            type: ALL_SUPPLIERS_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const getSuppliedDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: SUPPLIED_DETAILS_REQUEST });

        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/admin/single/supplied/${id}`, {withCredentials:true});

        dispatch({
            type: SUPPLIED_DETAILS_SUCCESS,

            payload: data.supplied,
        });
    } catch (error) {
        dispatch({
            type: SUPPLIED_DETAILS_FAIL,

            payload: error.response.data.message,
        });
    }
}

export const newReview = (reviewData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_REVIEW_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        };

        const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/review`, reviewData, config);

        dispatch({
            type: NEW_REVIEW_SUCCESS,

            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,

            payload: error.response.data.message,
        });
    }
};

export const getProductReviews = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_REVIEWS_REQUEST });
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/reviews?id=${id}`, {withCredentials:true});
        dispatch({
            type: GET_REVIEWS_SUCCESS,
            payload: data.reviews
        });
    } catch (error) {
        dispatch({
            type: GET_REVIEWS_FAIL,
            payload: (error.response && error.response.data && error.response.data.message) || 'Error fetching reviews'
        });
    }
};

export const deleteReview = (id, productId) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_REVIEW_REQUEST })
        const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/reviews?id=${id}&productId=${productId}`, {withCredentials:true})
        dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {

        console.log(error.response);
        dispatch({
            type: DELETE_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};