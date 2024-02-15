// pages/index.tsx
"use client"

import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';


interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
    category: string;
}

// const PATH_TO_API_CALL = 'https://fakestoreapi.com/products'

// export async function getServerSideProps() {
//     const response = await fetch(PATH_TO_API_CALL);
//     const responseData = await response.json();
//     return {
//         props: {
//             productData: responseData
//         }
//     }
// }


const Home: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10; // Change this value as needed
    const [totalProducts, setTotalProducts] = useState(0);

    const PATH_TO_API_CALL = 'https://fakestoreapi.com/products'

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(PATH_TO_API_CALL);
                const data = await response.json();
                setTotalProducts(data.length);
                const startIndex = (currentPage - 1) * productsPerPage;
                const endIndex = startIndex + productsPerPage;
                const pageProducts = data.slice(startIndex, endIndex);
                setProducts(pageProducts);
                console.log(data)
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [currentPage]);

    const totalPages = Math.ceil(totalProducts / productsPerPage);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    return (
        <div className="container mx-auto">
            <div className="grid grid-flow-col gap-3">
                <div className="col-span-1">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="mt-4 border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="col-span-4">
                    <h1 className="text-3xl font-bold my-8">Product List</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onNextPage={handleNextPage}
                        onPreviousPage={handlePreviousPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </div>


        </div>
    );
};

export default Home;