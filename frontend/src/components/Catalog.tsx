import { useEffect, useState } from "react";
import { type Product } from "../types/product"
import ProductCard from "./ProductCard";

type CatalogProps = {
   onAddToCart: (product: Product) => void;
};

export default function Catalog({ onAddToCart }: CatalogProps) {
   const [products, setProducts] = useState<Product[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
   const [search, setSearch] = useState<string>("");
   const [debouncedSearch, setDebouncedSearch] = useState("");

   useEffect(() => {
      const tmr = setTimeout(() => {
         setDebouncedSearch(search);
      }, 500)

      return () => {
         clearTimeout(tmr);
      };
   }, [search]);

   useEffect(() => {
      const controller = new AbortController;
      async function loadProducts() {
         const url = `/products?search=${encodeURIComponent(debouncedSearch)}`;
         try {
            setError(null);
            setLoading(true);
            const response = await fetch(url, { signal: controller.signal });

            if (!response.ok) {
               throw new Error("Ошибка загрузки данных!");
            }

            const data = await response.json();
            setProducts(data);
         } catch (error) {
            if (controller.signal.aborted) {
               return
            }

            if (error instanceof Error) {
               console.error(error.message);
               setError(error.message);
            }
         } finally {
            if (!controller.signal.aborted) {
               setLoading(false);
            }
         }
      }

      loadProducts();

      return () => {
         controller.abort();
      };
   }, [debouncedSearch]);

   return (
      <>
         <h2>Каталог товаров</h2>
         <label htmlFor="searchProduct">Поиск товара: </label>
         <input id="searchProduct" type="text" value={search} onChange={(event) => setSearch(event.target.value)} />
         {loading
            ? <p>Загрузка товаров!</p>
            : error
               ? <p>Возникла ошибка при загрузке товаров.</p>
               : products.length === 0
                  ? <p>Товары не найдены</p>
                  : <ul className="products-grid">
                     {products.map(product => (
                        <ProductCard key={product.id} onAddToCart={onAddToCart} product={product} />
                     ))}
                  </ul>
         }
      </>
   );
}