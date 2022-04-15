import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedDatabase } from '../../database'
import { Order, Product, User } from '../../models';

type Data = {
    msg: string
}

export default  async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if(process.env.NODE_ENV  === 'production') 
        return res.status(401).json({ msg: 'This API is not available in production' })
    await db.connect();
    await User.deleteMany();
    await User.insertMany(seedDatabase.initialData.users);
    await Product.deleteMany();
    await Product.insertMany(seedDatabase.initialData.products);
    await Order.deleteMany();
    await db.disconnect();
    res.status(200).json({ msg: 'Proccess done' })
}