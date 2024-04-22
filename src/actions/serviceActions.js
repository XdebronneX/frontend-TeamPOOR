import axios from "axios";
import {
    NEW_SERVICE_REQUEST,
    NEW_SERVICE_SUCCESS,
    NEW_SERVICE_FAIL,
    NEW_SERVICE_RESET,

    ALL_SERVICES_REQUEST,
    ALL_SERVICES_SUCCESS,
    ALL_SERVICES_FAIL,

    SERVICE_DETAILS_REQUEST,
    SERVICE_DETAILS_SUCCESS,
    SERVICE_DETAILS_FAIL,

    ADMIN_SERVICES_REQUEST,
    ADMIN_SERVICES_SUCCESS,
    ADMIN_SERVICES_FAIL,

    UPDATE_SERVICE_REQUEST,
    UPDATE_SERVICE_SUCCESS,
    UPDATE_SERVICE_FAIL,
    UPDATE_SERVICE_RESET,

    DELETE_SERVICE_REQUEST,
    DELETE_SERVICE_SUCCESS,
    DELETE_SERVICE_FAIL,
    DELETE_SERVICE_RESET,

    CLEAR_ERRORS

} from "../constants/serviceConstants";


export const getAllServices = () => async (dispatch) => {
    try {
        dispatch({
            type: ALL_SERVICES_REQUEST
        })
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/showAllServices`, {withCredentials: true})
        dispatch({
            type: ALL_SERVICES_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: ALL_SERVICES_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getAdminServices = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_SERVICES_REQUEST });

        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/admin/view/all/services`, {withCredentials:true});

        dispatch({
            type: ADMIN_SERVICES_SUCCESS,
            payload: data.services,
        });
    } catch (error) {
        dispatch({
            type: ADMIN_SERVICES_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const deleteService = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_SERVICE_REQUEST })
        const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/admin/service/${id}`, {withCredentials:true})
        dispatch({
            type: DELETE_SERVICE_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: DELETE_SERVICE_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getServiceDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: SERVICE_DETAILS_REQUEST })

        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/showSingleService/${id}`, {withCredentials:true})

        dispatch({
            type: SERVICE_DETAILS_SUCCESS,
            payload: data.service

        })

    } catch (error) {

        dispatch({
            type: SERVICE_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateService = (id, serviceData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_SERVICE_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
        const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/admin/service/${id}`, serviceData, config)
        dispatch({
            type: UPDATE_SERVICE_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_SERVICE_FAIL,
            payload: error.response.data.message
        })
    }
};

export const newService = (serviceData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_SERVICE_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        }
        const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/add-service`, serviceData, config)

        dispatch({
            type: NEW_SERVICE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_SERVICE_FAIL,
            payload: error.response.data.message
        })
    }
};

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};