import { generateRandomShapeName, generateRandomShapePosition } from '@/utils/shapeUtils';
import { FormControlLabel, Switch, Button } from '@mui/material';
import { useState } from 'react';
import PopUp from './ui_components/PopUp';

export default function ControlPanel({ setShapes, setLightHelperActive, lightHelperActive, setOrbitControlsActive, orbitControlsActive }) {

    const [shapeCount, setShapeCount] = useState(1);

    const initializeShapes = () => {
        let shapes = []
        for (let i = 0; i < shapeCount; i++) {
            const randomShapeName = generateRandomShapeName();
            const randomShapePosition = generateRandomShapePosition();
            const shape = { id: i, type: randomShapeName, position: randomShapePosition, material: 'standard', color: '#ffffff' }
            shapes.push(shape)
            console.log(`Shape pushed: ${shape.type} at ${shape.position}`)
        }
        setShapes(shapes)
        console.log(`Shapes set: ${shapes.length}`)
        console.log(`Shape count: ${shapeCount}`)
    };

    const reDrawScene = (event) => {
        initializeShapes()
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
                <FormControlLabel className='' control={<Switch onChange={handleLightHelperChange} checked={lightHelperActive} />} label="light position indicator" />
                <FormControlLabel className='' control={<Switch onChange={handleOrbitControlsChange} checked={orbitControlsActive} />} label="orbit controls" />
            </PopUp>
            {/* <button className='bg-gray-500 text-white rounded p-2 m-3' onClick={handleLightHelperClick} > light helper </button>
            <button className='bg-gray-500 text-white rounded p-2 m-3' onClick={handleOrbitControlsClick} > orbit controls </button> */}
            {/* <Switch onChange={handleLightHelperChange} />
            <Switch onChange={handleOrbitControlsChange} /> */}
        </div>
    )
}