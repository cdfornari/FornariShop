import { UIState } from './';

type UIAction =
|{ type: 'UI - Toggle Menu'};

export const uiReducer = (state: UIState, action: UIAction) => {
    switch (action.type) {
        case 'UI - Toggle Menu':
            return {
                ...state,
                isMenuOpen: !state.isMenuOpen
            }
        default:
            return state;
    }
};