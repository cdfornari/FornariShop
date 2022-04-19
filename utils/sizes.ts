import { iSize } from '../interfaces';

//sort sizes in this order: XS, S, M, L, XL, XXL, XXXL
export const sortSizes = (sizes: iSize[]) => {
    const sizesSorted = sizes.sort((a, b) => {
        if(a === 'XS') return -1;
        if(b === 'XS') return 1;
        if(a === 'XXXL') return 1;
        if(a === 'XXL') return 1;
        if(b === 'XXL') return -1;
        if(b === 'XXXL') return -1;
        if(a === 'XL') return 1;
        if(b === 'XL') return -1;
        if(a === 'L') return 1;
        if(b === 'L') return -1;
        if(a === 'M') return 1;
        if(b === 'M') return -1;
        if(a === 'S') return 1;
        if(b === 'S') return -1;
        return 0;
    });
    return sizesSorted;
}