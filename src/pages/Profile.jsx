import React, { useContext, useEffect, useState } from "react";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

const steps = ['Pending','Shipped','Out for Delivery','Delivered','Canceled'];

function Progress({ status }){
  const idx = steps.indexOf(status) >= 0 ? steps.indexOf(status) : 0;
  return (
    <div className='w-full bg-zinc-800 rounded h-2 overflow-hidden'>
      <div style={{ width: `${Math.max(0, ((idx+1)/steps.length)*100)}%` }} className='h-2 bg-gold transition-all'></div>
    </div>
  );
}

export default function Profile() {
  const { user, setUser } = useContext(AuthContext);
  const [tab, setTab] = useState("profile");
  const [form, setForm] = useState({ name: "", email: "" });
  const [passwords, setPasswords] = useState({ oldPassword: "", newPassword: "", confirm: "" });
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      setForm({ name: user.name, email: user.email });
      const token = localStorage.getItem('noire_token');
      api.get("/orders/my-orders", { headers: { Authorization: `Bearer ${token}` } }).then((res) => setOrders(res.data)).catch(()=>{});
    }
  }, [user]);

  const updateProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('noire_token');
    const res = await api.put("/users/update", form, { headers: { Authorization: `Bearer ${token}` }});
    setUser(res.data.user);
    alert("Profile updated!");
  };

  const changePassword = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirm) return alert("Passwords do not match!");
    const token = localStorage.getItem('noire_token');
    await api.put("/users/change-password", passwords, { headers: { Authorization: `Bearer ${token}` }});
    alert("Password changed!");
    setPasswords({ oldPassword: "", newPassword: "", confirm: "" });
  };

  const cancelOrder = async (id) => {
    if (!window.confirm("Cancel this order?")) return;
    const token = localStorage.getItem('noire_token');
    await api.put(`/orders/${id}/cancel`, {}, { headers: { Authorization: `Bearer ${token}` }});
    setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, status: "Canceled", tracking: [...(o.tracking||[]), { status: 'Canceled', date: new Date(), note: 'Canceled by user' }]} : o)));
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-playfair mb-6 text-gold">My Account</h2>
      <div className="flex gap-6 mb-8">
        <button onClick={() => setTab("profile")} className={`px-4 py-2 rounded ${tab === "profile" ? "bg-gold text-black" : "bg-zinc-900"}`}>Profile</button>
        <button onClick={() => setTab("password")} className={`px-4 py-2 rounded ${tab === "password" ? "bg-gold text-black" : "bg-zinc-900"}`}>Password</button>
        <button onClick={() => setTab("orders")} className={`px-4 py-2 rounded ${tab === "orders" ? "bg-gold text-black" : "bg-zinc-900"}`}>Orders</button>
      </div>
      {tab === "profile" && (
        <motion.form onSubmit={updateProfile} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-md space-y-4">
          <input className="w-full p-3 bg-zinc-900 rounded" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" />
          <input className="w-full p-3 bg-zinc-900 rounded" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" />
          <motion.button whileTap={{scale:0.97}} className="bg-gold px-4 py-2 rounded button-anim">Save</motion.button>
        </motion.form>
      )}
      {tab === "password" && (
        <motion.form onSubmit={changePassword} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-md space-y-4">
          <input type="password" className="w-full p-3 bg-zinc-900 rounded" placeholder="Old password" value={passwords.oldPassword} onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })} />
          <input type="password" className="w-full p-3 bg-zinc-900 rounded" placeholder="New password" value={passwords.newPassword} onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })} />
          <input type="password" className="w-full p-3 bg-zinc-900 rounded" placeholder="Confirm password" value={passwords.confirm} onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })} />
          <motion.button whileTap={{scale:0.97}} className="bg-gold px-4 py-2 rounded button-anim">Change Password</motion.button>
        </motion.form>
      )}
      {tab === "orders" && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {orders.length === 0 && <p className="text-gray-400">You have no orders yet.</p>}
          {orders.map((o) => (
            <div key={o._id} className="p-4 bg-zinc-900 rounded shadow">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-gold">Order #{o._id.slice(-6).toUpperCase()}</h4>
                <span className={`text-sm ${o.status === "Canceled" ? "text-red-400" : o.status === "Delivered" ? "text-green-400" : "text-gray-300"}`}>{o.status}</span>
              </div>
              <div className="text-gray-400 text-sm mb-2">{new Date(o.createdAt).toLocaleDateString()}</div>
              <div className="text-gray-200 mb-2">{o.products.map((p) => (<div key={p.productId}>{p.name} × {p.quantity}</div>))}</div>
              <div className="text-gold font-semibold mb-2">Total: ${o.totalAmount}</div>
              <Progress status={o.status} />
              <div className="mt-2">{o.tracking?.map((t,idx)=> (<div key={idx} className="text-sm text-gray-400">{t.status} — {new Date(t.date).toLocaleString()} {t.note?`(${t.note})`:''}</div>))}</div>
              {o.status === "Pending" && <motion.button whileTap={{scale:0.95}} onClick={() => cancelOrder(o._id)} className="text-sm text-red-400 hover:underline mt-2">Cancel Order</motion.button>}
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
