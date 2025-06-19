import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import NotesList from './components/NotesList';
import AddNoteForm from './components/AddNoteForm';
import Banner from './components/Banner';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Footer from './components/Footer';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('jwt'));

  useEffect(() => {
    setToken(localStorage.getItem('jwt'));
  }, []);

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
        <Footer />
      </div>
    </Router>
  );
}

// 🧠 Debounce Hook
function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}

function NotesListWrapper() {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('jwt');

  const fetchNotes = async () => {
    if (!token) return;
    try {
      const url = debouncedSearch
        ? `${import.meta.env.VITE_API_URL}/notes?query=${encodeURIComponent(
            debouncedSearch
          )}`
        : `${import.meta.env.VITE_API_URL}/notes`;

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('Failed to fetch notes');
      const data = await res.json();
      setNotes(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [debouncedSearch]);

  const addNote = async (title, text) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/notes`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, text }),
    });
    if (res.ok) {
      const newNote = await res.json();
      setNotes((prev) => [newNote, ...prev]);
    } else {
      alert('Failed to create note');
    }
  };

  const updateNote = async (note, newTitle, newText) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/notes/${note.noteId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTitle, text: newText }),
      }
    );
    if (res.ok) {
      const updated = await res.json();
      setNotes((prev) =>
        prev.map((n) => (n.noteId === note.noteId ? updated : n))
      );
    } else {
      alert('Failed to update note');
    }
  };

  const deleteNote = async (note) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/notes/${note.noteId}`,
      {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (res.ok) {
      setNotes((prev) => prev.filter((n) => n.noteId !== note.noteId));
    } else {
      alert('Failed to delete note');
    }
  };

  if (loading)
    return (
      <div className='text-gray-600 text-xl mt-10'>Laddar anteckningar...</div>
    );

  return (
    <>
      <div className='w-full max-w-md mb-4'>
        <input
          id='search'
          name='search'
          type='text'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Sök efter titel...'
          className='w-full p-2 border border-gray-300 rounded-lg shadow-sm'
        />
      </div>

      <AddNoteForm onAdd={addNote} />

      {notes.length === 0 ? (
        <div className='text-gray-500 text-lg mt-4 italic'>
          {searchTerm
            ? 'Inga anteckningar matchade din sökning.'
            : 'Du har inga anteckningar ännu.'}
        </div>
      ) : (
        <NotesList
          notes={notes}
          onEdit={(n) => {
            const newTitle = prompt('Ny titel:', n.title);
            const newText = prompt('Ny text:', n.text);
            if (newTitle != null && newText != null)
              updateNote(n, newTitle, newText);
          }}
          onDelete={(n) => {
            if (confirm(`Ta bort anteckning "${n.title}"?`)) deleteNote(n);
          }}
        />
      )}
    </>
  );
}
