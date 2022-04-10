import { FC, useReducer, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import { CartContext,cartReducer } from './';
import { iCartProduct,iOrderSummary } from '../../interfaces';

export interface CartState {
    address?: ShippingAddress;
    cart: iCartProduct[];
    summary: iOrderSummary;
}

export interface ShippingAddress {
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    address2?: string;
    city: string;
    country: string;
    zip: string;
}

const initialState: CartState = {
    address: undefined,
    cart: [],
    summary: {
        productCount: 0,
        subtotal: 0,
        tax: 0,
        total: 0
    }
}

export const CartProvider: FC = ({children}) => {
    const [state,dispatch] = useReducer(cartReducer, initialState);
    const initialRender = useRef(true);

    useEffect(() => {
        try {
            const cookiesCart = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')!) : [];
            dispatch({type: 'SET CART', payload: cookiesCart});
        } catch (error) {
            dispatch({type: 'SET CART', payload: []});
        }
    },[])
    useEffect(() => {
        const address: ShippingAddress = Cookies.get('address') ? JSON.parse(Cookies.get('address')!) : undefined;
        if(!address) return;
        address.country = Cookies.get('country') || '';
        dispatch({type: 'SET ADDRESS', payload: address});
    },[])
    useEffect(() => {
        if(initialRender.current) {
            initialRender.current = false;
        } else {
            Cookies.set('cart', JSON.stringify(state.cart),{expires: 7});
        }
    },[state.cart])
    useEffect(() => {
        const productCount = state.cart.reduce((prev, current) => prev + current.quantity, 0);
        const subtotal = state.cart.reduce((prev, current) => prev + current.quantity * current.price, 0);
        const tax = subtotal * Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
        const total = subtotal + tax;
        dispatch({type: 'SET SUMMARY', payload: {productCount, subtotal, tax, total}});
    },[state.cart])

    const addProductToCart = (product: iCartProduct) => {
        let foundProduct = false;
        const newCart = state.cart.map(productInCart => {
            if (
                productInCart._id !== product._id
                || productInCart.size !== product.size
            ) return productInCart;
            foundProduct = true;
            productInCart.quantity += product.quantity;
            return productInCart;
        })
        if(!foundProduct){
            newCart.push(product);
        }
        dispatch({
            type: 'SET CART',
            payload: newCart
        })
    }
    const updateProductQuantity = (product: iCartProduct) => {
        dispatch({
            type: 'UPDATE PRODUCT QUANTITY',
            payload: product
        })
    }
    const removeProduct = (product: iCartProduct) => {
        dispatch({
            type: 'REMOVE PRODUCT',
            payload: product
        })
    }
    const updateAddress = (address: ShippingAddress) => {
        dispatch({
            type: 'SET ADDRESS',
            payload: address
        })
    }

    return (
        <CartContext.Provider  
            value={{...state,addProductToCart,updateProductQuantity,removeProduct,updateAddress}}
        >
            {children}
        </CartContext.Provider>
    )
};