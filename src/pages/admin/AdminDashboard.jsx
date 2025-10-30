import React, { useState } from 'react'
import AdminProducts from './AdminProducts'
import AdminClients from './AdminClients'
import AdminOrders from './AdminOrders'
export default function AdminDashboard(){ const [tab,setTab]=useState('products'); return (<div className='p-12 max-w-7xl mx-auto'><h2 className='text-3xl font-playfair mb-4 text-gold'>Admin</h2><div className='flex gap-3 mb-4'><button onClick={()=>setTab('products')} className={tab==='products'?'bg-gold text-black px-3 py-1 rounded':'bg-zinc-900 px-3 py-1 rounded'}>Products</button><button onClick={()=>setTab('clients')} className={tab==='clients'?'bg-gold text-black px-3 py-1 rounded':'bg-zinc-900 px-3 py-1 rounded'}>Clients</button><button onClick={()=>setTab('orders')} className={tab==='orders'?'bg-gold text-black px-3 py-1 rounded':'bg-zinc-900 px-3 py-1 rounded'}>Orders</button></div>{tab==='products'&&<AdminProducts/>}{tab==='clients'&&<AdminClients/>}{tab==='orders'&&<AdminOrders/>}</div>) }
