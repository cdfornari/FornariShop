import type { NextApiRequest, NextApiResponse } from 'next'
import { db,SHOP_CONSTANTS } from '../../../database';
import { iProduct } from '../../../interfaces';
import { Product } from '../../../models';

type Data =
|{ message: string }
| iProduct[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return getProducts(req,res);
        default:
            res.status(405).json({ message: 'Method not allowed' })
    }
    res.status(200).json({ message: 'Example' })
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { gender = 'all' } = req.query;
    let findByGender = {}
    if(gender != 'all' && SHOP_CONSTANTS.validGenders.includes(`${gender}`)){
        findByGender = {gender}
    }

    await db.connect();
    const products = await Product.find(findByGender)
        .select('title images price inStock slug -_id')
        .lean();
    await db.disconnect();

    return res.status(200).json(products)
}