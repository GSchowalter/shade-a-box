
// File: app/page.js
"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamically import the Canvas component to avoid SSR issues
const LightRoomScene = dynamic(() => import('../components/LightRoomScene'), {
  ssr: false,
  loading: () => <div className="w-full h-screen flex items-center justify-center">Loading 3D Scene...</div>
});

export default function Home() {
  return (
    <main className="min-h-screen w-full">
      <Suspense fallback={<div className="w-full h-screen flex items-center justify-center">Loading 3D Scene...</div>}>
        <LightRoomScene />
      </Suspense>
    </main>
  );
}
