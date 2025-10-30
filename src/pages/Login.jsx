import React, { useState, useContext } from 'react'
import api from '../utils/api'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const { setUser } = useContext(AuthContext);
  const nav = useNavigate();

  const submit=async e=>{
    e.preventDefault();
    try{
      const res = await api.post('/auth/login',{ email, password });
      localStorage.setItem('noire_token', res.data.token);
      setUser(res.data.user);
      nav('/');
    }catch(err){ alert(err.response?.data?.message || 'Login failed') }
  };

  return (
    <div className='p-12 max-w-md mx-auto'>
      <h2 className='text-2xl font-playfair mb-4'>Login</h2>
      <form onSubmit={submit} className='space-y-3'>
        <input className='w-full p-2 bg-zinc-900 rounded' value={email} onChange={e=>setEmail(e.target.value)} placeholder='Email' />
        <input type='password' className='w-full p-2 bg-zinc-900 rounded' value={password} onChange={e=>setPassword(e.target.value)} placeholder='Password' />
        <button className='bg-gold px-4 py-2 rounded'>Login</button>
      </form>
    </div>
  )
}
