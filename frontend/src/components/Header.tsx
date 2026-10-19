type HeaderProps = {
  cartCount: number;
  cartSum: number;
};



export default function Header({cartCount, cartSum}: HeaderProps) {
   const formattedSum = new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      maximumFractionDigits: 0
   }).format(cartSum);

   return (
      <>
         <header>
            <div className="left-side-header">
               <h1>ПокупОЧКА</h1>
               <p>Твой магазин электроники</p>
            </div>
            <div className="right-side-header">
               <p>
                  Корзина: {cartCount}
               </p>
               <p>
                  Итоговая сумма: {formattedSum}
               </p>
            </div>
         </header>
      </>
   );
}