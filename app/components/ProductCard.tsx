// components/ProductCard.tsx
'use client'

import React from 'react';
import Image from 'next/image';

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div key={product.id} className="bg-white rounded-md overflow-hidden border border-slate-400">
            <Image
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover"
                width={500}
                height={500}
            />
            {/* <img src={product.image} alt={product.title} className="w-full h-48 object-cover" /> */}
            <div className="p-4">
                <div className='min-h-20'>
                    <h3 className="text-lg font-medium mb-2">{product.title}</h3>
                </div>
                <div className='min-h-40'>
                    <p className="text-gray-500 mt-2">{product.description}</p>

                </div>
            </div>
            <div className="p-4">
                <div className='grid-cols-6'>
                    <p className="text-gray-500 mt-2">Category: {product.category}</p>
                    <p className="text-gray-600 font-semibold">${product.price}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
