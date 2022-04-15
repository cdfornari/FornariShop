import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { iUser } from '../../../interfaces';
import { User } from '../../../models';
import { isValidObjectId } from 'mongoose';

type Data = 
| { message: string }
| iUser[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return getUsers(req, res);
        case 'PUT':
            return updateUser(req, res);
        default:
            return res.status(405).json({ message: 'Method Not Allowed' });
    }
}

const getUsers = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    await db.connect();
    const users = await User.find().select('-password').lean();
    await db.disconnect();
    return res.status(200).json(users);
}

const updateUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { userId='', role='' } = req.body;
    if(!isValidObjectId(userId)) return res.status(400).json({ message: 'Invalid userId' });
    if(!['admin', 'client'].includes(role)) return res.status(400).json({ message: 'Invalid role' });
    await db.connect();
    const user = await User.findByIdAndUpdate(userId, { role }, { new: true }).select('-password').lean();
    await db.disconnect();
    if(!user) return res.status(404).json({ message: 'User not found' });
    return res.status(200).json({ message: 'User updated' });
}