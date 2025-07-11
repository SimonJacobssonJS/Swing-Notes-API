// src/pages/LoginPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // ✅ error state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // reset previous error

    const res = await fetch(`${import.meta.env.VITE_API_URL}/user/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('jwt', data.token);
      onLogin();
      navigate('/');
    } else {
      setError(data.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='max-w-md mx-auto mt-10'>
      <h2 className='text-2xl font-bold mb-4'>Logga in</h2>

      <input
        type='email'
        placeholder='E‑post'
        className='w-full p-2 border mb-2'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type='password'
        placeholder='Lösenord'
        className='w-full p-2 border mb-2'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <div className='text-red-600 mb-4'>{error}</div>}

      <button
        type='submit'
        className='bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-bold w-full py-2 rounded transition-all duration-150 active:scale-95'>
        Logga in
      </button>
    </form>
  );
}
