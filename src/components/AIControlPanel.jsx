import { useState } from 'react';

export default function AIControlPanel({ 
  shapes, 
  addShape, 
  updateShape, 
  removeShape,
  light,
  updateLight,
  environment,
  updateEnvironment
}) {
  const [activeTab, setActiveTab] = useState('shapes');
  const [selectedShapeId, setSelectedShapeId] = useState(shapes[0]?.id);

  // Find the currently selected shape
  const selectedShape = shapes.find(shape => shape.id === selectedShapeId);

  // Handle shape color change
  const handleShapeColorChange = (e) => {
    updateShape(selectedShapeId, { color: e.target.value });
  };

  // Handle shape material change
  const handleShapeMaterialChange = (e) => {
    updateShape(selectedShapeId, { material: e.target.value });
  };

  // Handle light position change
  const handleLightPositionChange = (axis, value) => {
    const newPosition = [...light.position];
    switch (axis) {
      case 'x':
        newPosition[0] = parseFloat(value);
        break;
      case 'y':
        newPosition[1] = parseFloat(value);
        break;
      case 'z':
        newPosition[2] = parseFloat(value);
        break;
    }
    updateLight({ position: newPosition });
  };

  return (
    <div className="w-full h-full bg-black p-4 overflow-y-auto">
      <h1 className="text-xl font-bold mb-4">Light Room Controls</h1>
      
      {/* Tab Navigation */}
      <div className="flex border-b mb-4">
        <button 
          onClick={() => setActiveTab('shapes')}
          className={`px-3 py-2 ${activeTab === 'shapes' ? 'border-b-2 border-blue-500' : ''}`}
        >
          Shapes
        </button>
        <button 
          onClick={() => setActiveTab('lighting')}
          className={`px-3 py-2 ${activeTab === 'lighting' ? 'border-b-2 border-blue-500' : ''}`}
        >
          Lighting
        </button>
        <button 
          onClick={() => setActiveTab('environment')}
          className={`px-3 py-2 ${activeTab === 'environment' ? 'border-b-2 border-blue-500' : ''}`}
        >
          Environment
        </button>
      </div>
      
      {/* Shapes Tab */}
      {activeTab === 'shapes' && (
        <div>
          <h2 className="font-bold mb-2">Add Shape</h2>
          <div className="grid grid-cols-2 gap-2 mb-4 ">
            <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => addShape('box')}>Box</button>
            <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => addShape('sphere')}>Sphere</button>
            <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => addShape('cylinder')}>Cylinder</button>
            <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => addShape('cone')}>Cone</button>
            <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => addShape('torus')}>Torus</button>
          </div>
          
          <h2 className="font-bold mb-2">Select Shape</h2>
          <select 
            className="w-full mb-4 p-2 border bg-black"
            value={selectedShapeId}
            onChange={e => setSelectedShapeId(parseInt(e.target.value))}
          >
            {shapes.map(shape => (
              <option key={shape.id} value={shape.id}>
                {shape.type} #{shape.id}
              </option>
            ))}
          </select>
          
          {selectedShape && (
            <div>
              <h2 className="font-bold mb-2">Shape Properties</h2>
              
              <div className="mb-3">
                <label className="block mb-1">Material</label>
                <select 
                  className="w-full p-2 border bg-black"
                  value={selectedShape.material}
                  onChange={handleShapeMaterialChange}
                >
                  <option value="phong">Shiny</option>
                  <option value="lambert">Smooth</option>
                  <option value="toon">Cartoon</option>
                </select>
              </div>
              
              <div className="mb-3">
                <label className="block mb-1">Color</label>
                <input 
                  type="color" 
                  className="w-full"
                  value={selectedShape.color}
                  onChange={handleShapeColorChange}
                />
              </div>
              
              <button 
                className="bg-red-500 text-white px-2 py-1 rounded mt-2"
                onClick={() => removeShape(selectedShape.id)}
              >
                Remove Shape
              </button>
            </div>
          )}
        </div>
      )}
      
      {/* Lighting Tab */}
      {activeTab === 'lighting' && (
        <div>
          <h2 className="font-bold mb-2">Light Type</h2>
          <select 
            className="w-full mb-4 p-2 border"
            value={light.type}
            onChange={e => updateLight({ type: e.target.value })}
          >
            <option value="point">Point Light</option>
            <option value="directional">Directional Light</option>
            <option value="spot">Spot Light</option>
          </select>
          
          <h2 className="font-bold mb-2">Light Properties</h2>
          
          <div className="mb-3">
            <label className="block mb-1">Position X</label>
            <input 
              type="range" 
              min="-10" 
              max="10" 
              step="0.1"
              value={light.position[0]}
              onChange={e => handleLightPositionChange('x', e.target.value)}
              className="w-full"
            />
            <span>{light.position[0].toFixed(1)}</span>
          </div>
          
          <div className="mb-3">
            <label className="block mb-1">Position Y</label>
            <input 
              type="range" 
              min="-10" 
              max="10" 
              step="0.1"
              value={light.position[1]}
              onChange={e => handleLightPositionChange('y', e.target.value)}
              className="w-full"
            />
            <span>{light.position[1].toFixed(1)}</span>
          </div>
          
          <div className="mb-3">
            <label className="block mb-1">Position Z</label>
            <input 
              type="range" 
              min="-10" 
              max="10" 
              step="0.1"
              value={light.position[2]}
              onChange={e => handleLightPositionChange('z', e.target.value)}
              className="w-full"
            />
            <span>{light.position[2].toFixed(1)}</span>
          </div>
          
          <div className="mb-3">
            <label className="block mb-1">Intensity</label>
            <input 
              type="range" 
              min="0" 
              max="2" 
              step="0.1"
              value={light.intensity}
              onChange={e => updateLight({ intensity: parseFloat(e.target.value) })}
              className="w-full"
            />
            <span>{light.intensity.toFixed(1)}</span>
          </div>
          
          <div className="mb-3">
            <label className="block mb-1">Color</label>
            <input 
              type="color" 
              value={light.color}
              onChange={e => updateLight({ color: e.target.value })}
              className="w-full"
            />
          </div>
          
          <div className="mb-3">
            <label className="flex items-center">
              <input 
                type="checkbox" 
                checked={light.castShadow}
                onChange={e => updateLight({ castShadow: e.target.checked })}
                className="mr-2"
              />
              Cast Shadows
            </label>
          </div>
        </div>
      )}
      
      {/* Environment Tab */}
      {activeTab === 'environment' && (
        <div>
          <h2 className="font-bold mb-2">Environment Preset</h2>
          <select 
            className="w-full mb-4 p-2 border"
            value={environment.preset}
            onChange={e => updateEnvironment({ preset: e.target.value })}
          >
            <option value="sunset">Sunset</option>
            <option value="dawn">Dawn</option>
            <option value="night">Night</option>
            <option value="warehouse">Warehouse</option>
            <option value="forest">Forest</option>
            <option value="apartment">Apartment</option>
            <option value="studio">Studio</option>
            <option value="city">City</option>
            <option value="park">Park</option>
            <option value="lobby">Lobby</option>
          </select>
        </div>
      )}
    </div>
  );
}