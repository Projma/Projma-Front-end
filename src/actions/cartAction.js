import {
    ADD_ITEM,
    DELETE_ITEM
} from "../actionTypes/actionTypes";

const addItem = () => {
    return {
        type: ADD_ITEM,
        // any additional data passed with the action object is optional and will depend 
        // on the logic used for updating the state
    };
};

const deleteItem = () => {
    return {
        type: DELETE_ITEM,
    };
};

export {
    addItem,
    deleteItem
};