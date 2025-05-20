import { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment, useHelper } from '@react-three/drei';
import { PointLightHelper, DirectionalLightHelper } from 'three';
import ControlPanel from './ControlPanel';
import Shape from './Shape';

export default function LightRoomScene() {
  // State for managing shapes in the scene
  const [shapes, setShapes] = useState([
    { id: 1, type: 'box', position: [0, 0, 0], material: 'standard', color: '#ffffff' }
  ]);
  
  // Light settings
  const [lightSettings, setLightSettings] = useState({
    type: 'point', // 'point', 'directional', 'spot'
    position: [5, 5, 5],
    intensity: 1,
    color: '#ffffff',
    castShadow: true
  });

  // Environment settings
  const [environmentSettings, setEnvironmentSettings] = useState({
    preset: 'sunset', // 'sunset', 'dawn', 'night', 'warehouse', 'forest', 'apartment', 'studio', 'city', 'park', 'lobby'
  });

  // Add a new shape to the scene
  const addShape = (type) => {
    const newShape = {
      id: shapes.length + 1,
      type,
      position: [
        Math.random() * 4 - 2,
        Math.random() * 2,
        Math.random() * 4 - 2
      ],
      material: 'standard',
      color: '#ffffff'
    };
    setShapes([...shapes, newShape]);
  };

  // Update a shape's properties
  const updateShape = (id, updates) => {
    setShapes(shapes.map(shape => 
      shape.id === id ? { ...shape, ...updates } : shape
    ));
  };

  // Remove a shape from the scene
  const removeShape = (id) => {
    setShapes(shapes.filter(shape => shape.id !== id));
  };

  // Update light settings
  const updateLight = (updates) => {
    setLightSettings({ ...lightSettings, ...updates });
  };

  // Update environment settings
  const updateEnvironment = (updates) => {
    setEnvironmentSettings({ ...environmentSettings, ...updates });
  };

  return (
    <div className="w-full h-[600px] flex flex-row">
      {/* Control Panel */}
      <div className="w-80 h-full flex-shrink-0 border-l border-gray-200">
        <ControlPanel 
          shapes={shapes}
          addShape={addShape}
          updateShape={updateShape}
          removeShape={removeShape}
          light={lightSettings}
          updateLight={updateLight}
          environment={environmentSettings}
          updateEnvironment={updateEnvironment}
        />
      </div>
      
      {/* 3D Canvas */}
      <div className="flex-1 h-full">
        <Canvas shadows camera={{ position: [8, 8, 8], fov: 50 }}>
          <Scene 
            shapes={shapes} 
            lightSettings={lightSettings} 
            environmentSettings={environmentSettings}
          />
        </Canvas>
      </div>
    </div>
  );
}

// Scene component containing all 3D elements
function Scene({ shapes, lightSettings, environmentSettings }) {
  const pointLightRef = useRef();
  const directionalLightRef = useRef();
  
  // Add helpers for the lights in development
  useHelper(lightSettings.type === 'point' ? pointLightRef : null, PointLightHelper, 0.5, lightSettings.color);
  useHelper(lightSettings.type === 'directional' ? directionalLightRef : null, DirectionalLightHelper, 0.5);

  return (
    <>
      {/* Orbit controls for camera navigation */}
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      
      {/* Environment */}
      <Environment preset={environmentSettings.preset} background />
      
      {/* Lighting based on selected type */}
      {lightSettings.type === 'point' && (
        <pointLight
          ref={pointLightRef}
          position={lightSettings.position}
          intensity={lightSettings.intensity}
          color={lightSettings.color}
          castShadow={lightSettings.castShadow}
          shadow-mapSize={1024}
        />
      )}
      
      {lightSettings.type === 'directional' && (
        <directionalLight
          ref={directionalLightRef}
          position={lightSettings.position}
          intensity={lightSettings.intensity}
          color={lightSettings.color}
          castShadow={lightSettings.castShadow}
          shadow-mapSize={1024}
        />
      )}
      
      {lightSettings.type === 'spot' && (
        <spotLight
          position={lightSettings.position}
          intensity={lightSettings.intensity}
          color={lightSettings.color}
          castShadow={lightSettings.castShadow}
          angle={0.6}
          penumbra={0.5}
          shadow-mapSize={1024}
        />
      )}
      
      {/* Ambient light for base illumination */}
      <ambientLight intensity={0.2} />
      
      {/* Grid helper */}
      <gridHelper args={[10, 10]} position={[0, -0.01, 0]} />
      
      {/* Ground plane with contact shadows */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.025, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <shadowMaterial opacity={0.2} />
      </mesh>
      <ContactShadows position={[0, -0.01, 0]} opacity={0.6} scale={10} blur={2} far={10} />
      
      {/* Render all shapes */}
      {shapes.map((shape) => (
        <Shape key={shape.id} {...shape} />
      ))}
    </>
  );
}