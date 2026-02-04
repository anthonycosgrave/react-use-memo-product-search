import type { Product } from '../../types/product';
import { ProductRow } from '../ProductRow/ProductRow';
import styles from './ProductList.module.css';

interface ProductListProps {
    products: Product[];
}

export function ProductList({ products }: ProductListProps) {
    return (
        <section>
            <h2 id="results-heading">Results ({products.length})</h2>
            <ul className={styles.productList}>
                {products.map(product => (
                    <ProductRow key={product.id} product={product} />
                ))}
            </ul>
        </section>
    );
}
