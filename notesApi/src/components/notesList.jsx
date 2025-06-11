// src/components/NotesList.jsx

import NoteCard from './components/NoteCard';

export default function NotesList({ notes, onEdit, onDelete }) {
  return (
    <div className='p-8 bg-slate-50 min-h-screen'>
      <h1 className='text-2xl font-bold mb-8'>Dina anteckningar</h1>
      <div className='grid gap-6 md:grid-cols-2'>
        {notes.map((note) => (
          <NoteCard
            key={note.noteId}
            title={note.title}
            text={note.text}
            tags={note.tags || ['work', 'important']}
            createdAt={note.createdAt}
            modifiedAt={note.modifiedAt}
            author={{
              name: note.authorName || 'Anonymous',
              avatarUrl: note.authorAvatar || '',
            }}
            onEdit={() => onEdit(note)}
            onDelete={() => onDelete(note)}
          />
        ))}
      </div>
    </div>
  );
}
