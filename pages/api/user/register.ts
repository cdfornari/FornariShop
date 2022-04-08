import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs';
import { db } from '../../../database'
import { User } from '../../../models'
import { jwt, validations } from '../../../utils';

type Data = 
| { message: string }
| {
    token: string,
    user: {
        name: string,
        email: string,
        role: string,
    }
}


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'POST':
            return register(req, res)
        default:
            return res.status(405).json({ message: 'Method not allowed' })
    }
}

const register = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const {email = '', password = '', name=''} = req.body;

    if(password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters' });
    if(name.length < 2) return res.status(400).json({ message: 'Name must be at least 2 characters' });
    if(!validations.isValidEmail(email)) return res.status(400).json({ message: 'Email is not valid' });

    await db.connect();
    const user = await User.findOne({email});
    if(user){
        await db.disconnect();
        return res.status(400).json({ message: 'User already exists' });
    }
    
    const newUser = new User({
        name,
        email,
        password: bcrypt.hashSync(password),
        role: 'client'
    });
    try {
        await newUser.save({validateBeforeSave: true});
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Error creating user' });
    }

    const {role,_id} = newUser;
    const token = jwt.signToken(_id, email);

    return res.status(200).json({
        token,
        user: {
            name,
            email,
            role
        }
    });
}