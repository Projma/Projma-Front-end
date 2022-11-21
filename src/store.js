import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';
// import { configureStore } from "redux";
import authReducer from "./reducers/authReducer.js";
import thunk from "redux-thunk"

const composedEnhancer = compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__? window.__REDUX_DEVTOOLS_EXTENSION__(): f => f)
const store = createStore(authReducer,composedEnhancer);
// const store = createStore(authReducer);
// const store = configureStore(authReducer);

export default store;