import React from 'react';
import styled from 'styled-components';

const FilterBar = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 1.5rem;
`;
const Select = styled.select`
  padding: 0.4em 1em;
  border-radius: 4px;
  border: 1px solid #ccc;
  background: #fff;
`;

const BlogFilters = ({
  categories = [],
  years = [],
  onFilterChange,
  onSortChange,
  sortValue,
  filters
}) => {
  return (
    <FilterBar>
      <Select
        value={filters.category || ''}
        onChange={e => onFilterChange('category', e.target.value)}
        aria-label="Filter by Category"
      >
        <option value="">All Categories</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </Select>
      <Select
        value={filters.year || ''}
        onChange={e => onFilterChange('year', e.target.value)}
        aria-label="Filter by Year"
      >
        <option value="">All Years</option>
        {years.map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </Select>
      <Select
        value={sortValue}
        onChange={e => onSortChange(e.target.value)}
        aria-label="Sort blogs"
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="az">A-Z</option>
        <option value="za">Z-A</option>
      </Select>
    </FilterBar>
  );
};

export default BlogFilters;
