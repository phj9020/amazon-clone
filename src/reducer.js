
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
                ...state, basket:[...state.basket, action.payload]
            };
        case REMOVE:
            return{

            };
        default:
            return;
    }
}


export default reducer; 