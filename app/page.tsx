'use client';

import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8">Gym Paint Chooser</h1>
      <p className="text-lg text-gray-600 mb-8 max-w-2xl text-center">
        Help us choose the best paint scheme for our new gym! You&apos;ll be shown pairs of options - 
        click your preferred one each time. At the end, we&apos;ll see which option wins!
      </p>
      <button
        onClick={() => router.push('/comparison')}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Start Choosing
      </button>
    </div>
  );
}