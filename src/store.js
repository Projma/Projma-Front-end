// import { createStore } from "redux";
import { configureStore } from "redux";
import { cartReducer } from "./reducers/cartReducer";

// const store = createStore(cartReducer);
const store = configureStore(cartReducer);

export default store;