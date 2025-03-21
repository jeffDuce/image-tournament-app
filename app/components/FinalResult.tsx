'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { PAINT_OPTIONS, type PaintOption } from '@/app/utils/paintOptions';


export default function FinalResults({ winnerIds }: { winnerIds?: string }) {
  const [winners, setWinners] = useState<PaintOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!winnerIds) {
      console.error('No winner IDs provided');
      setIsLoading(false);
      return;
    }

    try {
      const parsedIds: string[] = JSON.parse(decodeURIComponent(winnerIds));
      const validWinners = parsedIds
        .map(id => PAINT_OPTIONS.find(img => img.id === id))
        .filter((img): img is PaintOption => !!img);

      setWinners(validWinners);
    } catch (error) {
      console.error('Error parsing winners:', error);
    } finally {
      setIsLoading(false);
    }
  }, [winnerIds]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading results...</h2>
          <p>Please wait while we load the tournament results</p>
        </div>
      </div>
    );
  }

  // Update the validation check
  if (winners.length < 3) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Complete Results Unavailable</h2>
          <p className="mb-2">Final Results:</p>
          <div className="space-y-2">
            <p>🏆 Winner: {winners[0]?.id || 'Unknown'}</p>
            <p>🥈 Second: {winners[1]?.id || 'Unknown'}</p>
            <p>🥉 Third: {winners[2]?.id || 'Not determined'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8">Final Results!</h1>
      
      <div className="mb-12 w-96 h-96 relative">
        <h2 className="text-2xl font-semibold mb-4">Winner</h2>
        <Image
          src={winners[0]}
          alt="Winning paint option"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover rounded-lg shadow-xl"
          priority
        />
        <div className="absolute bottom-0 left-0 p-2 bg-black bg-opacity-50 text-white">
          ID: {winners[0].id}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 w-full max-w-4xl">
        <div>
          <h3 className="text-xl font-semibold mb-2">Second Place</h3>
          <div className="w-full aspect-square relative">
            <Image 
              src={winners[1]} 
              fill 
              className="object-cover" 
              alt="Second place"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
            <div className="absolute bottom-0 left-0 p-2 bg-black bg-opacity-50 text-white">
              ID: {winners[1].id}
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Third Place</h3>
          {winners[2] ? (
            <div className="w-full aspect-square relative">
              <Image 
                src={winners[2]} 
                fill 
                className="object-cover" 
                alt="Third place"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute bottom-0 left-0 p-2 bg-black bg-opacity-50 text-white">
                ID: {winners[2].id}
              </div>
            </div>
          ) : (
            <div className="text-gray-500 h-full flex items-center justify-center">
              No third place determined
            </div>
          )}
        </div>
      </div>
    </div>
  );
}