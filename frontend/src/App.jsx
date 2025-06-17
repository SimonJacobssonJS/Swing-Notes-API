import React, { useState, useEffect } from 'react';
import NotesList from './components/NotesList';
import Banner from './components/Banner';
import './index.css';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch notes from backend API
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/notes`)
      .then((res) => res.json())
      .then((data) => {
        setNotes(data); // adjust if your API response has a wrapper
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch notes:', err);
        setLoading(false);
      });
  }, []);

  const handleEdit = (note) => alert(`Edit ${note.title}`);
  const handleDelete = (note) => alert(`Delete ${note.title}`);

  if (loading) {
    return (
      <div className='text-gray-600 text-xl mt-10'>Laddar anteckningar...</div>
    );
  }

  return (
    <div className='relative min-h-screen bg-white flex flex-col items-center'>
      <Banner />
      <div className='absolute top-0 left-0 h-full w-20 bg-gradient-to-b from-sky-100 to-white rounded-r-3xl shadow-lg opacity-70 -z-10' />
      <div className='absolute top-0 right-0 h-full w-20 bg-gradient-to-b from-rose-100 to-white rounded-l-3xl shadow-lg opacity-70 -z-10' />

      <main className='flex-1 w-full flex flex-col items-center justify-center py-8'>
        <NotesList notes={notes} onEdit={handleEdit} onDelete={handleDelete} />
      </main>
    </div>
  );
}
