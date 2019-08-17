import {createBrowserHistory} from "history";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {connectRouter, routerMiddleware} from "connected-react-router";
import thunkMiddleware from "redux-thunk";

import axios from '../axios-api';
import usersReducer from "./reducers/usersReducer";
import placeReducer from "./reducers/placeReducer";
import galleryReducer from "./reducers/galleriesReducer";
import {loadFromLocalStorage, saveToLocalStorage} from "./LocalStorage";

export const history = createBrowserHistory();



const rootReducer = combineReducers({
    users: usersReducer,
    places: placeReducer,
    galleries: galleryReducer,
    router: connectRouter(history)
});

const middleware = [
    thunkMiddleware,
    routerMiddleware(history)
];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancers = composeEnhancers(applyMiddleware(...middleware));
const persistedState = loadFromLocalStorage();

const store = createStore(rootReducer, persistedState, enhancers);

store.subscribe(() => {
    saveToLocalStorage({
        users: {
            user: store.getState().users.user
        }

    })
});

axios.interceptors.request.use(config => {
    try {
        config.headers['Authorization'] = store.getState().users.user.token;
    } catch (e) {
        //
    }
    return config;
});


export default store;