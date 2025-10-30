import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CartContext } from '../context/CartContext'
export default function ProductCard({ product }){
  const { add } = useContext(CartContext)
  return (
    <motion.div whileHover={{scale:1.02}} className='bg-zinc-900 p-4 rounded-xl shadow hover:shadow-lg transition'>
      <Link to={`/product/${product._id}`}>
        <img src={product.imageURL || '/src/assets/hero.jpg'} alt={product.name} className='rounded-xl h-64 w-full object-cover' />
        <div className='mt-3 text-center'>
          <h3 className='text-lg font-playfair text-white'>{product.name}</h3>
          <p className='text-sm text-gray-400'>{product.fragrance}</p>
          <p className='text-gold font-semibold mt-1'>${product.price}</p>
        </div>
      </Link>
      <div className='mt-3 flex justify-center'>
        <motion.button onClick={()=>add(product)} whileTap={{scale:0.98}} className='bg-gold text-black px-4 py-2 rounded hover:scale-105 transition button-anim'>Add to Cart</motion.button>
      </div>
    </motion.div>
  )
}
