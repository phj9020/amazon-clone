import { v4 as uuidv4 } from "uuid";
export const ADD = "ADD";
export const REMOVE = "REMOVE";

export const initialState = {
    basket: [],
};

const reducer= (state, action) => {
    console.log(action)
    switch(action.type) {
        case ADD:
            return {
                ...state, basket:[...state.basket, {itemList: action.payload, id: uuidv4() }]
            };
        case REMOVE:
            return{
                ...state, basket: state.basket.filter(item => item.id !== action.payload)
            };
        default:
            return;
    }
}


export default reducer; 