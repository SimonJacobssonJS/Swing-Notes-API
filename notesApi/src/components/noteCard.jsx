// src/components/NoteCard.jsx

export default function NoteCard({
  title,
  text,
  tags = [],
  createdAt,
  modifiedAt,
  author = { name: 'Anonymous', avatarUrl: '' },
  onEdit,
  onDelete,
}) {
  return (
    <div className='bg-white rounded-2xl shadow-md max-w-md mx-auto mb-6 p-6 border border-slate-100 hover:shadow-lg transition-shadow'>
      <div className='flex items-center mb-3'>
        <img
          src={author.avatarUrl || 'https://api.dicebear.com/7.x/personas/svg'}
          alt={author.name}
          className='w-10 h-10 rounded-full mr-3'
        />
        <div>
          <div className='text-sm font-semibold text-slate-700'>
            {author.name}
          </div>
          <div className='text-xs text-gray-400'>
            Created {new Date(createdAt).toLocaleString()}
          </div>
        </div>
        <div className='ml-auto flex gap-2'>
          <button
            className='p-2 rounded hover:bg-blue-100'
            onClick={onEdit}
            aria-label='Edit'>
            ✏️
          </button>
          <button
            className='p-2 rounded hover:bg-red-100'
            onClick={onDelete}
            aria-label='Delete'>
            🗑️
          </button>
        </div>
      </div>
      <h2 className='text-lg font-bold text-blue-700 mb-1'>{title}</h2>
      <p className='text-gray-800 mb-3 whitespace-pre-line'>{text}</p>
      <div className='flex flex-wrap gap-2 mb-2'>
        {tags.map((tag) => (
          <span
            key={tag}
            className='bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full'>
            #{tag}
          </span>
        ))}
      </div>
      <div className='text-xs text-gray-400 text-right'>
        Last updated: {new Date(modifiedAt).toLocaleString()}
      </div>
    </div>
  );
}
