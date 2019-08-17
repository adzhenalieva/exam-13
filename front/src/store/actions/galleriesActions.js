import axios from "../../axios-api";
import {NotificationManager} from 'react-notifications';

export const FETCH_GALLERY_SUCCESS = 'FETCH_GALLERY_SUCCESS';
export const FETCH_GALLERY_FAILURE = "FETCH_GALLERY_FAILURE";

export const SEND_GALLERY_SUCCESS = 'SEND_GALLERY_SUCCESS';
export const SEND_GALLERY_FAILURE = "SEND_GALLERY_FAILURE";

export const DELETE_IMAGE_SUCCESS = 'DELETE_IMAGE_SUCCESS';
export const DELETE_IMAGE_FAILURE = "DELETE_IMAGE_FAILURE"; 

export const fetchGalleriesSuccess = data => {
    return {type: FETCH_GALLERY_SUCCESS, data};
};

const fetchGalleriesFailure = error => ({type: FETCH_GALLERY_FAILURE, error});

const sendGallerySuccess = data => ({type: SEND_GALLERY_SUCCESS, data});

const sendGalleryFailure = error => ({type: SEND_GALLERY_FAILURE, error});

const deleteSuccess = data => ({type: DELETE_IMAGE_SUCCESS, data});

const deleteFailure = error => ({type: DELETE_IMAGE_FAILURE, error});

export const fetchGalleries = (id) => {
    return dispatch => {
        return axios.get('/galleries/'+ id).then(
            response => dispatch(fetchGalleriesSuccess(response.data)),
            error => dispatch(fetchGalleriesFailure(error))
        );
    };
};

export const sendGallery = (data) => {
    return dispatch => {
        return axios.post('/galleries', data).then(
            response => {
                dispatch(sendGallerySuccess(response.data));
                NotificationManager.success('Images loaded successfully');
            },
            error => {
                if (error.response && error.response.data) {
                    dispatch(sendGalleryFailure(error.response.data));
                } else {
                    dispatch(sendGalleryFailure({global: 'No connection'}))
                }

            }
        )
    }
};


export const deleteImage = (galleryId, image) => {
    return dispatch => {
        return axios.delete('/galleries/' + galleryId + "?image=" + image).then(
            response => {
                dispatch(deleteSuccess(response.data.result));
                NotificationManager.success(response.data.message);
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