import { generateRandomShapeName, generateRandomShapePosition, generateRandomShapeRotation } from '@/utils/shapeUtils';
import { generateRandomLightPosition } from '@/utils/lightUtils';
import { FormControlLabel, Switch, Button } from '@mui/material';
import { useState } from 'react';
import PopUp from './ui_components/PopUp';

export default function ControlPanel({ setShapes, lightSettings, setLightSettings, setLightHelperActive, lightHelperActive, setOrbitControlsActive, orbitControlsActive }) {

    const [shapeCount, setShapeCount] = useState(1);

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

    const lightUp = () => {
        setLightSettings(prev => ({ ...prev, position: [prev.position[0], prev.position[1] + 1, prev.position[2]] }));
    }
    const lightDown = () => {
        setLightSettings(prev => ({ ...prev, position: [prev.position[0], prev.position[1] - 1, prev.position[2]] }));
    }
    const lightLeft = () => {
        setLightSettings(prev => ({ ...prev, position: [prev.position[0] - 1, prev.position[1], prev.position[2]] }));
    }
    const lightRight = () => {
        setLightSettings(prev => ({ ...prev, position: [prev.position[0] + 1, prev.position[1], prev.position[2]] }));
    }
    const lightForward = () => {
        setLightSettings(prev => ({ ...prev, position: [prev.position[0], prev.position[1], prev.position[2] - 1] }));
    }
    const lightBackward = () => {
        setLightSettings(prev => ({ ...prev, position: [prev.position[0], prev.position[1], prev.position[2] + 1] }));
    }

    return (
        <div className='flex flex-row justify-evenly h-full items-center text-white p-4 '>
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

            <Button className='' onClick={reDrawScene} variant="contained">redraw</Button>

            <PopUp className='' title="Light Controls">
                <p>Position:</p>
                <div className="flex flex-col items-center space-y-2 justify-center p-1">
                    <Button onClick={lightUp} variant="outlined">↑</Button>
                </div>
                <div className="flex flex-row space-x-2 justify-center p-1">
                    <Button onClick={lightLeft} variant="outlined">←</Button>
                    <Button onClick={lightDown} variant="outlined">↓</Button>
                    <Button onClick={lightRight} variant="outlined">→</Button>
                </div>
                <div className="flex flex-row space-x-2 justify-evenly p-1">
                    <Button onClick={lightForward} variant="outlined">Forward</Button>
                    <Button onClick={lightBackward} variant="outlined">Backward</Button>
                </div>
            </PopUp>

            <PopUp className='' title="Advanced Settings">
                <FormControlLabel className='' control={<Switch onChange={handleLightHelperChange} checked={lightHelperActive} />} label="light position indicator" />
                <FormControlLabel className='' control={<Switch onChange={handleOrbitControlsChange} checked={orbitControlsActive} />} label="orbit controls" />
            </PopUp>
        </div>
    )
}