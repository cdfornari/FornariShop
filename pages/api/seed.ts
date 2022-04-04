import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedDatabase } from '../../database'
import { Product } from '../../models';

type Data = {
    msg: string
}

export default  async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if(process.env.NODE_ENV  === 'production') 
        return res.status(401).json({ msg: 'This API is not available in production' })
    await db.connect();
    await Product.deleteMany();
    await Product.insertMany(seedDatabase.initialData.products);
    await db.disconnect();
    res.status(200).json({ msg: 'Proccess done' })
}