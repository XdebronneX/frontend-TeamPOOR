import axios from 'axios';
import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,

    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,

    LOGOUT_SUCCESS,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,

    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_RESET,
    UPDATE_PROFILE_FAIL,

    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_RESET,
    UPDATE_PASSWORD_FAIL,

    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,

    NEW_PASSWORD_REQUEST,
    NEW_PASSWORD_SUCCESS,
    NEW_PASSWORD_FAIL,

    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,

    ALL_SUPPLIERS_REQUEST,
    ALL_SUPPLIERS_SUCCESS,
    ALL_SUPPLIERS_FAIL,

    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_RESET,
    UPDATE_USER_FAIL,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,

    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_RESET,
    DELETE_USER_FAIL,

    VERIFY_USER_REQUEST,
    VERIFY_USER_SUCCESS,
    VERIFY_USER_FAIL,

    ALL_NOTIFICATION_REQUEST,
    ALL_NOTIFICATION_SUCCESS,
    ALL_NOTIFICATION_FAIL,

    NOTIFICATION_READ_REQUEST,
    NOTIFICATION_READ_SUCCESS,
    NOTIFICATION_READ_FAIL,


    CLEAR_ERRORS,

} from '../constants/userConstants'

export const verifyUserEmail = (token, id) => async (dispatch) => {
    try {
        dispatch({ type: VERIFY_USER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        };

        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/verify/email/${token}/${id}`, config);

        dispatch({
            type: VERIFY_USER_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: VERIFY_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const Register = (userData) => async (dispatch) => {
    try {
        dispatch({
            type: REGISTER_USER_REQUEST
        })
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        }
        const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/register`, userData, config);

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const LoginUsers = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: LOGIN_REQUEST
        })
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        }
        const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/login`, { email, password }, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user
        });
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}

// Load user profile
export const LoadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: LOAD_USER_REQUEST
        })
        const { data } = await axios.get(`${process.env.REACT_APP_API}api/v1/me`, { withCredentials: true })
        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update information
export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST })
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            withCredentials: true
        }
        const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/me/update`, userData, config)
        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.success,
        })
    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message,
        });
    }
}

// Update password
export const updatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        };

        const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/password/update`, passwords, config);

        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,

            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,

            payload: error.response.data.message,
        });
    }
};

// Forgot password
export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        };

        const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/password/forgot`, email, config);

        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,

            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,

            payload: error.response.data.message,
        });
    }
};

// Reset password
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
        dispatch({ type: NEW_PASSWORD_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        };

        const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/password/reset/${token}`, passwords, config);

        dispatch({
            type: NEW_PASSWORD_SUCCESS,

            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: NEW_PASSWORD_FAIL,

            payload: error.response.data.message,
        });
    }
};

export const viewAllNotif = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_NOTIFICATION_REQUEST })
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/user-notification/unread`, { withCredentials: true });

        dispatch({
            type: ALL_NOTIFICATION_SUCCESS,
            payload: data.unreadNotifications
        })

    } catch (error) {
        dispatch({
            type: ALL_NOTIFICATION_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateNotifs = (id) => async (dispatch) => {
    try {
        dispatch({ type: NOTIFICATION_READ_REQUEST })
        const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/user-notification/${id}`, { withCredentials: true })
        dispatch({
            type: NOTIFICATION_READ_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: NOTIFICATION_READ_FAIL,
            payload: error.response.data.message
        })
    }
}

//View all users by admin
export const viewAllUsers = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_USERS_REQUEST })
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/admin/view/all/users`, { withCredentials: true })

        dispatch({
            type: ALL_USERS_SUCCESS,
            payload: data.users
        })

    } catch (error) {
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const viewAllSuppliers = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_SUPPLIERS_REQUEST })
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/admin/view/all/suppliers`, { withCredentials: true })

        dispatch({
            type: ALL_SUPPLIERS_SUCCESS,
            payload: data.suppliers
        })

    } catch (error) {
        dispatch({
            type: ALL_SUPPLIERS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update user - ADMIN
export const updateUser = (id, userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_USER_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
        const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/admin/users/${id}`, userData, config)
        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

// View user details
export const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST })

        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/admin/users/${id}`, { withCredentials: true })

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data.user

        })

    } catch (error) {

        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete user - ADMIN
export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_USER_REQUEST })
        const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/admin/users/${id}`, { withCredentials: true });
        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response.data.message
        })
    }
}


export const Logout = () => async (dispatch) => {
    try {
        await axios.get(`${process.env.REACT_APP_API}/api/v1/logout`, { withCredentials: true });
        dispatch({
            type: LOGOUT_SUCCESS
        })
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}