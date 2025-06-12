import NoteCard from './NoteCard';

export default function NotesList({ notes, onEdit, onDelete }) {
  return (
    <div className='min-h-screen bg-slate-50 flex flex-col items-center justify-center py-8'>
      <h1 className='text-2xl font-bold mb-8'>Alla anteckningar</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl'>
        {notes.map((note) => (
          <NoteCard
            key={note.noteId}
            {...note}
            onEdit={() => onEdit(note)}
            onDelete={() => onDelete(note)}
          />
        ))}
      </div>
    </div>
  );
}
