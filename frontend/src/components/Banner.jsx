// src/components/Banner.jsx
import { useNavigate } from 'react-router-dom';

export default function Banner({ isLoggedIn, onLogout }) {
  const navigate = useNavigate();

  const handleProfile = () => navigate('/');
  const handleLogin = () => navigate('/login');
  const handleSignup = () => navigate('/signup');

  return (
    <header className='w-full sticky top-0 z-30 bg-yellow-200 shadow-xl border-b-4 border-yellow-300'>
      <div className='max-w-6xl mx-auto px-6 pt-6 pb-3 flex flex-col md:flex-row md:items-center md:justify-between'>
        <div className='flex flex-col'>
          <span className='text-3xl md:text-5xl font-extrabold tracking-tight text-yellow-900 drop-shadow-sm'>
            Swing-Notes-API
          </span>
          <span className='text-sm md:text-lg font-medium text-yellow-700 opacity-80 italic mt-1'>
            Organizing your life, made easy.
          </span>
        </div>
        <div className='mt-4 md:mt-0 flex gap-4'>
          {isLoggedIn ? (
            <>
              <button
                onClick={handleProfile}
                className='bg-yellow-50 hover:bg-yellow-100 text-yellow-900 font-bold px-5 py-2 rounded-lg shadow border-2 border-yellow-300 flex items-center gap-2 transition-all duration-150 active:scale-95'>
                <span role='img' aria-label='profile'>
                  👤
                </span>
                Profil
              </button>
              <button
                onClick={onLogout}
                className='bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-bold px-6 py-2 rounded-lg shadow border-2 border-yellow-300 transition-all duration-150 active:scale-95'>
                Logga ut
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleLogin}
                className='bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-bold px-6 py-2 rounded-lg shadow border-2 border-yellow-300 transition-all duration-150 active:scale-95'>
                Logga in
              </button>
              <button
                onClick={handleSignup}
                className='bg-yellow-100 hover:bg-yellow-50 text-yellow-900 font-bold px-6 py-2 rounded-lg shadow border-2 border-yellow-300 transition-all duration-150 active:scale-95'>
                Skapa konto
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
