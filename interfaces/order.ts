import { iUser,iOrderSummary } from '.';

export interface iOrder {
    _id?: string;
    user?: iUser | string;
    orderItems?: iOrderItem[];
    shippingAddress: ShippingAddress;
    paymentResult?: string;
    summary: iOrderSummary;
    isPaid: boolean;
    paidAt?: string;
}

export interface iOrderItem {
    _id: string;
    title: string;
    size: string;
    quantity: number;
    slug: string;
    image: string;
    price: number;
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