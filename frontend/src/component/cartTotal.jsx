import React from 'react'
import { shopDataContext } from '../context/ShopContext.jsx'
import Tittle from './Tittle';

function cartTotal() {
    const {delivery_fee, currency, getCartAmount } = React.useContext(shopDataContext);
  return (
    <div className='w-full lg:ml-8'>
      <div className='text-xl py-2.5'>
        <Tittle text1={'CART'} text2={'TOTAL'}/>
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm p-[30px] border-[2px] border-[#4d8890] rounded-md">
  <div className="flex justify-between text-white text-[18px] p-[10px]">
    <p>Subtotal</p>
    <p>{currency} {getCartAmount()}.00</p>
  </div>
  <hr />

    <div className="flex justify-between text-white text-[18px] p-[10px]">
        <p>Shipping Fee</p>
        <p>{currency} {delivery_fee}.00</p>
    </div>
    <hr />
    <div className="flex justify-between text-white text-[18px] font-bold p-[10px]">
        <b>Total</b>
        <b>{currency} {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00</b>
    </div>
</div>

    </div>
  )
}

export default cartTotal
