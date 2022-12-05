import { createContext, useReducer } from "react";
import Reducer from "./reducer";

const INITIAL_STATE = [];

export const Context = createContext( INITIAL_STATE );

export const ContextProvider = ( { children } ) => {
    const [ state, dispatch ] = useReducer( Reducer, INITIAL_STATE );

    return (
        <Context.Provider
            value={ {
                questionnaires: state, 
                dispatch
            } }
        >
            { children }
        </Context.Provider>
    )
};