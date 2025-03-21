import FinalResults from '@/app/components/FinalResult';
import { Suspense } from 'react';

// Server Component
export default async function FinalPage({
  searchParams,
}: {
  searchParams: Promise<{ winners?: string | string[] }>
}) {
  const params = await searchParams;
  const winnerIds = Array.isArray(params.winners) 
    ? params.winners[0]
    : params.winners;

  return (
    <Suspense fallback={<div>Loading results...</div>}>
      <FinalResults winnerIds={winnerIds} />
    </Suspense>
  );
}