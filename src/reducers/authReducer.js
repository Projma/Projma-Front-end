// import {
//     combineReducers
// } from 'redux';
import {
    LOGIN,
    LOGOUT
} from "../actionTypes/actionTypes";

const initialAuthState = {
    isAuthenticated: false,
    user: {},
};

const authReducer = (state = initialAuthState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                isAuthenticated: true,
                    // ...action.payload,
                user: action.payload,
            };

        case LOGOUT:
            return {
                isAuthenticated: false,
                user: {},
                    ...action.payload,
            };

        default:
            return state;
    }
};
export default authReducer;

// const rootReducer = combineReducers({
//     auth: authReducer,
//     theme: themeReducer,
// });
// export default rootReducer;

