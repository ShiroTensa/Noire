import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Cart from "./pages/Cart.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Profile from "./pages/Profile.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AddEditProduct from "./pages/admin/AddEditProduct.jsx";
import Footer from "./components/Footer.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";

export default function App(){
  return (
    <AuthProvider>
      <CartProvider>
        <div className='min-h-screen bg-black text-white flex flex-col'>
          <Navbar />
          <main className='flex-1'>
            <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='/products' element={<Products/>} />
              <Route path='/product/:id' element={<ProductDetail/>} />
              <Route path='/cart' element={<Cart/>} />
              <Route path='/login' element={<Login/>} />
              <Route path='/signup' element={<Signup/>} />
              <Route path='/profile' element={<Profile/>} />
              <Route path='/admin' element={<AdminDashboard/>} />
              <Route path='/admin/add' element={<AddEditProduct/>} />
              <Route path='/admin/edit/:id' element={<AddEditProduct/>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  )
}
