import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { db } from '../../../database'
import { iOrder } from '../../../interfaces'
import { Product } from '../../../models'
import { Order } from '../../../models'

type Data = 
| { message: string }
| iOrder

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch(req.method) {
        case 'POST':
            return createOrder(req,res)
        default:
            return res.status(405).json({ message: 'Method not allowed' })
    }
}

const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const session: any = await getSession({req});
    if(!session) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const { orderItems,summary } = req.body as iOrder;
    const productsIDs = orderItems.map(product => product._id);

    await db.connect();
    const dbProducts = await Product.find({_id: {$in: productsIDs}});

    try {
        const subtotal = orderItems.reduce((prev, current) => {
            const price = dbProducts.find(product => product.id === current._id)?.price;
            if(!price){
                throw new Error('Product not found');
            }
            return prev + price * current.quantity
        }, 0);
        const tax = subtotal * Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
        const total = subtotal + tax;

        if(total !== summary.total) {
            throw new Error('Total price is not correct');
        }

        const userId = session.user._id;
        const newOrder = new Order({
            ...req.body,
            user: userId,
            isPaid: false
        })
        newOrder.summary.total = Math.round(newOrder.summary.total * 100) / 100;
        await newOrder.save();

        await db.disconnect();
        return res.status(201).json(newOrder)
    } catch (error: any) {
        await db.disconnect();
        console.log(error);
        return res.status(400).json({ message: error.message || 'Order is not valid' })
    }
    res.status(200).json({message: 'a'})
}