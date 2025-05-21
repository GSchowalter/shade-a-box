import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Scene from './Scene';
import ControlPanel from './ControlPanel';

export default function ShadeBoxApp() {
    // Main window for app that will contain scenes with shapes and shadows. 
    // Users will be able to randomly generate shapes and shadows based on their preferences.
    // Timed sessions with a review at the end is the stretch goal.

    // State for managing shapes in the scene
    const [shapes, setShapes] = useState([
        { id: 1, type: 'box', position: [0, 0, 0], material: 'standard', color: '#ffffff' },
    ]);

    return (
        <div className="w-full h-[700px] flex flex-col">
            {/* 3D Canvas */}
            <div className="w-full h-9/10">
                <Canvas shadows camera={{ position: [8, 8, 8], fov: 50 }}>
                    <Scene shapes={shapes} />
                </Canvas>
            </div>

            {/* Control Panel */}
            <div className='w-full h-1/10'>
                <ControlPanel setShapes={setShapes}/>
            </div>
        </div>
    );

}