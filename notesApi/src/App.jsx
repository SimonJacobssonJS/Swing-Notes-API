import { useState } from 'react';
import NotesList from './components/NotesList';
import React from 'react';
import './index.css';

// mockdata for now, will change later but simpler to start with static data
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
    <NotesList notes={notes} onEdit={handleEdit} onDelete={handleDelete} />
  );
}
