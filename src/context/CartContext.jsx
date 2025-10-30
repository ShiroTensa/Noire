import React, { createContext, useState, useEffect } from 'react';
import api from '../utils/api';
export const CartContext = createContext();
export function CartProvider({ children }){
  const [items, setItems] = useState(()=>{ try{ return JSON.parse(localStorage.getItem('noire_cart')||'[]')}catch{return []} });
  useEffect(()=> localStorage.setItem('noire_cart', JSON.stringify(items)), [items]);
  const add=(product,qty=1)=> setItems(prev=>{ const found=prev.find(p=>p.productId===product._id); if(found) return prev.map(p=>p.productId===product._id?{...p,quantity:p.quantity+qty}:p); return [...prev,{ productId:product._id,name:product.name,price:product.price,imageURL:product.imageURL,quantity:qty }] });
  const remove=(id)=> setItems(prev=> prev.filter(p=>p.productId!==id));
  const clear=()=> setItems([]);
  const checkout=async ()=>{ const payload={ products: items.map(i=>({ productId:i.productId, name:i.name, price:i.price, quantity:i.quantity })), totalAmount: items.reduce((s,i)=>s+i.price*i.quantity,0) }; const token = localStorage.getItem('noire_token'); const res = await api.post('/orders', payload, { headers: { Authorization: `Bearer ${token}` }}); clear(); return res.data; };
  return <CartContext.Provider value={{ items, add, remove, clear, checkout }}>{children}</CartContext.Provider>
}
