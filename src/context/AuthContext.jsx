import React, { createContext, useState, useEffect } from 'react';
import api from '../utils/api';
export const AuthContext = createContext();
export function AuthProvider({ children }){
  const [user, setUser] = useState(null);
  useEffect(()=>{
    const token = localStorage.getItem('noire_token');
    if(token){ api.get('/auth/me', { headers: { Authorization: `Bearer ${token}` }}).then(r=> setUser(r.data)).catch(()=> setUser(null)); }
  },[]);
  const logout = ()=>{ localStorage.removeItem('noire_token'); setUser(null); }
  return <AuthContext.Provider value={{ user, setUser, logout }}>{children}</AuthContext.Provider>
}
