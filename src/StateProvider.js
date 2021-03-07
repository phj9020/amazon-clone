import React, {useContext, useReducer} from 'react';
import reducer, {initialState} from './reducer';

// prepares the dataLayer
export const Context = React.createContext();

// Wrap our app and provide the Data layer
const Provider = ({ children})=> {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <Context.Provider value={{state, dispatch}}>
            {children}
        </Context.Provider>
    )
}

// pull information from the data layer
export const useStateValue = ()=> {
    const {state} = useContext(Context);
    return state;
}


export const useDispatch = ()=> {
    const {dispatch} = useContext(Context);
    return dispatch;
}

export default Provider; 