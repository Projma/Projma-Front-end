// import {
//     combineReducers
// } from 'redux';
import {
    LOGIN,
    LOGOUT
} from "../actionTypes/actionTypes.js";

const initialAuthState = {
    isAuthenticated: false,
};

const authReducer = (state = initialAuthState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                isAuthenticated: true,
                    ...action.payload,
            };

        case LOGOUT:
            return initialAuthState;

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

