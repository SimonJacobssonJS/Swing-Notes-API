import NoteCard from './NoteCard';

export default function NotesList({ notes, onEdit, onDelete }) {
  return (
    <div className='bg-white flex flex-col items-center justify-center py-8'>
      <h1 className='text-2xl font-bold mb-4 text-gray-800'>
        Alla anteckningar
      </h1>
      <div className='grid gap-6 w-full max-w-6xl md:grid-cols-2 lg:grid-cols-3 grid-cols-1'>
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
