import React, { useState, useContext } from 'react'
import api from '../utils/api'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Signup(){
  const [name,setName]=useState(''); const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
  const { setUser } = useContext(AuthContext); const nav = useNavigate();

  const submit=async e=>{ e.preventDefault(); try{ const res = await api.post('/auth/register',{ name, email, password }); localStorage.setItem('noire_token', res.data.token); setUser(res.data.user); nav('/'); }catch(err){ alert(err.response?.data?.message || 'Registration failed') } };

  return (
    <div className='p-12 max-w-md mx-auto'>
      <h2 className='text-2xl font-playfair mb-4'>Create account</h2>
      <form onSubmit={submit} className='space-y-3'>
        <input className='w-full p-2 bg-zinc-900 rounded' placeholder='Name' value={name} onChange={e=>setName(e.target.value)} />
        <input className='w-full p-2 bg-zinc-900 rounded' placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)} />
        <input type='password' className='w-full p-2 bg-zinc-900 rounded' placeholder='Password' value={password} onChange={e=>setPassword(e.target.value)} />
        <button className='bg-gold px-4 py-2 rounded'>Register</button>
      </form>
    </div>
  )
}
