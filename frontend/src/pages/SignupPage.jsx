// src/pages/SignupPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignupPage({ onSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${import.meta.env.VITE_API_URL}/user/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      alert('Konto skapat! Du kan nu logga in.');
      navigate('/login');
    } else {
      alert(data.message || 'Registrering misslyckades');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='max-w-md mx-auto mt-10'>
      <h2 className='text-2xl font-bold mb-4'>Skapa konto</h2>
      <input
        type='email'
        placeholder='E-post'
        className='w-full p-2 border mb-2'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type='password'
        placeholder='Lösenord'
        className='w-full p-2 border mb-4'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type='submit' className='bg-yellow-400 px-4 py-2 rounded'>
        Skapa konto
      </button>
    </form>
  );
}
