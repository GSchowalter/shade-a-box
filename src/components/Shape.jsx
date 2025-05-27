import { useRef } from 'react';

export default function Shape({ id, type, position, rotation, material, color }) {
  const meshRef = useRef();
  
  // Define the geometry based on the shape type
  const renderGeometry = () => {
    switch (type) {
      case 'box':
        return <boxGeometry args={[1, 1, 1]} />;
      case 'sphere':
        return <sphereGeometry args={[0.6, 32, 32]} />;
      case 'cylinder':
        return <cylinderGeometry args={[0.5, 0.5, 1.5, 32]} />;
      case 'cone':
        return <coneGeometry args={[0.6, 1.5, 32]} />;
      case 'torus':
        return <torusGeometry args={[0.5, 0.2, 16, 32]} />;
      case 'dodecahedron':
        return <dodecahedronGeometry args={[0.5, 0]} />;
      case 'pyramid':
        return <tetrahedronGeometry args={[0.5, 0]} />;
      default:
        return <boxGeometry args={[1, 1, 1]} />;
    }
  };
  
  // Define the material based on the selected type
  const renderMaterial = () => {
    const props = { color };
    
    switch (material) {
      case 'standard':
        return <meshStandardMaterial {...props} roughness={0.7} metalness={0.1} />;
      case 'physical':
        return <meshPhysicalMaterial {...props} roughness={0.4} metalness={0.8} clearcoat={0.5} />;
      case 'phong':
        return <meshPhongMaterial {...props} shininess={100} />;
      case 'basic':
        return <meshBasicMaterial {...props} />;
      case 'lambert':
        return <meshLambertMaterial {...props} />;
      case 'normal':
        return <meshNormalMaterial />;
      case 'toon':
        return <meshToonMaterial {...props} />;
      default:
        return <meshStandardMaterial {...props} />;
    }
  };
  
  return (
    <mesh
      key={id}
      ref={meshRef}
      position={position}
      rotation={rotation}
      castShadow
      receiveShadow
    >
      {renderGeometry()}
      {renderMaterial()}
    </mesh>
  );
}