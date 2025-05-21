import { useState, useRef } from 'react';
import { OrbitControls, ContactShadows, Environment, useHelper, Plane, Box } from '@react-three/drei';
import { PointLightHelper, DirectionalLightHelper } from 'three';

export default function Scene() {
    const pointLightRef = useRef();

    // Add helpers for the lights in development
    useHelper(pointLightRef, PointLightHelper);

    const lightSettings = {
        position: [0, 3, 2],
        castShadow: true,
        color: 0xffffff,
        intensity: 100,
        shadow: {
            mapSize: { width: 1024, height: 1024 },
            radius: 5
        }
    }

    return (
        <>
            {/* Orbit controls for camera navigation */}
            <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />

            {/* Light */}
            {/* May have to tweak the shadow-mapSize field */}
            <pointLight
                ref={pointLightRef}
                position={lightSettings.position}
                intensity={lightSettings.intensity}
                color={lightSettings.color}
                castShadow={lightSettings.castShadow}
                shadow-mapSize={lightSettings.shadow.mapSize.width}
            />

            {/* Grid helper */}
            {/* <gridHelper args={[10, 10]} position={[0, -0.01, 0]} /> */}

            {/* Ground plane */}
            <Plane args={[10, 10]} position={[0, -.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow={true} >
                <meshStandardMaterial color={0xffffff} />
            </Plane>

            {/* Box */}
            <Box castShadow={true}>
                <meshStandardMaterial color='gray' />
            </Box>
        </>
    )
}