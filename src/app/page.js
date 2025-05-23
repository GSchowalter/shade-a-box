"use client";
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamically import the Canvas component to avoid SSR issues
const LightRoomScene = dynamic(() => import('../components/LightRoomScene'), {
  ssr: false,
  loading: () => <div className="w-full h-[600px] flex items-center justify-center">Loading 3D Scene...</div>
});

const  ShadeBoxApp = dynamic(() => import('@/components/ShadeBoxApp'), {
  ssr: false,
  loading: () => <div className="w-full h-[600px] flex items-center justify-center">Loading 3D Scene...</div>
});

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Shade a box</h1>
      
      <p className="mb-6">
        This interactive 3D light room allows you to experiment with different shapes, 
        materials, and lighting conditions. Use the control panel on the right to add shapes,
        adjust lighting, and change the environment.
      </p>
      
      {/* Light Room Component */}
      <div className="mb-10 border border-gray-200 rounded-lg overflow-hidden shadow-lg">
        <Suspense fallback={<div className="w-full h-[600px] flex items-center justify-center">Loading 3D Scene...</div>}>
          {/* AI generated try */}
          {/* <LightRoomScene /> */}
          <ShadeBoxApp />
        </Suspense>
      </div>
      
      <h2 className="text-2xl font-bold mb-4">About This Project</h2>
      <p className="mb-6">
        This project demonstrates the capabilities of React Three Fiber for creating 
        interactive 3D experiences on the web. You can use it to understand how different 
        materials react to various lighting conditions.
      </p>
      
      <h2 className="text-2xl font-bold mb-4">How To Use</h2>
      <ul className="list-disc pl-6 mb-6">
        <li className="mb-2">Add shapes using the buttons in the control panel</li>
        <li className="mb-2">Select a shape to modify its material and color</li>
        <li className="mb-2">Adjust lighting position, intensity, and color</li>
        <li className="mb-2">Experiment with different environment presets</li>
        <li className="mb-2">Click and drag in the scene to orbit the camera</li>
      </ul>
      
      <div className="h-20"></div> {/* Extra space at bottom for scrolling */}
    </main>
  );
}