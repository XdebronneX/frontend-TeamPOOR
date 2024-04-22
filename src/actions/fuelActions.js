import axios from "axios";
import {
    CREATE_FUEL_REQUEST,
    CREATE_FUEL_SUCCESS,
    CREATE_FUEL_FAIL,
    CREATE_FUEL_RESET,

    MY_FUEL_REQUEST,
    MY_FUEL_SUCCESS,
    MY_FUEL_FAIL,

    ALL_FUEL_REQUEST,
    ALL_FUEL_SUCCESS,
    ALL_FUEL_FAIL,

    FUEL_DETAILS_REQUEST,
    FUEL_DETAILS_SUCCESS,
    FUEL_DETAILS_FAIL,

    UPDATE_FUEL_REQUEST,
    UPDATE_FUEL_SUCCESS,
    UPDATE_FUEL_FAIL,
    UPDATE_FUEL_RESET,

    DELETE_FUEL_REQUEST,
    DELETE_FUEL_SUCCESS,
    DELETE_FUEL_FAIL,
    DELETE_FUEL_RESET,

    CLEAR_ERRORS

} from "../constants/fuelConstants";

export const createFuel = (fuelData) => async (dispatch) => {
    try {
        dispatch({
            type: CREATE_FUEL_REQUEST})
        const config = {
            headers: {
                "Content-Type": 'application/json',
            },
            withCredentials:true
        }
        const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/add-fuel`, fuelData, config)

        dispatch({
            type: CREATE_FUEL_SUCCESS,
            payload: data.fuel
        })
    } catch (error) {
        dispatch({
            type: CREATE_FUEL_FAIL,
            payload: error.response.data.message
        })
    }
}

export const myFuel = () => async (dispatch) => {
    try {
        dispatch({ type: MY_FUEL_REQUEST });
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/list-fuel`, {withCredentials:true});
        dispatch({
            type: MY_FUEL_SUCCESS,
            payload: data.userFuel,
        });
    } catch (error) {
        dispatch({
            type: MY_FUEL_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const updateFuel = (id, fuelData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_FUEL_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials:true
        }
        const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/user/fuel/${id}`, fuelData, config)
        dispatch({
            type: UPDATE_FUEL_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_FUEL_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getFuelDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: FUEL_DETAILS_REQUEST })

        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/user/fuel/${id}`, {withCredentials:true})

        dispatch({
            type: FUEL_DETAILS_SUCCESS,
            payload: data.userFuel

        })

    } catch (error) {

        dispatch({
            type: FUEL_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteFuel = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_FUEL_REQUEST })
        const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/user/fuel/${id}`, {withCredentials:true})
        dispatch({
            type: DELETE_FUEL_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: DELETE_FUEL_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async dispatch => {
    dispatch({
        type: CLEAR_ERRORS
    })
}