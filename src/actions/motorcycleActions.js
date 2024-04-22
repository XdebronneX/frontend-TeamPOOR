import axios from "axios";
import {
    CREATE_MOTORCYCLES_REQUEST,
    CREATE_MOTORCYCLES_SUCCESS,
    CREATE_MOTORCYCLES_FAIL,

    MY_MOTORCYCLES_REQUEST,
    MY_MOTORCYCLES_SUCCESS,
    MY_MOTORCYCLES_FAIL,

    ALL_MOTORCYCLES_REQUEST,
    ALL_MOTORCYCLES_SUCCESS,
    ALL_MOTORCYCLES_FAIL,

    MOTORCYCLE_DETAILS_REQUEST,
    MOTORCYCLE_DETAILS_SUCCESS,
    MOTORCYCLE_DETAILS_FAIL,

    UPDATE_MOTORCYCLES_REQUEST,
    UPDATE_MOTORCYCLES_SUCCESS,
    UPDATE_MOTORCYCLES_FAIL,
    UPDATE_MOTORCYCLES_RESET,

    DELETE_MOTORCYCLES_REQUEST,
    DELETE_MOTORCYCLES_SUCCESS,
    DELETE_MOTORCYCLES_FAIL,
    DELETE_MOTORCYCLES_RESET,

    CLEAR_ERRORS
} from "../constants/motorcycleConstants";

export const createMotorcycle = (motorcycleData) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_MOTORCYCLES_REQUEST })
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            withCredentials:true
        }
        const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/create/motorcycle/new`, motorcycleData, config)

        dispatch({
            type: CREATE_MOTORCYCLES_SUCCESS,
            payload: data.motorcycle
        })
    } catch (error) {
        dispatch({
            type: CREATE_MOTORCYCLES_FAIL,
            payload: error.response.data.message
        })
    }
}

export const myMotorcycle = () => async (dispatch) => {
    try {
        dispatch({ type: MY_MOTORCYCLES_REQUEST });
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/list-motorcycle`, {withCredentials:true});
        dispatch({
            type: MY_MOTORCYCLES_SUCCESS,
            payload: data.userMotorcycles,
        });
    } catch (error) {
        dispatch({
            type: MY_MOTORCYCLES_FAIL,
            payload: error.response.data.message,
        });
    }
};

//View all motorcycles by admin
export const viewAllMotorcycles = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_MOTORCYCLES_REQUEST })
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/admin/view/all/motorcycles`, {withCredentials:true})

        dispatch({
            type: ALL_MOTORCYCLES_SUCCESS,
            payload: data.motorcycles,
        })

    } catch (error) {
        dispatch({
            type: ALL_MOTORCYCLES_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update motorcycle - ADMIN
export const updateMotorcycle = (id, motorcycleData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_MOTORCYCLES_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials:true
        }
        const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/admin/motorcycle/${id}`, motorcycleData, config)
        dispatch({
            type: UPDATE_MOTORCYCLES_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_MOTORCYCLES_FAIL,
            payload: error.response.data.message
        })
    }
}

// View motorcycle details
export const getMotorcycleDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: MOTORCYCLE_DETAILS_REQUEST })

        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/admin/motorcycle/${id}`, {withCredentials:true})

        dispatch({
            type: MOTORCYCLE_DETAILS_SUCCESS,
            payload: data.motorcycle

        })

    } catch (error) {

        dispatch({
            type: MOTORCYCLE_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete motorcycle - ADMIN
export const deleteMotorcycle = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_MOTORCYCLES_REQUEST })
        const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/admin/motorcycle/${id}`, {withCredentials:true})
        dispatch({
            type: DELETE_MOTORCYCLES_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: DELETE_MOTORCYCLES_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async dispatch => {
    dispatch({
        type: CLEAR_ERRORS
    })
}