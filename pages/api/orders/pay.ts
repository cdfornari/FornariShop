import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import { isValidObjectId } from 'mongoose';
import axios from 'axios';
import { iPaypal } from '../../../interfaces';
import { db } from '../../../database';
import { Order } from '../../../models';

type Data = {
    message: string
}

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'POST':
            return payOrder(req,res);
        default:
            res.status(405).json({message: 'Method Not Allowed'})
    }
}

const getPaypalBearerToken = async(): Promise<string | null> => {
    const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const paypalSecret = process.env.PAYPAL_SECRET_ID;
    const body = new URLSearchParams('grant_type=client_credentials');
    const base64Token = Buffer.from(`${paypalClientId}:${paypalSecret}`, 'utf-8').toString('base64');
    try {
        const {data} = await axios.post(process.env.PAYPAL_OAUTH_URL || '', body, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${base64Token}`
            }
        });
        return data.access_token;
    }catch (error) {
        if(axios.isAxiosError(error)) console.log(error.response?.data)
        else console.log(error)
        return null;
    }
}

const payOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const session = await getSession({req});
    if(!session) return res.status(401).json({message: 'Unauthorized'});

    const paypalBearerToken = await getPaypalBearerToken();
    if(!paypalBearerToken) return res.status(400).json({message: 'Error getting paypal bearer token'});

    const { transactionId = '', orderId = '' } = req.body;
    if(!isValidObjectId(orderId)) return res.status(400).json({message: 'Invalid order id'});

    const {data} = await axios.get<iPaypal.PaypalOrderStatusResponse>(`${process.env.PAYPAL_ORDERS_URL}/${transactionId}`, {
        headers: {
            'Authorization': `Bearer ${paypalBearerToken}`
        }
    });
    if(data.status !== 'COMPLETED') return res.status(400).json({message: 'Payment not completed'});

    await db.connect();

    const order = await Order.findById(orderId);
    if(!order){
        await db.disconnect();
        return res.status(400).json({message: 'Order not found'});
    }
    if(order.summary.total !== Number(data.purchase_units[0].amount.value)) {
        await db.disconnect();
        return res.status(400).json({message: 'Order total does not match amount paid'});
    }

    order.transactionId = transactionId; 
    order.isPaid = true;
    await order.save();
    
    await db.disconnect();
    res.status(200).json({message: 'Order paid'})
}