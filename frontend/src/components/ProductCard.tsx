import { type Product } from "../types/product";

type ProductCardProps = {
  product: Product;
  onAddToCart: (product: Product) => void;
};



export default function ProductCard({product, onAddToCart}: ProductCardProps){
  return(
    <li>
      <h3>{product.name}</h3>
      <p>{product.price}</p>
      <button onClick={() => onAddToCart(product)}>Добавить в корзину</button>
    </li>
  );
}