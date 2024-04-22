import axios from 'axios';
import {
    CREATE_BRANDS_REQUEST,
    CREATE_BRANDS_SUCCESS,
    CREATE_BRANDS_FAIL,
    CREATE_BRANDS_RESET,

    ALL_BRANDS_REQUEST,
    ALL_BRANDS_SUCCESS,
    ALL_BRANDS_FAIL,

    BRAND_DETAILS_REQUEST,
    BRAND_DETAILS_SUCCESS,
    BRAND_DETAILS_FAIL,

    UPDATE_BRANDS_REQUEST,
    UPDATE_BRANDS_SUCCESS,
    UPDATE_BRANDS_FAIL,
    UPDATE_BRANDS_RESET,

    DELETE_BRANDS_REQUEST,
    DELETE_BRANDS_SUCCESS,
    DELETE_BRANDS_FAIL,
    DELETE_BRANDS_RESET,

    CLEAR_ERRORS
} from "../constants/brandConstants"

export const viewAllBrands = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_BRANDS_REQUEST });
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/admin/view/all/brands`, {withCredentials:true});

        dispatch({
            type: ALL_BRANDS_SUCCESS,
            payload: data.brands
        });
    } catch (error) {
        dispatch({
            type: ALL_BRANDS_FAIL,
            payload: error.response.data.message
        });
    }
};

export const createBrands = (brandData) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_BRANDS_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials:true
        }
        const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/add/brand/new`, brandData, config)
        dispatch({
            type: CREATE_BRANDS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CREATE_BRANDS_FAIL,
            payload: error.response.data.message
        })
    }
};

export const getBrandDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: BRAND_DETAILS_REQUEST })

        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/admin/brands/${id}`, {withCredentials:true})

        dispatch({
            type: BRAND_DETAILS_SUCCESS,
            payload: data.brand

        })

    } catch (error) {

        dispatch({
            type: BRAND_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateBrand = (id, brandData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_BRANDS_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials:true
        }
        const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/admin/brands/${id}`, brandData, config)
        dispatch({
            type: UPDATE_BRANDS_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_BRANDS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteBrand = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_BRANDS_REQUEST })
        const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/admin/brands/${id}`, {withCredentials:true})
        dispatch({
            type: DELETE_BRANDS_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: DELETE_BRANDS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async dispatch => {
    dispatch({
        type: CLEAR_ERRORS
    })
}