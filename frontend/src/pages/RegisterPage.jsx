import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.success) {
      navigate('/login');
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-purple-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center text-purple-700">Sign Up for ReWear</h2>
        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Name" required className="w-full border p-2 rounded" />
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" required className="w-full border p-2 rounded" />
        <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" required className="w-full border p-2 rounded" />
        <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;