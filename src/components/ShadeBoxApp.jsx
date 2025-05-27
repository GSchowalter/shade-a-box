import { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import Scene from './Scene';
import ControlPanel from './ControlPanel';
import { generateRandomShapePosition, generateRandomShapeRotation } from '@/utils/shapeUtils';
import { generateRandomLightPosition } from '@/utils/lightUtils';

export default function ShadeBoxApp() {
    // Main window for app that will contain scenes with shapes and shadows. 
    // Users will be able to randomly generate shapes and shadows based on their preferences.
    // Timed sessions with a review at the end is the stretch goal.

    // State for managing shapes in the scene
    const randomShapePosition = generateRandomShapePosition();
    const randomShapeRotation = generateRandomShapeRotation();
    const shape = {
        id: 1,
        type: 'sphere',
        position: randomShapePosition,
        rotation: randomShapeRotation,
        material: 'standard',
        color: '#ffffff'
    }
    const [shapes, setShapes] = useState([
        shape
    ]);
    const [shapeTypes, setShapeTypes] = useState(['sphere', 'box', 'cylinder', 'cone', 'torus']);

    const [lightSettings, setLightSettings] = useState({
        position: generateRandomLightPosition(),
        castShadow: true,
        color: 0xe3e3cf,
        intensity: 100,
        shadow: {
            mapSize: { width: 3000, height: 3000 },
            radius: 5
        }
    })
    const [lightHelperActive, setLightHelperActive] = useState(false);
    const pointLightRef = useRef();

    const [orbitControlsActive, setOrbitControlsActive] = useState(false);

    return (
        <div className="w-full h-[700px] flex flex-col items-center justify-center">
            {/* 3D Canvas */}
            <div className="w-full h-9/10">
                <Canvas shadows camera={{ position: [8, 8, 8], fov: 50 }}>
                    <Scene shapes={shapes} lightSettings={lightSettings} lightHelperActive={lightHelperActive} pointLightRef={pointLightRef} orbitControlsActive={orbitControlsActive} />
                </Canvas>
            </div>

            {/* Control Panel */}
            <div className='h-1/10 w-full align'>
                <ControlPanel setShapes={setShapes} shapeTypes={shapeTypes} setShapeTypes={setShapeTypes} lightSettings={lightSettings} setLightSettings={setLightSettings} setLightHelperActive={setLightHelperActive} lightHelperActive={lightHelperActive} setOrbitControlsActive={setOrbitControlsActive} orbitControlsActive={orbitControlsActive} />
            </div>
        </div>
    );

}