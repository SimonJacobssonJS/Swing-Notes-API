import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import NotesList from './components/NotesList';
import Banner from './components/Banner';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { useEffect, useState } from 'react';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('jwt'));

  useEffect(() => {
    setToken(localStorage.getItem('jwt'));
  }, []);

  //tokens and remove when logout
  const isAuthenticated = !!token;
  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setToken(null);
  };

  return (
    <Router>
      <div className='relative min-h-screen bg-white flex flex-col items-center'>
        <Banner isLoggedIn={isAuthenticated} onLogout={handleLogout} />
        <div className='absolute top-0 left-0 h-full w-20 bg-gradient-to-b from-sky-100 to-white rounded-r-3xl shadow-lg opacity-70 -z-10' />
        <div className='absolute top-0 right-0 h-full w-20 bg-gradient-to-b from-rose-100 to-white rounded-l-3xl shadow-lg opacity-70 -z-10' />

        <main className='flex-1 w-full flex flex-col items-center justify-center py-8'>
          <Routes>
            <Route
              path='/'
              element={
                isAuthenticated ? (
                  <NotesListWrapper />
                ) : (
                  <Navigate to='/login' replace />
                )
              }
            />
            <Route
              path='/login'
              element={
                <LoginPage
                  onLogin={() => setToken(localStorage.getItem('jwt'))}
                />
              }
            />
            <Route path='/signup' element={<SignupPage />} />
            <Route
              path='*'
              element={
                isAuthenticated ? (
                  <Navigate to='/' replace />
                ) : (
                  <Navigate to='/login' replace />
                )
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

// This wrapper handles fetching notes
function NotesListWrapper() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      console.warn('❌ Ingen JWT hittades i localStorage');
      setLoading(false);
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/notes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('⛔ Unauthorized or fetch error');
        return res.json();
      })
      .then((data) => {
        setNotes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('❌ Kunde inte hämta några anteckningar:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className='text-gray-600 text-xl mt-10'>Laddar anteckningar...</div>
    );
  }

  return (
    <NotesList
      notes={notes}
      onEdit={(note) => alert(`Edit ${note.title}`)}
      onDelete={(note) => alert(`Delete ${note.title}`)}
    />
  );
}
