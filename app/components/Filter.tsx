// Filter.tsx
import React from 'react';

interface FilterProps {
    categories: string[];
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}

const Filter: React.FC<FilterProps> = ({ categories, selectedCategory, onSelectCategory }) => {
    return (
        <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-900">Filter Categories</label>
            <select
                id="category"
                value={selectedCategory}
                onChange={(e) => onSelectCategory(e.target.value)}
                className="p-2 rounded-md border border-gray-200 text-xs"
            >
                <option value="">All</option>
                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Filter;