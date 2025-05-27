function generateRandomLightPosition() {
    // Bound the z conditionally so that we will generate a random position in an upside down l-shape around the box\
    const x_max = 5;
    const x_min = -5;
    
    const y_max = 15;
    const y_min = 0;

    const z_max = 15;
    const z_min = -5;

    const x = Math.floor(Math.random() * (x_max - x_min + 1)) + x_min
    const y = Math.floor(Math.random() * (y_max - y_min + 1)) + y_min
    const z = Math.floor(Math.random() * (z_max - z_min + 1)) + z_min

    const randomPosition = [x, y, z];

    console.log(`Generated random light position: ${randomPosition}`)
    return randomPosition;
} 

export { generateRandomLightPosition }