import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import { motion } from 'framer-motion';

export default function AdminClients() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('noire_token');
    api
      .get('/admin/users', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((r) => setUsers(r.data))
      .catch(() => {});
  }, []);

  const remove = async (id) => {
    if (!confirm('Delete user?')) return;

    const token = localStorage.getItem('noire_token');
    await api.delete(`/admin/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setUsers((u) => u.filter((x) => x._id !== id));
  };

  return (
    <div>
      <h3 className='mb-4 text-xl font-semibold text-gold'>Clients</h3>

      <div className='grid md:grid-cols-2 gap-4'>
        {users.map((u) => (
          <div
            key={u._id}
            className='p-3 bg-zinc-900 rounded flex justify-between items-center hover:shadow-lg hover:shadow-gold/10 transition'
          >
            <div>
              <div className='font-semibold'>{u.name}</div>
              <div className='text-sm text-gray-400'>{u.email}</div>
              <div className='text-sm text-gray-500'>{u.role}</div>
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => remove(u._id)}
              className='px-3 py-1 bg-red-600 rounded hover:bg-red-700 transition'
            >
              Delete
            </motion.button>
          </div>
        ))}
      </div>
    </div>
  );
}
