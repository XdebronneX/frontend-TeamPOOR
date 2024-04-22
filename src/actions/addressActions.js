import axios from "axios";
import {
    CREATE_ADDRESSES_REQUEST,
    CREATE_ADDRESSES_SUCCESS,
    CREATE_ADDRESSES_FAIL,
    CREATE_ADDRESSES_RESET,

    MY_ADDRESSES_REQUEST,
    MY_ADDRESSES_SUCCESS,
    MY_ADDRESSES_FAIL,

    UPDATE_ADDRESSES_REQUEST,
    UPDATE_ADDRESSES_SUCCESS,
    UPDATE_ADDRESSES_FAIL,
    UPDATE_ADDRESSES_RESET,

    DELETE_ADDRESSES_REQUEST,
    DELETE_ADDRESSES_SUCCESS,
    DELETE_ADDRESSES_FAIL,
    DELETE_ADDRESSES_RESET,


    ADDRESS_DETAILS_REQUEST,
    ADDRESS_DETAILS_SUCCESS,
    ADDRESS_DETAILS_FAIL,


    CLEAR_ERRORS
} from '../constants/addressConstants';

export const createAddresses = (addressesData) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_ADDRESSES_REQUEST })
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials:true
        }
        const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/create/my-address`, addressesData, config)

        dispatch({
            type: CREATE_ADDRESSES_SUCCESS,
            payload: data.addresses
        })

    } catch (error) {
        dispatch({
            type: CREATE_ADDRESSES_FAIL,
            payload: error.response.data.message
        })
    }
}

export const myAddresses = () => async (dispatch) => {
    try {
        dispatch({ type: MY_ADDRESSES_REQUEST });
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/my-addresses`, {withCredentials:true});
        dispatch({
            type: MY_ADDRESSES_SUCCESS,
            payload: data.userAddresses,
        });
    } catch (error) {
        dispatch({
            type: MY_ADDRESSES_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const updateAddresses = (id, addressesData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_ADDRESSES_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials:true
        }
        const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/my-address/${id}`, addressesData, config)
        dispatch({
            type: UPDATE_ADDRESSES_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_ADDRESSES_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateDefaultAddresses = (id, addressesData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_ADDRESSES_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials:true
        }
        const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/default/${id}`, addressesData, config)
        dispatch({
            type: UPDATE_ADDRESSES_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_ADDRESSES_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getAddressDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: ADDRESS_DETAILS_REQUEST })

        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/my-address/${id}`, {withCredentials:true})

        dispatch({
            type: ADDRESS_DETAILS_SUCCESS,
            payload: data.addresses

        })

    } catch (error) {

        dispatch({
            type: ADDRESS_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteAddresses = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_ADDRESSES_REQUEST })
        const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/my-address/${id}`, {withCredentials:true})
        dispatch({
            type: DELETE_ADDRESSES_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: DELETE_ADDRESSES_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async dispatch => {
    dispatch({
        type: CLEAR_ERRORS
    })
}