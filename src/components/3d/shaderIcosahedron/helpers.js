/**
 * Gets the centroid for each point of a THREE.js geometry
 * @param {'THREE.BufferGeometry'} geometry 
 * @returns 
 */

export function getCentroid(geometry) {
    let ar = geometry.attributes.position.array;
    let len = ar.length;
    let x = 0,
      y = 0,
      z = 0;
    for (let i = 0; i < len; i = i + 3) {
      x += ar[i];
      y += ar[i + 1];
      z += ar[i + 2];
    }
    return { x: (3 * x) / len, y: (3 * y) / len, z: (3 * z) / len };
  }