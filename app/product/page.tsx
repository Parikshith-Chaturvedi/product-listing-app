// pages/index.tsx
"use client"

import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
    category: string;
}


const Home: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    const PATH_TO_API_CALL = 'https://fakestoreapi.com/products'

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(PATH_TO_API_CALL);
                const responseData = await response.json();
                console.log(responseData);
                setProducts(responseData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold my-8">Product List</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Home;