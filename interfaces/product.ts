export interface iProduct {
    _id: string;
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: iSize[];
    slug: string;
    tags: string[];
    title: string;
    type: iType;
    gender: 'men'|'women'|'kid'|'unisex'
}

export type iSize = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
export type iType = 'shirts'|'pants'|'hoodies'|'hats';