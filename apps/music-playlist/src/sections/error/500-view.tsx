'use client';

import { paths } from '@/routes/paths';
import Link from 'next/link';

// ----------------------------------------------------------------------

export default function Page500() {
  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center text-white">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-400">500</h1>
        <h2 className="text-3xl font-semibold mt-4">Something Went Wrong</h2>
        <p className="text-gray-400 mt-2 max-w-md mx-auto">
          We&apos;re sorry, but something broke on our end. Our team has been
          notified, and we&apos;re working to fix it.
        </p>
        <div className="mt-6 space-x-4">
          <Link
            href={paths.home}
            className="inline-block px-6 py-3 bg-green-500 text-black font-semibold rounded-full hover:bg-green-600 transition"
          >
            Go Back Home
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="inline-block px-6 py-3 border border-gray-400 text-gray-400 font-semibold rounded-full hover:bg-gray-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
