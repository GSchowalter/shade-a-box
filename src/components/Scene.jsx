import { useState, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment, useHelper, Plane, Box } from '@react-three/drei';
import { PointLightHelper, DirectionalLightHelper, MathUtils } from 'three';
import Shape from './Shape';

export default function Scene({ shapes, lightSettings, lightHelperActive, pointLightRef, orbitControlsActive, }) {

    // Add helpers for the lights in development
    useHelper(lightHelperActive ? pointLightRef : null, PointLightHelper);

    useThree(({ camera }) => {
        camera.rotation.set(MathUtils.degToRad(0), 0, 0);
        camera.position.set(0, 2, 9)
    });

    return (
        <>
            {/* Orbit controls for camera navigation */}
            {orbitControlsActive ? <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} /> : null}

            {/* Light */}
            {/* Note: May have to tweak the shadow-mapSize field */}
            <pointLight
                ref={pointLightRef}
                position={lightSettings.position}
                intensity={lightSettings.intensity}
                color={lightSettings.color}
                castShadow={lightSettings.castShadow}
                shadow-mapSize={lightSettings.shadow.mapSize.width}
            />

            <ambientLight intensity={0.1} />

            {/* Ground plane */}
            <Plane args={[10, 12]} position={[0, -.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow={true} >
                <meshStandardMaterial color={0xffffff} />
            </Plane>
            {/* Back wall */}
            <Plane args={[11, 11]} position={[0, 4.5, -5]} rotation={[0, 0, 0]} receiveShadow={true} >
                <meshStandardMaterial color={0xffffff} />
            </Plane>
            {/* Left wall */}
            <Plane args={[11, 11]} position={[5, 4.5, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow={true} >
                <meshStandardMaterial color={0xffffff} />
            </Plane>
            {/* Right wall */}
            <Plane args={[11, 11]} position={[-5, 4.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow={true} >
                <meshStandardMaterial color={0xffffff} />
            </Plane>


            {/* Render all shapes */}
            {shapes.map((shape) => (
                <Shape key={shape.id} rotation={shape.rotation}{...shape} />
            ))}
        </>
    )
}