'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { PAINT_OPTIONS, type PaintOption } from '@/app/utils/paintOptions';

type Round = {
  pairs: PaintOption[][];
  winners: PaintOption[];
  roundType?: 'main' | 'thirdPlace';
};

const shuffle = (array: PaintOption[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const generateInitialPairs = (images: PaintOption[]) => {
  const shuffled = shuffle([...images]);
  const pairs: PaintOption[][] = [];
  
  for (let i = 0; i < shuffled.length; i += 2) {
    const pair = [shuffled[i], shuffled[i + 1]];
    if (pair[0] && pair[1]) pairs.push(pair as PaintOption[]);
  }
  return pairs;
};

export default function Comparison() {
  const router = useRouter();
  const [history, setHistory] = useState<Round[]>([]);
  const [currentRound, setCurrentRound] = useState<Round>({ 
    pairs: [], 
    winners: [],
    roundType: 'main'
  });
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const [finalists, setFinalists] = useState<{
    first?: PaintOption;
    second?: PaintOption;
  }>({});

  useEffect(() => {
    if (PAINT_OPTIONS.length % 2 !== 0) return;
    
    if (currentRound.pairs.length === 0 && history.length === 0) {
      const initialPairs = generateInitialPairs(PAINT_OPTIONS);
      setCurrentRound({ pairs: initialPairs, winners: [], roundType: 'main' });
    }
  }, [history, currentRound.pairs.length]);

  const handleChoice = (winner: PaintOption) => {
    const newWinners = [...currentRound.winners, winner];
    const nextPairIndex = currentPairIndex + 1;

    // Handle current round progression
    if (nextPairIndex < currentRound.pairs.length) {
      setCurrentPairIndex(nextPairIndex);
      setCurrentRound(prev => ({ ...prev, winners: newWinners }));
      return;
    }

    // Round completion
    const completedRound = { ...currentRound, winners: newWinners };
    const newHistory = [...history, completedRound];
    
    // Main tournament complete
    if (completedRound.roundType === 'main' && newWinners.length === 1) {
      const first = newWinners[0];
      const second = completedRound.pairs[0].find(img => img.id !== first.id)!;
      
      // Get third place candidates from previous round
      const semiFinalRound = history[history.length - 1];
      const thirdPlaceOptions = semiFinalRound.pairs
        .flat()
        .filter(img => !semiFinalRound.winners.includes(img));

      if (thirdPlaceOptions.length === 2) {
        setFinalists({ first, second });
        setCurrentRound({
          pairs: [thirdPlaceOptions],
          winners: [],
          roundType: 'thirdPlace'
        });
        setCurrentPairIndex(0);
        setHistory(newHistory);
        return;
      }
    }

    // Third place playoff complete
    if (completedRound.roundType === 'thirdPlace') {
      router.push(`/final?winners=${encodeURIComponent(JSON.stringify([
        finalists.first?.id,
        finalists.second?.id,
        newWinners[0]?.id
      ]))}`);
      return;
    }

    // Start next round
    const nextPairs = generateInitialPairs(newWinners);
    if (nextPairs.length === 0) {
      console.error('Failed to generate next pairs');
      return;
    }
    
    setHistory(newHistory);
    setCurrentRound({ pairs: nextPairs, winners: [], roundType: 'main' });
    setCurrentPairIndex(0);
  };

  const currentPair = currentRound.pairs[currentPairIndex] || [];

  if (currentPair.length !== 2) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Tournament Error</h2>
          <p>Current pair count: {currentPair.length}</p>
          <p>History length: {history.length}</p>
          <p>Current round type: {currentRound.roundType}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-screen h-screen overflow-hidden">
      {/* Left Image */}
      <div 
        className="w-1/2 h-full cursor-pointer hover:opacity-75 transition-opacity relative"
        onClick={() => handleChoice(currentPair[0])}
      >
        <Image
          src={currentPair[0]}
          alt="Paint option 1"
          fill
          sizes="50vw"
          className="object-cover"
          priority
        />
        <div className="absolute bottom-0 left-0 p-2 bg-black bg-opacity-50 text-white">
          ID: {currentPair[0].id}
        </div>
      </div>

      {/* Right Image */}
      <div 
        className="w-1/2 h-full cursor-pointer hover:opacity-75 transition-opacity relative"
        onClick={() => handleChoice(currentPair[1])}
      >
        <Image
          src={currentPair[1]}
          alt="Paint option 2"
          fill
          sizes="50vw"
          className="object-cover"
          priority
        />
        <div className="absolute bottom-0 left-0 p-2 bg-black bg-opacity-50 text-white">
          ID: {currentPair[1].id}
        </div>
      </div>
    </div>
  );
}