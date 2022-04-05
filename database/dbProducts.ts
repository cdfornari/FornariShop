import { db } from '.';
import { iProduct } from '../interfaces';
import { Product } from '../models';

export const getProductBySlug = async (slug: string): Promise<iProduct | null> => {
    await db.connect();
    const product = await Product.findOne({slug})
    .select('title description images price inStock sizes slug -_id')
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