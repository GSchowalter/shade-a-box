import { useState, useRef } from 'react';
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
    const [lightHelperActive, setLightHelperActive] = useState(false);
    const pointLightRef = useRef();
    const [orbitControlsActive, setOrbitControlsActive] = useState(false);

    return (
        <div className="w-full h-[700px] flex flex-col items-center justify-center">
            {/* 3D Canvas */}
            <div className="w-full h-9/10">
                <Canvas shadows camera={{ position: [8, 8, 8], fov: 50 }}>
                    <Scene shapes={shapes} lightHelperActive={lightHelperActive} pointLightRef={pointLightRef} orbitControlsActive={orbitControlsActive}/>
                </Canvas>
            </div>

            {/* Control Panel */}
            <div className='h-1/10 w-full align'>
                <ControlPanel setShapes={setShapes} setLightHelperActive={setLightHelperActive} lightHelperActive={lightHelperActive} setOrbitControlsActive={setOrbitControlsActive} orbitControlsActive={orbitControlsActive}/>
            </div>
        </div>
    );

}