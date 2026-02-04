import { useEffect, useState, useRef, useMemo } from 'react';
import { SearchForm } from './components/SearchForm/SearchForm';
import { ProductList } from './components/ProductList/ProductList';
import type { Product } from './types/product';

//
// Note: This is a small project to understand useMemo and useCallback.
//
// In a real app with this dataset size, alternatives like debouncing, 
// search-on-submit, or server-side filtering might be more appropriate.
//

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'title-asc' | 'title-desc' | 'price-asc' | 'price-desc'>('title-asc');

  const renderCount = useRef(0);
  renderCount.current++;
  console.log('App rendered:', renderCount.current);

  // utils is optional; for now we keep inline in App.tsx
  function sortProducts(
    products: Product[],
    sortBy: "title-asc" | "title-desc" | "price-asc" | "price-desc"
  ): Product[] {
    console.log(`🔄 sortProducts ${searchTerm}`);
    const sorted = [...products];

    if (sortBy === "price-asc") {
      return sorted.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "price-desc") {
      return sorted.sort((a, b) => b.price - a.price);
    }

    if (sortBy === "title-desc") {
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    }

    // title-asc
    return sorted.sort((a, b) => a.title.localeCompare(b.title));
  };

  function filterProducts(
    products: Product[],
    searchTerm: string,
    category: string
  ): Product[] {
    console.log(`🔍 filterProducts ${searchTerm}`);
    return products.filter(product => {
      // Check if product matches search term (case-insensitive)
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());

      // Check if product matches category
      const matchesCategory = category === 'all' || product.category === category;

      // Product must match both conditions
      return matchesSearch && matchesCategory;
    });
  };

  //
  // Without useMemo, filterProducts and sortProducts run on every render,
  // even when their inputs (products, searchTerm, category, sortBy) haven't changed.
  // Every keystroke in the search box triggers a re-render (updating searchTerm state),
  // causing both functions to re-execute unnecessarily and recalculate the same results.
  //
  // const filteredProducts = filterProducts(products, searchTerm, category);
  // const productsToRender = sortProducts(filteredProducts, sortBy);

  // 
  // With useMemo, filtered and sorted results are cached. 
  // filterProducts and sortProducts only re-run when their dependencies change, 
  // preventing unnecessary recalculations on every render.
  //
  const filteredProducts = useMemo(
    () => filterProducts(products, searchTerm, category), 
    [products, searchTerm, category]
  );

  const productsToRender = useMemo(
    () => sortProducts(filteredProducts, sortBy),
    [filteredProducts, sortBy]
  );

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch(
          // https://dummyjson.com/docs/products#products-limit_skip
          // limit=0 to get ALL items
          'https://dummyjson.com/products?limit=0'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        setProducts(data.products);
        console.log(data.products);
      } catch (err) {
        setError('Unable to load products');
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, []);

  return (
    <>
      <main id="main">
        <h1>Product search</h1>
        <SearchForm
          searchTerm={searchTerm}
          category={category}
          sortBy={sortBy}
          onSearchTermChange={setSearchTerm}
          onCategoryChange={setCategory}
          onSortChange={setSortBy}
        />
        {isLoading && <p>Loading products…</p>}
        {error && <p role="alert">{error}</p>}
        {!isLoading && !error && (
          <ProductList products={productsToRender} />
        )}
      </main>
    </>
  );
};

export default App;