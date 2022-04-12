import { iCartProduct,iOrderSummary, ShippingAddress } from '../../interfaces';
import { CartState } from './';

type cartAction =
|{ type: 'SET CART', payload: iCartProduct[] }
|{ type: 'UPDATE PRODUCT QUANTITY', payload: iCartProduct }
|{ type: 'REMOVE PRODUCT', payload: iCartProduct }
|{ type: 'SET SUMMARY', payload: iOrderSummary }
|{ type: 'SET ADDRESS', payload: ShippingAddress }

export const cartReducer = (state: CartState, action: cartAction) => {
    switch (action.type) {
        case 'SET CART':
            return {
                ...state,
                cart: action.payload
            };
        case `UPDATE PRODUCT QUANTITY`:
            return {
                ...state,
                cart: state.cart.map(product => 
                    product._id === action.payload._id && product.size === action.payload.size
                    ? action.payload : product)
            };
        case `REMOVE PRODUCT`:
            return {
                ...state,
                cart: state.cart.filter(product => product._id !== action.payload._id || product.size !== action.payload.size)
            };
        case `SET SUMMARY`:
            return {
                ...state,
                summary: action.payload
            };
        case `SET ADDRESS`:
            return {
                ...state,
                address: action.payload
            };
        default:
            return state;
    }
};