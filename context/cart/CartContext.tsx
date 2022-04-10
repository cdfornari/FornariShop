import { createContext } from 'react';
import { iCartProduct } from '../../interfaces';
import { CartState, ShippingAddress } from './';

interface ContextProps extends CartState{
    addProductToCart: (product: iCartProduct) => void;
    updateProductQuantity: (product: iCartProduct) => void;
    removeProduct: (product: iCartProduct) => void;
    updateAddress: (address: ShippingAddress) => void;
}

export const CartContext = createContext({} as ContextProps);