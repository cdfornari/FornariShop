import { createContext } from 'react';
import { iCartProduct, iOrderSummary } from '../../interfaces';

interface ContextProps {
    cart: iCartProduct[];
    summary: iOrderSummary;
    addProductToCart: (product: iCartProduct) => void;
    updateProductQuantity: (product: iCartProduct) => void;
    removeProduct: (product: iCartProduct) => void;
}

export const CartContext = createContext({} as ContextProps);