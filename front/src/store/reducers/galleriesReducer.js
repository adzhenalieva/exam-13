import {
    FETCH_GALLERY_FAILURE,
    FETCH_GALLERY_SUCCESS,
    SEND_GALLERY_FAILURE,
    SEND_GALLERY_SUCCESS
} from "../actions/galleriesActions";


const initialState = {
    galleries: [],
    error: null
};

const placeReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_GALLERY_SUCCESS:
            return {
                ...state,
                galleries: action.data,
                error: null
            };
        case SEND_GALLERY_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case SEND_GALLERY_SUCCESS:
            return {
                ...state,
                error: null,
            };
        case FETCH_GALLERY_FAILURE:
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
};
export default placeReducer;