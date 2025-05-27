
const shapeList = [
    'box',
    'sphere',
    'cylinder',
    'cone',
    'torus'
]

function generateRandomShapeName() {
    const random = Math.floor(Math.random() * shapeList.length);
    return shapeList[random]
}

function generateRandomShapePosition() {
    const max = 3;
    const min = -3;
    
    const y_max = 3;
    const y_min = 0.2;

    const randomPosition = [
        Math.floor(Math.random() * (max - min + 1)) + min,
        Math.floor(Math.random() * (y_max - y_min + 1)) + y_min,
        Math.floor(Math.random() * (max - min + 1)) + min
    ];

    return randomPosition;
}

import { Euler } from 'three';

function generateRandomShapeRotation() {
    const max = Math.PI;
    const min = -Math.PI;

    const randomRotation = [
        Math.random() * (max - min) + min,
        Math.random() * (max - min) + min,
        Math.random() * (max - min) + min
    ];

    return randomRotation;
}

export { generateRandomShapeName, generateRandomShapePosition, generateRandomShapeRotation }