import { useEffect, useState } from "react";

type Product = {
   id: number;
   name: string;
   price: number;
}

export default function Catalog() {
   const [products, setProducts] = useState<Product[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      async function loadProducts() {
         try {
            const response = await fetch("/products");

            if (!response.ok) {
               throw new Error("Ошибка загрузки данных!");
            }
            setError(null);

            const data = await response.json();
            setProducts(data);
         } catch (error) {
            if (error instanceof Error) {
               console.error(error.message);
               setError(error.message);
            }
         } finally {
            setLoading(false);
         }
      }

      loadProducts();
   }, [])

   if (loading) {
      return (
         <>
            <h2>Каталог товаров</h2>
            <p>Загрузка товаров!</p>
         </>
      );
   }

   if (error) {
      return (
         <>
            <h2>Каталог товаров</h2>
            <p>Возникла ошибка при загрузке товаров.</p>
         </>
      );
   }

   return (
      <>
         <h2>Каталог товаров</h2>
         <ul>
            {products.map(product => (
               <li key={product.id}>
                  <h3>{product.name}</h3>
                  <p>{product.price}</p>
               </li>
            ))}
         </ul>
      </>
   );
}