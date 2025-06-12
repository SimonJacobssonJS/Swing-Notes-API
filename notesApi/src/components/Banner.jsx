// src/components/Banner.jsx
export default function Banner() {
  return (
    <header className='w-full sticky top-0 z-20 bg-gradient-to-r from-indigo-500 via-sky-500 to-pink-400 shadow-md'>
      <div className='max-w-6xl mx-auto px-4 py-4 flex items-center justify-between'>
        <span className='text-2xl md:text-3xl font-extrabold tracking-tight text-white drop-shadow'>
          Swing-Notes-API
        </span>
        <span className='text-xs md:text-base font-medium text-rose-100 opacity-70 hidden sm:inline'>
          The future of notes—2025
        </span>
      </div>
    </header>
  );
}
