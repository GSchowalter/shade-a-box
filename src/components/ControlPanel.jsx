import { generateRandomShapeName, generateRandomShapePosition, generateRandomShapeRotation } from '@/utils/shapeUtils';
import { generateRandomLightPosition } from '@/utils/lightUtils';
import { FormControlLabel, Switch, Button } from '@mui/material';
import { useState } from 'react';
import PopUp from './ui_components/PopUp';
import { useThree } from '@react-three/fiber'

export default function ControlPanel({ setShapes, setLightSettings, setLightHelperActive, lightHelperActive, setOrbitControlsActive, orbitControlsActive, cameraPosition, setCameraPosition }) {

    const [shapeCount, setShapeCount] = useState(1);
    // const camera = useThree(state => state.camera);

    const initializeShapes = () => {
        let shapes = []
        for (let i = 0; i < shapeCount; i++) {
            const randomShapeName = generateRandomShapeName();
            const randomShapePosition = generateRandomShapePosition();
            const randomShapeRotation = generateRandomShapeRotation();
            const shape = { 
                id: i, 
                type: randomShapeName, 
                position: randomShapePosition, 
                rotation: randomShapeRotation, 
                material: 'standard', 
                color: '#ffffff' 
            }
            shapes.push(shape)
            // console.log(`Shape pushed: ${shape.type} at ${shape.position} with rotation ${shape.rotation}`)
        }
        setShapes(shapes)
    };

    const initializeLight = () => {
        const randomLightPosition = generateRandomLightPosition();
        setLightSettings(prev => ({ ...prev, position: randomLightPosition }))
        console.log(`Light position set to ${randomLightPosition}`)
    }

    const reDrawScene = (event) => {
        initializeShapes()
        initializeLight()
    };

    const handleLightHelperChange = () => {
        setLightHelperActive(prev => !prev)
    };

    const handleOrbitControlsChange = () => {
        setOrbitControlsActive(prev => !prev)
    };

    // TODO add use effect to add and subtract shapes on change
    const handleShapeCountChange = (event) => {
        const newCount = Number(event.target.value);
        if (newCount !== NaN && newCount > 0 && newCount < 11) {
            setShapeCount(newCount)
        }
    }

    const cameraForward = () => {
        camera.position.set(0, 2, 9);
        camera.rotation.set(0, 0, 0);
        camera.updateProjectionMatrix();
    }

    const cameraBackward = () => {
        camera.position.set(0, 2, -9);
        camera.rotation.set(0, 0, 0);
        camera.updateProjectionMatrix();
    }

    const cameraLeft = () => {
        camera.position.set(-9, 2, 0);
        camera.rotation.set(0, 0, 0);
        camera.updateProjectionMatrix();
    }

    const cameraRight = () => {
        camera.position.set(9, 2, 0);
        camera.rotation.set(0, 0, 0);
        camera.updateProjectionMatrix();
    }

    const cameraUp = () => {
        camera.position.set(0, 9, 0);
        camera.rotation.set(0, 0, 0);
        camera.updateProjectionMatrix();
    }

    const cameraDown = () => {
        camera.position.set(0, -9, 0);
        camera.rotation.set(0, 0, 0);
        camera.updateProjectionMatrix();
    }

    return (
        <div className='flex flex-row justify-evenly'>
            <p id='shapes' className=''>Number of shapes:
                <input className='border'
                    type='number'
                    min={1}
                    max={10}
                    value={shapeCount}
                    onChange={handleShapeCountChange}
                    label='shapes'
                />
            </p>

            <Button className='' onClick={reDrawScene} variant="contained">redraw </Button>
            <PopUp className='p-5'>
                <FormControlLabel className='' control={<Switch color='default' onChange={handleLightHelperChange} checked={lightHelperActive} />} label="light position indicator" />
                <FormControlLabel className='' control={<Switch color='default' onChange={handleOrbitControlsChange} checked={orbitControlsActive} />} label="orbit controls" />
                <FormControlLabel className='' control={<Switch color='default' checked={false} />} label="floating shapes" />
            </PopUp>
            <div>
                <Button onClick={cameraForward} variant="outlined">Camera Forward</Button>
                <Button onClick={cameraBackward} variant="outlined">Camera Backward</Button>
                <Button onClick={cameraLeft} variant="outlined">Camera Left</Button>
                <Button onClick={cameraRight} variant="outlined">Camera Right</Button>
                <Button onClick={cameraUp} variant="outlined">Camera Up</Button>
                <Button onClick={cameraDown} variant="outlined">Camera Down</Button>
            </div>
            <div>
                <p> Camera Position {JSON.stringify(cameraPosition)} </p>
            </div>
        </div>
    )
}