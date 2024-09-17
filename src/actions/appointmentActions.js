import axios from "axios";
import {
    CREATE_APPOINTMENT_REQUEST,
    CREATE_APPOINTMENT_SUCCESS,
    CREATE_APPOINTMENT_FAIL,

    MY_APPOINTMENTS_REQUEST,
    MY_APPOINTMENTS_SUCCESS,
    MY_APPOINTMENTS_FAIL,

    APPOINTMENT_DETAILS_REQUEST,
    APPOINTMENT_DETAILS_SUCCESS,
    APPOINTMENT_DETAILS_FAIL,

    ALL_APPOINTMENTS_REQUEST,
    ALL_APPOINTMENTS_SUCCESS,
    ALL_APPOINTMENTS_FAIL,

    UPDATE_APPOINTMENT_REQUEST,
    UPDATE_APPOINTMENT_SUCCESS,
    UPDATE_APPOINTMENT_RESET,
    UPDATE_APPOINTMENT_FAIL,

    DELETE_APPOINTMENT_REQUEST,
    DELETE_APPOINTMENT_SUCCESS,
    DELETE_APPOINTMENT_RESET,
    DELETE_APPOINTMENT_FAIL, 
    CLEAR_ERRORS
} from "../constants/appointmentConstants";
import { ALL_USERS_REQUEST, ALL_USERS_SUCCESS, ALL_USERS_FAIL } from "../constants/userConstants";

export const createAppointment = appointment => async (dispatch, getState) => {
    try {
        dispatch({ type: CREATE_APPOINTMENT_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials:true
        }
        const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/appointment/new`, appointment, config)

        dispatch({
            type: CREATE_APPOINTMENT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CREATE_APPOINTMENT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const myAppointments = () => async dispatch => {
    try {
        dispatch({ type: MY_APPOINTMENTS_REQUEST })

        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/appointment/list`, {withCredentials:true})

        dispatch({
            type: MY_APPOINTMENTS_SUCCESS,

            payload: data.bookings
        })
    } catch (error) {
        dispatch({
            type: MY_APPOINTMENTS_FAIL,

            payload: error.response.data.message
        })
    }
}

export const getAppointDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: APPOINTMENT_DETAILS_REQUEST });

        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/appointment/${id}`, {withCredentials:true});

        dispatch({
            type: APPOINTMENT_DETAILS_SUCCESS,

            payload: data.booking,
        });
    } catch (error) {
        dispatch({
            type: APPOINTMENT_DETAILS_FAIL,

            payload: error.response.data.message,
        });
    }
}

//** Secretary */
export const allSecAppointments = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_APPOINTMENTS_REQUEST });

        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/secretary/appointment/list`, {withCredentials:true})

        dispatch({
            type: ALL_APPOINTMENTS_SUCCESS,
            payload: data
        })
    } catch (error) {

        dispatch({
            type: ALL_APPOINTMENTS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateBysecretary = (id, bookingData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_APPOINTMENT_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials:true
        }

        const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/secretary/appointment/${id}`, bookingData, config)

        dispatch({
            type: UPDATE_APPOINTMENT_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_APPOINTMENT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateAdditional=  (id, bookingData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_APPOINTMENT_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials:true
        }

        const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/parts/additional/${id}`, bookingData, config)

        dispatch({
            type: UPDATE_APPOINTMENT_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_APPOINTMENT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateAdditionalServices = (id, bookingData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_APPOINTMENT_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }

        const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/services/additional/${id}`, bookingData, config)

        dispatch({
            type: UPDATE_APPOINTMENT_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_APPOINTMENT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const assignMechBySec = (id, bookingData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_APPOINTMENT_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials:true
        }

        const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/secretary/assign/mechanic/${id}`, bookingData, config)

        dispatch({
            type: UPDATE_APPOINTMENT_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_APPOINTMENT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const allAppointments = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_APPOINTMENTS_REQUEST });

        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/admin/appointment/list`, {withCredentials:true})

        dispatch({
            type: ALL_APPOINTMENTS_SUCCESS,
            payload: data
        })
    } catch (error) {

        dispatch({
            type: ALL_APPOINTMENTS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteBooking = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_APPOINTMENT_REQUEST })
        const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/admin/appointment/${id}`, {withCredentials:true})

        dispatch({
            type: DELETE_APPOINTMENT_SUCCESS,
            payload: data.success

        })
    } catch (error) {
        dispatch({
            type: DELETE_APPOINTMENT_RESET,
            payload: error.response.data.message
        })
    }
}

export const deleteAddedServices = (appointmentId, serviceId) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_APPOINTMENT_REQUEST })
        const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/appointment/${appointmentId}/services/${serviceId}`, { withCredentials: true })

        dispatch({
            type: DELETE_APPOINTMENT_SUCCESS,
            payload: { serviceId, success: data.success }
        })
    } catch (error) {
        dispatch({
            type: DELETE_APPOINTMENT_RESET,
            payload: error.response.data.message
        })
    }
}


export const updateBooking = (id, bookingData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_APPOINTMENT_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials:true
        }

        const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/admin/appointment/${id}`, bookingData, config)

        dispatch({
            type: UPDATE_APPOINTMENT_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_APPOINTMENT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const backjobBooking = (id, bookingData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_APPOINTMENT_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials:true
        }

        const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/backjob/appointment/${id}`, bookingData, config)

        dispatch({
            type: UPDATE_APPOINTMENT_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_APPOINTMENT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const reschedBooking = (id, bookingData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_APPOINTMENT_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
        const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/backjob/reschedule/appointment/${id}`, bookingData, config)
        dispatch({
            type: UPDATE_APPOINTMENT_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_APPOINTMENT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const assignMech = (id, bookingData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_APPOINTMENT_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }

        const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/admin/assign/mechanic/${id}`, bookingData, config)

        dispatch({
            type: UPDATE_APPOINTMENT_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_APPOINTMENT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const viewAllMechanics = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_USERS_REQUEST })
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/all-mechanics`, {withCredentials:true})

        dispatch({
            type: ALL_USERS_SUCCESS,
            payload: data.mechanics
        })

    } catch (error) {
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};