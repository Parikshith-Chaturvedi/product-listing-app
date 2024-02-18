// Sort.tsx
import React from 'react';

interface SortProps {
    onSort: (order: 'asc' | 'desc' | '') => void;
}

const Sort: React.FC<SortProps> = ({ onSort }) => {
    const handleSort = (order: 'asc' | 'desc' | '') => {
        onSort(order);
    };

    return (
        <div>
            <label htmlFor="sort" className="block text-sm font-medium text-gray-900">Sort by Price</label>
            <select
                id="sort"
                onChange={(e) => handleSort(e.target.value as 'asc' | 'desc' | '')}
                className="ml-2 p-2 rounded-md border border-gray-200 text-xs"
            >
                <option value="">None</option>
                <option value="asc">Low to High</option>
                <option value="desc">High to Low</option>
            </select>
        </div>
    );
};

export default Sort;