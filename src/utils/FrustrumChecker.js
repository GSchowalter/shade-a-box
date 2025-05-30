import * as THREE from 'three';
import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

const FrustumChecker = ({ pointX, pointY, pointZ }) => {
  const { camera, scene } = useThree();
  const frustumRef = useRef(null);
  const pointRef = useRef(null);

  useEffect(() => {
    // Create the point once when the component mounts
    pointRef.current = new THREE.Vector3(pointX, pointY, pointZ);
  }, [pointX, pointY, pointZ]);

  useFrame(() => {
    // Update the frustum with each frame
    if (frustumRef.current === null) {
      frustumRef.current = new THREE.Frustum();
      frustumRef.current.setFromProjectionMatrix(
        new THREE.Matrix4().multiplyMatrices(
          camera.projectionMatrix,
          camera.matrixWorldInverse
        )
      );
    } else {
      frustumRef.current.setFromProjectionMatrix(
        new THREE.Matrix4().multiplyMatrices(
          camera.projectionMatrix,
          camera.matrixWorldInverse
        )
      );
    }
  });

  const pointIsInFrustum = frustumRef.current && frustumRef.current.containsPoint(pointRef.current);

  return (
    <>
    </>
  );
};

export default FrustumChecker;