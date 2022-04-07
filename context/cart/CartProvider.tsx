import { FC, useReducer, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import { CartContext,cartReducer } from './';
import { iCartProduct,iOrderSummary } from '../../interfaces';

export interface CartState {
    cart: iCartProduct[];
    summary: iOrderSummary;
}

const initialState: CartState = {
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
        if(initialRender.current) {
            initialRender.current = false;
        } else {
            Cookies.set('cart', JSON.stringify(state.cart));
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

    return (
        <CartContext.Provider  
            value={{...state,addProductToCart,updateProductQuantity,removeProduct}}
        >
            {children}
        </CartContext.Provider>
    )
};