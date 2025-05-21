import { generateRandomShapeName, generateRandomShapePosition } from '@/utils/shapeUtils';
import { useState } from 'react';

export default function ControlPanel({ setShapes }) {

    const [shapeCount, setShapeCount] = useState(1);

    const handleShapeCountChange = (event) => {
        const newCount = parseInt(event.target.value);
        if (!isNaN(newCount)) {
            setShapeCount(newCount);
        }
    }

    const initializeShapes = () => {
        let shapes = []
        for (let i = 0; i< shapeCount; i++) {
            const randomShapeName = generateRandomShapeName();
            const randomShapePosition = generateRandomShapePosition();
            const shape = { id: i, type: randomShapeName, position: randomShapePosition, material: 'standard', color: '#ffffff' }
            shapes.push(shape)
            console.log(`Shape pushed: ${shape.type} at ${shape.position}`)
        }
        setShapes(shapes)
        console.log(`Shapes set: ${shapes.length}`)
        console.log(`Shape count: ${shapeCount}`)
    }

    const reDrawScene = (event) => {
        initializeShapes()
    }


    return (
        <div className="w-full flex-col">
            <p>Number of shapes?</p>
            <input
                type='number'
                min={1}
                max={10}
                value={shapeCount}
                onChange={handleShapeCountChange}
            />
            <div className='bg-white text-black w-1/10 border-thick'>
                <button
                    label="redraw"
                    onClick={reDrawScene}
                    size="small"
                    color='white'
                > redraw </button>
            </div>
        </div>
    )
}