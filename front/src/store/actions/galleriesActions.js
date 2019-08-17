import axios from "../../axios-api";
import {push} from "connected-react-router";
import {NotificationManager} from 'react-notifications';

export const FETCH_GALLERY_SUCCESS = 'FETCH_GALLERY_SUCCESS';
export const FETCH_GALLERY_FAILURE = "FETCH_GALLERY_FAILURE";

export const SEND_GALLERY_SUCCESS = 'SEND_GALLERY_SUCCESS';
export const SEND_GALLERY_FAILURE = "SEND_GALLERY_FAILURE";


export const fetchGalleriesSuccess = data => {
    return {type: FETCH_GALLERY_SUCCESS, data};
};

const fetchGalleriesFailure = error => ({type: FETCH_GALLERY_FAILURE, error});

const sendGallerySuccess = () => ({type: SEND_GALLERY_SUCCESS});

const sendGalleryFailure = error => ({type: SEND_GALLERY_FAILURE, error});


export const fetchGalleries = (id) => {
    return dispatch => {
        return axios.get('/galleries/'+ id).then(
            response => dispatch(fetchGalleriesSuccess(response.data)),
            error => dispatch(fetchGalleriesFailure(error))
        );
    };
};

export const sendGallery = data => {
    return dispatch => {
        return axios.post('/galleries', data).then(
            (result) => {
                dispatch(sendGallerySuccess());
                console.log(result.data);
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
