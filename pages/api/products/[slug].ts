import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { iProduct } from '../../../interfaces'
import { Product } from '../../../models'

type Data = 
| { message: string }
| iProduct

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return getProductBySlug(req, res)
        default:
            res.status(405).json({ message: 'Method not allowed' })
    }
}

const getProductBySlug = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { slug } = req.query;

    await db.connect();
    const product = await Product.findOne({ slug })
        .select('title images price inStock slug -_id')
        .lean();
    await db.disconnect();
    
    if(!product) return res.status(404).json({ message: 'Product not found' });
    return res.status(200).json(product)
}