import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../utils/api';
import getProducts from '@/lib/getProducts';
import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';
import Filter from '../components/Filter';
import SearchBar from '../components/SearchBar';
import Sort from '../components/Sorting';

interface Product {
    id: number;
    image: string;
    title: string;
    price: number;
    description: string;
    category: string;
}

const ProductHome: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | ''>('');
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchProducts()
            .then((data) => {
                setProducts(data);
                setFilteredProducts(data);
                const allCategories = data.reduce((acc: string[], product: Product) => {
                    if (!acc.includes(product.category)) {
                        acc.push(product.category);
                    }
                    return acc;
                }, []);
                setCategories(allCategories);
                setTotalPages(Math.ceil(data.length / 10));
                setDataLoaded(true); 
            })
            .catch((error) => setError('Error fetching products'))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        handleSort(sortOrder);
    }, [sortOrder]);

    useEffect(() => {
        filterProducts(selectedCategory, query);
    }, [selectedCategory, query]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    const handleSearch = (query: string) => {
        setQuery(query);
        setCurrentPage(1);
    };

    const handleSort = (order: 'asc' | 'desc' | '') => {
        setSortOrder(order);
        if (order === '') {
            setFilteredProducts(products);
        } else {
            const sorted = [...filteredProducts].sort((a, b) => {
                return order === 'asc' ? a.price - b.price : b.price - a.price;
            });
            setFilteredProducts(sorted);
        }
    };

    const filterProducts = (category: string, query: string) => {
        let filtered = products;
        if (category) {
            filtered = filtered.filter((product) => product.category === category);
        }
        if (query) {
            const searchTerm = query.toLowerCase();
            filtered = filtered.filter(
                (product) =>
                    product.title.toLowerCase().includes(searchTerm) ||
                    product.description.toLowerCase().includes(searchTerm)
            );
        }
        setFilteredProducts(filtered);
        setTotalPages(Math.ceil(filtered.length / 10));
    };

    const startIndex = (currentPage - 1) * 10;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + 10);

    return (
        <div className="container mx-auto px-4 py-8">
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {dataLoaded && !loading && !error && (
                <>
                    <div className="flex flex-wrap">
                        <div className="w-2/5">
                            <SearchBar onSearch={handleSearch} />
                        </div>
                        <div className="flex w-3/5 justify-end">
                            <Filter categories={categories} selectedCategory={selectedCategory} onSelectCategory={handleCategoryChange} />
                            <Sort onSort={handleSort} />
                        </div>
                    </div>
                    {filteredProducts.length === 0 ? (
                        <div className='flex justify-center'>
                            <p>No products found.</p>
                        </div>
                    ) : (
                        <>
                            <ProductList products={paginatedProducts} />
                            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default ProductHome;
