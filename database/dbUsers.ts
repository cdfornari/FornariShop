import bcrypt from 'bcryptjs';
import { db } from '.'
import { User } from '../models';

export const validateUser = async (email: string, password: string) => {
    await db.connect();
    const user = await User.findOne({ email }).lean();
    await db.disconnect();
    if(!user) return null;
    if(!bcrypt.compareSync(password, user.password!)) return null;
    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    };
}

export const createUserFromOauth = async (oAuthEmail: string, oAuthName: string) => {
    await db.connect();
    const user = await User.findOne({ email: oAuthEmail }).lean();
    if(user) {
        await db.disconnect();
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    }
    const newUser = new User({email: oAuthEmail, name: oAuthName, password: '@@@***', role: 'client'});
    await newUser.save();
    await db.disconnect();
    return {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
    }
}
