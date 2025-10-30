import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import hero from '../assets/noir.jpg';

export default function Home(){
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-black text-white">
      <img src={hero} alt="hero" className="absolute inset-0 w-full h-full object-cover opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 to-black/70"></div>
      <motion.div className="relative z-10 px-6" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
        <h1 className="text-6xl md:text-8xl font-playfair text-gold mb-6">NOIRÉ</h1>
        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">Handcrafted luxury scented candles — crafted with care, designed to elevate every moment.</p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/products" className="bg-gold text-black px-8 py-3 rounded-full font-semibold shadow-lg transition">Explore Collection</Link>
        </motion.div>
      </motion.div>
      {/*<div className="absolute bottom-8 text-gray-400 text-sm">© 2025 NOIRE — Crafted with Passion</div>*/}
    </section>
  )
}
