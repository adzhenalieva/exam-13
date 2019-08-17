import axios from "../../axios-api";
import {push} from "connected-react-router";
import {NotificationManager} from 'react-notifications';

export const FETCH_PLACE_SUCCESS = 'FETCH_PLACE_SUCCESS';
export const FETCH_PLACE_FAILURE = "FETCH_PLACE_FAILURE";

export const FETCH_PLACE_BY_ID_SUCCESS = "FETCH_PLACE_BY_ID_SUCCESS";

export const SEND_PLACE_SUCCESS = 'SEND_PLACE_SUCCESS';
export const SEND_PLACE_FAILURE = "SEND_PLACE_FAILURE";

export const DELETE_SUCCESS = 'DELETE_SUCCESS';
export const DELETE_FAILURE = "DELETE_FAILURE";

export const fetchPlacesSuccess = data => {
    return {type: FETCH_PLACE_SUCCESS, data};
};
export const fetchPlaceByIdSuccess = data => {
    return {type: FETCH_PLACE_BY_ID_SUCCESS, data};
};
const fetchPlaceFailure = error => ({type: FETCH_PLACE_FAILURE, error});

const sendPlaceSuccess = () => ({type: SEND_PLACE_SUCCESS});

const sendPlaceFailure = error => ({type: SEND_PLACE_FAILURE, error});

const deleteSuccess = () => ({type: DELETE_SUCCESS});

const deleteFailure = error => ({type: DELETE_FAILURE, error});

export const fetchPlaces = () => {
    return dispatch => {
        return axios.get('/places').then(
            response => dispatch(fetchPlacesSuccess(response.data)),
            error => dispatch(fetchPlaceFailure(error))
        );
    };
};

export const fetchPlaceById = id => {
    return dispatch => {
     return axios.get('/places/' + id).then(
            response => dispatch(fetchPlaceByIdSuccess(response.data)),
            error => dispatch(fetchPlaceFailure(error))
        );
    };
};

export const sendPlace = data => {
    return dispatch => {
        return axios.post('/places', data).then(
            () => {
                dispatch(sendPlaceSuccess());
                NotificationManager.success('Created successfully');
                dispatch(push('/'));
            },
            error => {
                if (error.response && error.response.data) {
                    dispatch(sendPlaceFailure(error.response.data));
                } else {
                    dispatch(sendPlaceFailure({global: 'No connection'}))
                }

            }
        )
    }
};

export const deletePlace = (id) => {
    return dispatch => {
        return axios.delete('/places/' + id).then(
            () => {
                dispatch(deleteSuccess());
                NotificationManager.success('Deleted successfully');
                dispatch(fetchPlaces());
            },
            error => {
                if (error.response && error.response.data) {
                    dispatch(deleteFailure(error.response.data));
                } else {
                    dispatch(deleteFailure({global: 'No connection'}))
                }

            }
        )
    }
};

export const sendFeedbackPlace = (data, id) => {
    return dispatch => {
        return axios.put('/places/' + id, data).then(
            () => {
                dispatch(sendPlaceSuccess());
                NotificationManager.success("Success! Thank you for your feedback");
                dispatch(fetchPlaceById(id));
            },
            error => {
                if (error.response && error.response.data) {
                    dispatch(sendPlaceFailure(error.response.data));
                    NotificationManager.error(error.response.data);
                } else {
                    dispatch(sendPlaceFailure({global: 'No connection'}))
                }

            }
        )
    }
};

export const deleteFeedback = (recipeId, feedbackId) => {
    return dispatch => {
        return axios.delete('/places/feedback/' + recipeId + "?id=" + feedbackId).then(
            response => {
                dispatch(deleteSuccess());
                NotificationManager.success(response.data.message);
                dispatch(fetchPlaceById(recipeId));
            },
            error => {
                if (error.response && error.response.data) {
                    dispatch(deleteFailure(error.response.data));
                } else {
                    dispatch(deleteFailure({global: 'No connection'}))
                }

            }
        )
    }
};