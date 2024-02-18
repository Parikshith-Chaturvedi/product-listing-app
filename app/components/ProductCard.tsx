// ProductCard.tsx
import React from 'react';
import Image from 'next/image';

interface ProductCardProps {
    product: {
        id: number;
        image: string;
        title: string;
        price: number;
        description: string;
    };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const truncateDescription = (text: string, maxLength: number) => {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substr(0, maxLength) + '...';
    };

    return (
        <div className="rounded-md border border-gray-200 p-4 mb-2 card">
            <div className="flex justify-center mb-4">
                <Image
                    height={100}
                    width={100}
                    src={product.image}
                    alt={product.title}
                    className="rounded-lg mb-4"
                />
            </div>
            <div className='md:min-h-20 sm:min-h-28'>
                <h2 className="text-lg font-semibold text-slate-900 mb-6">{product.title}</h2>
            </div>
            <p className="flex-grow text-sm">{truncateDescription(product.description, 100)}</p>
            <div className='flex justify-end'>
                <p className="mb-2 font-bold text-slate-900 text-xl">${product.price}</p>
            </div>
        </div>
    );
};

export default ProductCard;