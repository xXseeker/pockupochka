import './App.css'
import Catalog from './components/Catalog'
import Header from './components/Header'
import Cart from './components/Cart'
import type { Product } from './types/product';
import type { CartItem } from './types/cart';
import { useState } from 'react';

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);

  function handleAddToCart(product: Product) {
    setCart(prev => {
      const existItem = prev.find(item => item.product.id === product.id);

      if (!existItem) {
        return [...prev, { product, quantity: 1 }];
      }

      return prev.map(item => {
        if (item.product.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + 1
          };
        }
        return item;
      });
    });
  }

  function handleRemoveFromCart(productId: number) {
    setCart(prev => prev.filter(p => p.product.id !== productId));
  }

  const cartSum = cart.reduce((acc, p) => acc + p.product.price * p.quantity, 0);

  const countProducts = cart.reduce((acc, p) => acc + p.quantity, 0)

  return (
    <div className='pageContainer'>
      <Header cartCount={countProducts} cartSum={cartSum} />
      <Catalog onAddToCart={handleAddToCart} />
      <Cart onRemove={handleRemoveFromCart} items={cart} />
    </div>
  )
}

export default App
