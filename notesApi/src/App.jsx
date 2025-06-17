import React, { useState } from 'react';
import NotesList from './components/NotesList';
import Banner from './components/Banner';
import './index.css';

const initialNotes = [
  {
    noteId: '1',
    title: 'Titel anteckning',
    text: 'Text anteckning lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    tags: ['react', 'demo'],
    createdAt: new Date().toISOString(),
    modifiedAt: new Date().toISOString(),
    authorName: 'Simon',
    authorAvatar: '',
  },
];

export default function App() {
  const [notes, setNotes] = useState(initialNotes);

  const handleEdit = (note) => alert(`Edit ${note.title}`);
  const handleDelete = (note) => alert(`Delete ${note.title}`);

  return (
    <div className='relative min-h-screen bg-white flex flex-col items-center'>
      <Banner />
      {/* Asides (optional) */}
      <div className='absolute top-0 left-0 h-full w-20 bg-gradient-to-b from-sky-100 to-white rounded-r-3xl shadow-lg opacity-70 -z-10' />
      <div className='absolute top-0 right-0 h-full w-20 bg-gradient-to-b from-rose-100 to-white rounded-l-3xl shadow-lg opacity-70 -z-10' />

      <main className='flex-1 w-full flex flex-col items-center justify-center py-8'>
        <NotesList notes={notes} onEdit={handleEdit} onDelete={handleDelete} />
      </main>
    </div>
  );
}
