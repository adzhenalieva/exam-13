import {
    FETCH_PLACE_BY_ID_SUCCESS, FETCH_PLACE_FAILURE,
    FETCH_PLACE_SUCCESS,
    SEND_PLACE_FAILURE,
    SEND_PLACE_SUCCESS
} from "../actions/placeActions";


const initialState = {
    places: [],
    placeById: null,
    error: null
};

const placeReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PLACE_SUCCESS:
            return {
                ...state,
                places: action.data,
                error: null
            };
        case FETCH_PLACE_BY_ID_SUCCESS:
            return {
                ...state,
                placeById: action.data
            };
        case SEND_PLACE_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case SEND_PLACE_SUCCESS:
            return {
                ...state,
                error: null,
            };
        case FETCH_PLACE_FAILURE:
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
};
export default placeReducer;