import { createContext } from 'react';
import { iCartProduct, ShippingAddress } from '../../interfaces';
import { CartState } from './';

interface ContextProps extends CartState{
    addProductToCart: (product: iCartProduct) => void;
    updateProductQuantity: (product: iCartProduct) => void;
    removeProduct: (product: iCartProduct) => void;
    updateAddress: (address: ShippingAddress) => void;
    createOrder: () => Promise<{hasError: boolean, message: string}>;
}

export const CartContext = createContext({} as ContextProps);