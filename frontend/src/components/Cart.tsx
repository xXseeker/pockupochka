import type { CartItem } from "../types/cart"

type CartProps = {
   items: CartItem[];
   onRemove: (productId: number) => void;
}

export default function Cart({ onRemove, items }: CartProps) {


   return (
      <>
         <h2>Корзина</h2>
         <ul>
            {
               items.length > 0
                  ? items.map(i =>
                     <li key={i.product.id}>
                        {i.product.imageUrl
                           ? <img src={i.product.imageUrl} alt={i.product.name} />
                           : <div className="product-img-in-the-future"></div>
                        }
                        <h3>
                           {i.product.name}
                        </h3>
                        <p>
                           Цена за единицу товара: {i.product.price}
                        </p>
                        <p>Кол-во: {i.quantity}</p>
                        <p>Сумма по данной позиции: {i.quantity * i.product.price}</p>
                        <button onClick={() => onRemove(i.product.id)}>Удалить позицию</button>
                     </li>
                  )
                  : <li>Корзина пустая!</li>
            }
         </ul>
      </>
   );
}