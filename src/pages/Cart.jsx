import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext'

export default function Cart(){
  const { items, remove, checkout } = useContext(CartContext);
  return (
    <div className='p-12 max-w-4xl mx-auto'>
      <h2 className='text-2xl font-playfair mb-4'>Cart</h2>
      {items.length===0 && <div className='text-gray-400'>Your cart is empty.</div>}
      {items.map(i=>(
        <div key={i.productId} className='p-3 bg-zinc-900 rounded mb-2 flex justify-between'>
          <div>{i.name} x {i.quantity}</div>
          <div className='flex gap-3 items-center'>
            <div className='text-gold'>${(i.price*i.quantity).toFixed(2)}</div>
            <button onClick={()=>remove(i.productId)} className='text-red-400'>Remove</button>
          </div>
        </div>
      ))}
      {items.length>0 && <button onClick={checkout} className='bg-gold px-4 py-2 rounded mt-4 button-anim'>Checkout</button>}
    </div>
  )
}
