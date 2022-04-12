import { db } from '.';
import { iProduct } from '../interfaces';
import { Product } from '../models';

export const getAllProducts = async (): Promise<iProduct[]> => {
    await db.connect();
    const products = await Product.find()
    .select('title images price inStock slug -_id')
    .lean();
    await db.disconnect();
    return JSON.parse(JSON.stringify(products));
};

export const getProductBySlug = async (slug: string): Promise<iProduct | null> => {
    await db.connect();
    const product = await Product.findOne({slug})
    .select('title description images price inStock sizes slug')
    .lean();
    await db.disconnect();
    if(!product) return null;
    return JSON.parse(JSON.stringify(product));
}

export const getAllProductSlugs = async (): Promise<string[]> => {
    await db.connect();
    const slugs = await Product.find().select('slug -_id').lean();
    await db.disconnect();
    return slugs.map(slug => slug.slug);
}

export const searchProducts = async (query: string): Promise<iProduct[]> => {
    query = query.toString().toLowerCase();
    await db.connect();
    const products = await Product.find({
        $text: {
            $search: query
        }
    }).select('title images price inStock slug -_id')
    .lean();
    await db.disconnect();
    return products;
}