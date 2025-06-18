// src/components/Footer.jsx

export default function Footer() {
  return (
    <footer className='w-full bg-yellow-900 text-yellow-100 py-6'>
      <div className='max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center'>
        <div className='mb-4 md:mb-0'>
          <h2 className='text-lg font-bold'>Swing-Notes-API</h2>
          <p className='text-sm opacity-80'>
            Creating notes has never been easier
          </p>
        </div>
        <div className='flex gap-4 text-sm'>
          <a href='/privacy' className='hover:underline'>
            Privacy Policy
          </a>
          <a href='/terms' className='hover:underline'>
            Terms of Service
          </a>
          <a href='/contact' className='hover:underline'>
            Contact
          </a>
        </div>
      </div>
      <div className='mt-6 text-center text-xs opacity-70'>
        &copy; {new Date().getFullYear()} Swing-Notes. All rights reserved.
      </div>
    </footer>
  );
}
