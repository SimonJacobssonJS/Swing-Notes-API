// src/components/AddNoteForm.jsx
import { useState } from 'react';

export default function AddNoteForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !text) return alert('Var vänlig fyll i alla fält.');
    onAdd(title, text);
    setTitle('');
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className='max-w-lg w-full mb-6'>
      <input
        type='text'
        placeholder='Titel'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className='w-full p-2 border mb-2'
      />
      <textarea
        placeholder='Text'
        value={text}
        onChange={(e) => setText(e.target.value)}
        className='w-full p-2 border mb-2'
      />
      <button
        type='submit'
        className='bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-bold w-full py-2 rounded'>
        Skapa anteckning
      </button>
    </form>
  );
}
