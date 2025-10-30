import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import { motion } from 'framer-motion';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('noire_token');
    api
      .get('/orders/all', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((r) => setOrders(r.data))
      .catch(() => {});
  }, []);

  const updateStatus = async (id, status) => {
    const note = prompt('Optional note for tracking update:') || '';
    const token = localStorage.getItem('noire_token');

    await api.put(
      `/orders/${id}/status`,
      { status, note },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setOrders((o) =>
      o.map((x) =>
        x._id === id
          ? {
              ...x,
              status,
              tracking: [
                ...(x.tracking || []),
                { status, date: new Date(), note },
              ],
            }
          : x
      )
    );
  };

  return (
    <div>
      <h3 className='mb-4 text-xl font-semibold text-gold'>Orders</h3>

      <div className='space-y-4'>
        {orders.map((o) => (
          <div key={o._id} className='p-4 bg-zinc-900 rounded'>
            <div className='flex justify-between'>
              <div className='font-semibold text-gold'>
                Order #{o._id.slice(-6).toUpperCase()}
              </div>
              <div className='text-sm'>{o.status}</div>
            </div>

            <div className='text-sm text-gray-400'>
              User: {o.userId?.name || o.userId?.email}
            </div>

            <div className='mt-2'>
              Total:{' '}
              <span className='text-gold font-semibold'>${o.totalAmount}</span>
            </div>

            <div className='mt-3 flex gap-2'>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => updateStatus(o._id, 'Shipped')}
                className='px-3 py-1 bg-blue-600 rounded hover:bg-blue-700 transition'
              >
                Mark Shipped
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => updateStatus(o._id, 'Out for Delivery')}
                className='px-3 py-1 bg-amber-500 rounded hover:bg-amber-600 transition'
              >
                Out for Delivery
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => updateStatus(o._id, 'Delivered')}
                className='px-3 py-1 bg-green-600 rounded hover:bg-green-700 transition'
              >
                Delivered
              </motion.button>
            </div>

            {o.tracking?.length > 0 && (
              <div className='mt-3 text-sm text-gray-300'>
                <strong>Tracking:</strong>
                <ul className='list-disc ml-6'>
                  {o.tracking.map((t, idx) => (
                    <li key={idx}>
                      {t.status} — {new Date(t.date).toLocaleString()}{' '}
                      {t.note ? `(${t.note})` : ''}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
