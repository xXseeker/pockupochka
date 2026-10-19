import './App.css'
import Catalog from './components/Catalog'
import Header from './components/Header'
import type { Product } from './types/product';
import { useState } from 'react';

function App() {
  const [cart, setCart] = useState<Product[]>([]);

  function handleAddToCart (product: Product){
    setCart(prev => [...prev, product]);
  } 

  const cartSum = cart.reduce( (acc, p) =>  acc + p.price , 0);

  

  return (
    <>
      <Header cartCount={cart.length} cartSum = {cartSum}/>
      <Catalog onAddToCart = {handleAddToCart}/>
    </>
  )
}

export default App
