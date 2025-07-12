import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full mb-4 p-3 border rounded"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-violet-600 text-white p-3 rounded hover:bg-violet-700">
          Register
        </button>
        <p className="text-sm mt-4 text-center">
          Already have an account? <a href="/login" className="text-violet-600">Login</a>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
