import { Canvas } from '@react-three/fiber';
import Scene from './Scene';

export default function ShadeBoxApp(){
    // Main window for app that will contain scenes with shapes and shadows. 
    // Users will be able to randomly generate shapes and shadows based on their preferences.
    // Timed sessions with a review at the end is the stretch goal.
     return (
        <div className="w-full h-[600px] flex flex-row">
          
          {/* 3D Canvas */}
          <div className="w-full h-full">
            <Canvas shadows camera={{ position: [8, 8, 8], fov: 50 }}>
              <Scene />
            </Canvas>
          </div>
        </div>
      );

}