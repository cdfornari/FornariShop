import { iSize } from '.';

export interface iCartProduct {
    _id: string;
    image: string;
    inStock: number;
    price: number;
    size: iSize;
    slug: string;
    title: string;
    gender: 'men'|'women'|'kid'|'unisex',
    quantity: number;
}

export interface iOrderSummary {
    productCount: number;
    subtotal: number;
    tax: number;
    total: number;
}