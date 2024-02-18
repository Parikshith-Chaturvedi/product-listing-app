// ProductList.tsx
import React from 'react';
import ProductCard from './ProductCard';

interface ProductListProps {
    products: {
        id: number;
        image: string;
        title: string;
        price: number;
        description: string;
    }[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductList;
