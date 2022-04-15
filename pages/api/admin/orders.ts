import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { iOrder } from '../../../interfaces'
import { Order } from '../../../models'

type Data = 
| { message: string }
| iOrder[]

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return getOrders(req, res)
        default:
            res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

const getOrders = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    await db.connect();
    const orders = await Order.find()
        .populate('user', 'name email')
        .sort({ createdAt: 'desc' })
        .lean();
    await db.disconnect();
    return res.status(200).json(orders);
}