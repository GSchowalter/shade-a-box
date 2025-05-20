import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Box(props) {
    // This reference will give us direct access to the mesh
    const meshRef = useRef()

    // Set up state for the hovered 
    const [hovered, setHover] = useState(false)

    return (
        <mesh
            {...props}
            ref={meshRef}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    )

}