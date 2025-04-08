'use client';

import { paths } from '@/routes/paths';
import Link from 'next/link';

// ----------------------------------------------------------------------

export default function View403() {
  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center text-white">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-400">403</h1>
        <h2 className="text-3xl font-semibold mt-4">Access Denied</h2>
        <p className="text-gray-400 mt-2 max-w-md mx-auto">
          Sorry, you don&apos;t have permission to access this page. If you
          believe this is a mistake, please contact support.
        </p>
        <Link
          href={paths.home}
          className="mt-6 inline-block px-6 py-3 bg-green-500 text-black font-semibold rounded-full hover:bg-green-600 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
