"use client";
import { Suspense } from 'react';
import FinalResults from '@/app/components/FinalResult';

export default function FinalPage() {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<div className="text-center p-8">Loading results...</div>}>
        <FinalResultsLoader />
      </Suspense>
    </div>
  );
}

function FinalResultsLoader() {
  return <FinalResults />;
}