
/**
 *
 * @param {Number} height
 * @param {Number} width
 * @param {Number} sep
 * @param {Func: -> } zOfXYT
 * @param {Func: -> } colorOfXYZT
 * @param {Number} t
 * @returns
 */
export function initPosColorNormals (height, width, sep, zOfXYT, colorOfXYZT, t) {
  const positions = []; const colors = []; const normals = []

  for (let yi = 0; yi < height; yi++) {
    for (let xi = 0; xi < width; xi++) {
      const x = sep * (xi - (width - 1) / 2.0)
      const y = sep * (yi - (height - 1) / 2.0)
      const z = zOfXYT(x, y, t)
      positions.push(x, y, z)
      const color = colorOfXYZT(x, y, z, t)
      colors.push(color.r, color.g, color.b)
      normals.push(0, 0, 1)
    }
  }

  return {
    positions: new Float32Array(positions),
    colors: new Float32Array(colors),
    normals: new Float32Array(normals)
  }
}
/**
 *
 * @param {*} width
 * @param {*} height
 * @returns
 */
export function initIndexBuffers (width, height) {
  const indices = []
  let i = 0
  for (let yi = 0; yi < height - 1; yi++) {
    for (let xi = 0; xi < width - 1; xi++) {
      indices.push(i, i + 1, i + width + 1) // bottom right tri
      indices.push(i + width + 1, i + width, i) // top left tri
      i++
    }
    i++
  }

  return new Uint16Array(indices)
}
