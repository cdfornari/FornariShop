import {isValidObjectId} from 'mongoose';
import { db } from '.';
import { iOrder } from '../interfaces';
import { Order } from '../models';

export const getOrderById = async (id: string): Promise<iOrder | null> => {
    if(!isValidObjectId(id)) return null;
    await db.connect();
    const order = await Order.findById(id).lean();
    await db.disconnect();
    if(!order) return null;
    return JSON.parse(JSON.stringify(order));
}

export const getOrdersByUserId = async (userId: string): Promise<iOrder[]> => {
    if(!isValidObjectId(userId)) return [];
    await db.connect();
    const orders = await Order.find({user: userId}).lean();
    await db.disconnect();
    if(!orders) return [];
    return JSON.parse(JSON.stringify(orders));
}