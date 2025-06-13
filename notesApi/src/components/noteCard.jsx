// src/components/NoteCard.jsx

export default function NoteCard({
  title,
  text,
  tags = [],
  createdAt,
  modifiedAt,
  onEdit,
  onDelete,
}) {
  return (
    <div
      className='
        bg-yellow-100 
        rounded-lg 
        shadow-lg 
        max-w-xs 
        mx-auto 
        p-4 
        border-2 
        border-yellow-200 
        hover:shadow-2xl 
        transition-shadow
        transform
        -rotate-2
        hover:rotate-0
        relative
        before:absolute
        before:-top-2 before:right-3 before:w-8 before:h-2 before:bg-yellow-300 before:rounded-full before:blur-sm before:opacity-40
      '
      style={{
        minHeight: '200px',
      }}>
      <div className='flex justify-between items-center mb-2'>
        <div>
          <div className='text-[10px] text-gray-400'>
            {new Date(createdAt).toLocaleDateString()}
          </div>
        </div>
        <div className='flex gap-1'>
          <button
            className='p-1 rounded hover:bg-yellow-200'
            onClick={onEdit}
            aria-label='Edit'>
            ✏️
          </button>
          <button
            className='p-1 rounded hover:bg-yellow-200'
            onClick={onDelete}
            aria-label='Delete'>
            🗑️
          </button>
        </div>
      </div>
      <h2 className='text-base font-semibold text-yellow-800 mb-1'>{title}</h2>
      <p className='text-gray-700 text-sm mb-2 whitespace-pre-line'>{text}</p>
      <div className='flex flex-wrap gap-1 mb-1'>
        {tags.map((tag) => (
          <span
            key={tag}
            className='bg-yellow-200 text-yellow-900 text-[10px] font-medium px-2 py-0.5 rounded-full'>
            #{tag}
          </span>
        ))}
      </div>
      <div className='text-[10px] text-gray-300 text-right italic'>
        Last updated: {new Date(modifiedAt).toLocaleDateString()}
      </div>
    </div>
  );
}
