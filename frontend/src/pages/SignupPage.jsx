// src/pages/SignupPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
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
        setError(data.message || 'Registrering misslyckades');
      }
    } catch {
      setError('Nätverksfel, försök igen');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='max-w-md mx-auto mt-10'>
      <h2 className='text-2xl font-bold mb-4'>Skapa konto</h2>

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
        Skapa konto
      </button>
    </form>
  );
}
