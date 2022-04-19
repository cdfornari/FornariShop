import type { NextApiRequest, NextApiResponse } from 'next'
import {v2 as cloudinary} from 'cloudinary'
cloudinary.config(process.env.CLOUDINARY_URL || '');
import { db,SHOP_CONSTANTS } from '../../../database';
import { iProduct } from '../../../interfaces';
import { Product } from '../../../models';
import { isValidObjectId } from 'mongoose';
import { sortSizes } from '../../../utils';

type Data =
|{ message: string }
| iProduct[]
| iProduct

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return getProducts(req,res);
        case 'POST':
            return createProduct(req,res);
        case 'PUT':
            return updateProduct(req,res);
        default:
            res.status(405).json({ message: 'Method not allowed' })
    }
    res.status(200).json({ message: 'Example' })
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    await db.connect();
    const products = await Product.find()
        .sort({title: 'asc'})
        .lean();
    await db.disconnect();
    const imgProcessedProducts = products.map(product => {
        product.images = product.images.map(image => image.includes('http') ? image : `${process.env.HOST_NAME}/products/${image}`);
        return product;
    });
    return res.status(200).json(imgProcessedProducts)
}

const createProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const {images = []} = req.body as iProduct;
    if(images.length < 2) return res.status(400).json({ message: 'Minimum 2 images' });
    delete req.body._id;
    req.body.sizes = sortSizes(req.body.sizes);

    try {
        await db.connect();
        if(req.body.slug === 'new' || await Product.findOne({slug: req.body.slug})) throw new Error('Slug already exists');

        const product = new Product(req.body);
        await product.save();
        await db.disconnect();
        return res.status(200).json(product);
    } catch (error) {
        console.log(error)
        await db.disconnect();
        return res.status(400).json({ message: 'Error creating product' })
    }
}

const updateProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { _id = '', images = [] } = req.body as iProduct;
    if(!isValidObjectId(_id)) return res.status(400).json({ message: 'Invalid product id' });
    if(images.length < 2) return res.status(400).json({ message: 'Minimum 2 images' });

    req.body.sizes = sortSizes(req.body.sizes);

    try {
        await db.connect();
        const product = await Product.findById(_id);
        if(!product) throw new Error('Product not found');

        product.images.forEach(async(image) => {
            if(!images.includes(image)){
                const [fileName,extension] = image.substring(image.lastIndexOf('/') + 1).split('.');
                await cloudinary.uploader.destroy(fileName);
            } 
        })

        await product.update(req.body, { new: true });
        await db.disconnect();
        return res.status(200).json(product);
    } catch (error) {
        console.log(error)
        await db.disconnect();
        return res.status(400).json({ message: 'Error updating product' })
    }
}