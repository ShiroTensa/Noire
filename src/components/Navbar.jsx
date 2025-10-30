import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { CartContext } from '../context/CartContext'
import { motion } from 'framer-motion'
export default function Navbar(){
  const { user, logout } = useContext(AuthContext)
  const { items } = useContext(CartContext)
  const nav = useNavigate()
  return (
    <header className='bg-black border-b border-gray-800 text-gray-100'>
      <div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between'>
        <Link to='/' className='text-2xl font-playfair text-gold'>NOIRE</Link>
        <nav className='flex items-center space-x-6 uppercase text-sm'>
          <Link to='/products' className='hover:text-gold transition'>Shop</Link>
          <Link to='/cart' className='hover:text-gold transition'>Cart{items.length>0 && <span className='ml-2 text-xs bg-gold text-black rounded px-2'>{items.length}</span>}</Link>
          {user ? (
            <>
              <Link to='/profile' className='hover:text-gold transition'>Account</Link>
              {user.role==='admin' && <Link to='/admin' className='hover:text-gold transition'>Admin</Link>}
              <motion.button onClick={()=>{ logout(); nav('/') }} className='hover:text-gold transition button-anim' whileTap={{scale:0.97}}>Disconnect</motion.button>
            </>
          ) : (
            <div className='flex items-center gap-3'>
              <Link to='/login' className='hover:text-gold transition'>Login</Link>
              <motion.div whileHover={{scale:1.03}}><Link to='/signup' className='border border-gold px-3 py-1 rounded text-gold hover:bg-gold hover:text-black transition-all duration-300'>Sign Up</Link></motion.div>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
