import { db } from '.';
import { iProduct } from '../interfaces';
import { Product } from '../models';

export const getAllProducts = async (): Promise<iProduct[]> => {
    await db.connect();
    const products = await Product.find()
    .select('title images price inStock slug -_id')
    .lean();
    await db.disconnect();
    const imgProcessedProducts = products.map(product => {
        product.images = product.images.map(image => image.includes('http') ? image : `${process.env.HOST_NAME}/products/${image}`);
        return product;
    });
    return JSON.parse(JSON.stringify(imgProcessedProducts));
};

export const getProductBySlug = async (slug: string): Promise<iProduct | null> => {
    await db.connect();
    const product = await Product.findOne({slug}).lean();
    await db.disconnect();

    if(!product) return null;

    product.images = product.images.map(image => image.includes('http') ? image : `${process.env.HOST_NAME}/products/${image}`);

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
    })
    .select('title images price tags inStock slug -_id')
    .lean();
    await db.disconnect();
    const imgProcessedProducts = products.map(product => {
        product.images = product.images.map(image => image.includes('http') ? image : `${process.env.HOST_NAME}/products/${image}`);
        return product;
    });
    return imgProcessedProducts;
}

export const getSuggestedProducts = async (productsInCart: iProduct[], recentSearches: string[]): Promise<iProduct[]> => {
    const tags: string[] = [];
    for(const product of productsInCart) {
        for(const tag of product.tags) {
            if(!tags.includes(tag)) tags.push(tag);
        }
    }
    for(const search of recentSearches){
        if(!tags.includes(search)) tags.push(search);
        const productSearched = await searchProducts(search);
        for(const product of productSearched){
            if(!tags.includes(product.title)) tags.push(product.title);
            for(const tag of product.tags){
                if(!tags.includes(tag)) tags.push(tag);
            }
        }
    }
    const products: iProduct[] = [];

    await db.connect();
    for(const tag of tags){
        const suggestedProducts = await Product.find({
            $text: {
                $search: tag
            }
        })
        .select('title images price inStock slug -_id')
        .lean();

        for(const suggestedProduct of suggestedProducts){
            let productInArray = false;
            for(const product of products){
                if(product.slug === suggestedProduct.slug) productInArray = true;
            }
            if(!productInArray) products.push(suggestedProduct);
        }
    }
    await db.disconnect();

    if(products.length === 0) return [];

    const imgProcessedProducts = products.map(product => {
        product.images = product.images.map(image => image.includes('http') ? image : `${process.env.HOST_NAME}/products/${image}`);
        return product;
    });
    return imgProcessedProducts;
}