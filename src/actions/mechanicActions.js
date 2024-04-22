import axios from "axios"
import {
    MY_TASKS_REQUEST,
    MY_TASKS_SUCCESS,
    MY_TASKS_FAIL,

    ALL_REVIEWS_MECHANIC_REQUEST,
    ALL_REVIEWS_MECHANIC_SUCCESS,
    ALL_REVIEWS_MECHANIC_FAIL,

    NEW_MECHANIC_REVIEW_REQUEST,
    NEW_MECHANIC_REVIEW_SUCCESS,
    NEW_MECHANIC_REVIEW_RESET,
    NEW_MECHANIC_REVIEW_FAIL,

    CLEAR_ERRORS,

} from "../constants/mechanicConstants";

export const myAssignTasks = () => async dispatch => {
    try {
        dispatch({ type: MY_TASKS_REQUEST })

        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/mechanics/task`, {withCredentials:true})

        dispatch({
            type: MY_TASKS_SUCCESS,

            payload: data.taskAssigned
        })
    } catch (error) {
        dispatch({
            type: MY_TASKS_FAIL,

            payload: error.response.data.message
        })
    }
}

export const newReviewMechanic = (id, reviewData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_MECHANIC_REVIEW_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials:true
        };

        const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/review/mechanic/${id}`, reviewData, config);

        dispatch({
            type: NEW_MECHANIC_REVIEW_SUCCESS,

            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: NEW_MECHANIC_REVIEW_FAIL,

            payload: error.response.data.message,
        });
    }
};

export const viewAllReviewsMechanic = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_REVIEWS_MECHANIC_REQUEST });
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/admin/mechanic/list-reviews`, {withCredentials:true});

        dispatch({
            type: ALL_REVIEWS_MECHANIC_SUCCESS,
            payload: data.feedbacks
        });
    } catch (error) {
        dispatch({
            type: ALL_REVIEWS_MECHANIC_FAIL,
            payload: error.response.data.message
        });
    }
};

export const clearErrors = () => async dispatch => {
    dispatch({
        type: CLEAR_ERRORS
    })
}