import { v4 as uuidv4 } from "uuid";
export const ADD = "ADD";
export const REMOVE = "REMOVE";
export const SETUSER = "SETUSER";

export const initialState = {
    basket: [],
    user: null 
};

// Selector 
export const getBasketTotal = (basketPrice) => {
    return basketPrice.reduce((accum, item) => accum + item, 0)
}

const reducer= (state, action) => {
    console.log(action)
    switch(action.type) {
        case ADD:
            return {
                ...state, basket:[...state.basket, {itemList: action.payload, id: uuidv4() }]
            };
        case REMOVE:
            return{
                ...state, basket: state.basket.filter(item => item.id !== action.id)
            };
        case SETUSER :
            return{
                ...state, user: action.user
            }
        default:
            return;
    }
}


export default reducer; 