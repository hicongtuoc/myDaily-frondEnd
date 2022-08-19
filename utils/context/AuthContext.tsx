import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
    currentUser: null,
}

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children}: any) => {
    const [ state, dispatch ] = useReducer(AuthReducer, INITIAL_STATE);

    console.log(dispatch);
    
    return (
        <AuthContext.Provider value={{currentUser: state.currentUser}}>
            {children}
        </AuthContext.Provider>
    )
}