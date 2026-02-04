import styles from './ProductRow.module.css';
import type { Product } from '../../types/product';

export function ProductRow({ product }: { product: Product }) {
    return (
        <li className={styles.productItem}>
            <article className={styles.productCard} tabIndex={0}>
                <h3 className={styles.title}>{product.title}</h3>
                <p className={styles.description}>{product.description}</p>
                <data className={styles.price} value={product.price}>${product.price}</data>
            </article>
        </li>
    )
}