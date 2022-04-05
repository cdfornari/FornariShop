import { FC, useReducer } from 'react';
import { UIContext,uiReducer } from './';

export interface UIState {
    isMenuOpen: boolean;
}

const initialState: UIState = {
    isMenuOpen: false
}

export const UIProvider: FC = ({children}) => {
    const [state,dispatch] = useReducer(uiReducer, initialState);
    const toggleMenu = () => dispatch({type: 'UI - Toggle Menu'});
    return (
        <UIContext.Provider value={{...state, toggleMenu}}>
            {children}
        </UIContext.Provider>
    )
}