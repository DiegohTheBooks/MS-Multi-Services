import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/products";

type ProductCardProps = { product: Product; onAdd: (product: Product) => void };

export default function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <article className="product-card">
      <div className={`product-art tone-${product.tone}`}>
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <span className="product-art-glow" />
        <span className="product-symbol" aria-hidden="true">{product.icon}</span>
        <span className="product-art-caption">MS <i>MULTI SERVICES</i></span>
      </div>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="product-buy-row"><strong>{formatPrice(product.price)}</strong><button onClick={() => onAdd(product)} aria-label={`Adicionar ${product.name} ao carrinho`} className="add-button">+</button></div>
      </div>
    </article>
  );
}
