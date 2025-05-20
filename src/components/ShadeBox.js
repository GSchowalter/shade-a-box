"use client";

import { Canvas } from '@react-three/fiber';
import Box from './shapes/Box';
import RotatingBox from './shapes/RotatingBox';

export default function ShadeBox() {
    // const { scene } = useThree();

    return (
        <Canvas>
            <ambientLight intensity={Math.PI / 2} />
            <directionalLight color="red" position={[0, 0, 5]} />
            <RotatingBox />
            <Box position={[5, 0, 0]} />
        </Canvas>
    )
}