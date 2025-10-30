import React, { useEffect, useState } from 'react'
import api from '../utils/api'
import ProductCard from '../components/ProductCard'

export default function Products(){
  const [products,setProducts]=useState([]);
  useEffect(()=>{ api.get('/products').then(r=>setProducts(r.data)).catch(()=>{}) },[])
  return (
    <div className='py-12 max-w-7xl mx-auto grid md:grid-cols-3 gap-6'>
      {products.map(p=> <ProductCard key={p._id} product={p} />)}
    </div>
  )
}
