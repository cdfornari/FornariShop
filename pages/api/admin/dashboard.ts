import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { DashboardSummaryResponse } from '../../../interfaces';
import { Order, Product, User } from '../../../models'

export default async function handler(req: NextApiRequest, res: NextApiResponse<DashboardSummaryResponse>) {
    await db.connect();
    const [
        numberOfOrders,
        paidOrders,
        numberOfClients,
        numberOfProducts,
        productsOutOfStock,
        productsLowStock
    ] = await Promise.all([
        Order.count(),
        Order.count({ isPaid: true }),
        User.count({ role: 'client' }),
        Product.count(),
        Product.count({ inStock: 0 }),
        Product.count({ inStock: { $gt: 0, $lt: 6 } })
    ])
    await db.disconnect();
    res.status(200).json({
        numberOfOrders,
        paidOrders,
        pendingOrders: numberOfOrders - paidOrders,
        numberOfClients,
        numberOfProducts,
        productsOutOfStock,
        productsLowStock
    });
}