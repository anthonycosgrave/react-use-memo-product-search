import styles from './SearchForm.module.css';


interface SearchFormProps {
    searchTerm: string;
    category: string;
    sortBy: 'title-asc' | 'title-desc' | 'price-asc' | 'price-desc';
    onSearchTermChange: (value: string) => void;
    onCategoryChange: (value: string) => void;
    onSortChange: (value: 'title-asc' | 'title-desc' | 'price-asc' | 'price-desc') => void;
}

export function SearchForm({
    searchTerm,
    category,
    sortBy,
    onSearchTermChange,
    onCategoryChange,
    onSortChange
}: SearchFormProps) {

    return (
        <search>
            <div className={styles.searchForm}>
                <div className={styles.searchInput}>
                    <label htmlFor="search-input">Search</label>
                    <input
                        id="search-input"
                        name="search-input"
                        type="search"
                        value={searchTerm}
                        onChange={e => onSearchTermChange(e.target.value)}
                    />

                </div>
                <div className={styles.select}>
                    <label htmlFor="category">Filter By Category</label>
                    <select
                        id="category"
                        name="category"
                        value={category}
                        onChange={e => onCategoryChange(e.target.value)}
                    >
                        <option value="all">All</option>
                        <option value="beauty">Beauty</option>
                        <option value="furniture">Furniture</option>
                        <option value="groceries">Groceries</option>
                        <option value="laptops">Laptops</option>
                        <option value="smartphones">Smartphones</option>
                    </select>
                </div>
                <div className={styles.select}>
                    <label htmlFor="sort">Sort by</label>
                    <select
                        id="sort"
                        value={sortBy}
                        onChange={e => onSortChange(e.target.value as 'price-asc' | 'price-desc')}
                    >
                        <option value="title-asc">Name (A to Z)</option>
                        <option value="title-desc">Name (Z to A)</option>
                        <option value="price-asc">Price (low to high)</option>
                        <option value="price-desc">Price (high to low)</option>
                    </select>
                </div>
            </div>
        </search >
    );
};
