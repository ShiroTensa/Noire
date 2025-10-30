import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import api from '../utils/api'
import { CartContext } from '../context/CartContext'

export default function ProductDetail(){
  const { id } = useParams();
  const [product,setProduct]=useState(null);
  const { add } = useContext(CartContext);
  useEffect(()=>{ api.get(`/products/${id}`).then(r=>setProduct(r.data)).catch(()=>{}) },[id]);
  if(!product) return <div className='p-12'>Loading...</div>;
  return (
    <div className='p-12 max-w-4xl mx-auto grid md:grid-cols-2 gap-6'>
      <img src={product.imageURL||'/src/assets/hero.jpg'} className='rounded' alt={product.name}/>
      <div>
        <h2 className='text-2xl font-playfair'>{product.name}</h2>
        <p className='text-gray-300'>{product.fragrance}</p>
        <div className='text-gold mt-4'>${product.price}</div>
        <p className='mt-4 text-gray-200'>{product.description}</p>
        <button onClick={()=>add(product)} className='bg-gold px-4 py-2 rounded mt-4 button-anim'>Add to cart</button>
      </div>
    </div>
  )
}
