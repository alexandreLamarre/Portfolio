/**
 * Class that represents the data & math behind 
 * the last 4d regular polytope (no analogous polyope of its kind in lower dimensions)
 * i.e. 24 cell : https://en.wikipedia.org/wiki/24-cell
 */
class OctaPlex{
    /**
     * Intializes 4d coordinates of the last (unique to 4d) 4d regular polytope
     *  in the form of a float32 array
     * @attr coords: the coordinates of the 4d regular polytope
     */
    constructor(){
        this.coords = new Float32Array(24*4);
        this.leftIsoclinic = [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1],
        ];
        this.rightIsoclinic = [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1],
        ];
        this.isoclinicRotation = [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1],
        ]
        
        //TODO: set coords and rotation appropriately
        // (default rotation should be identity)

        const points = [];
        let origins = [[1, 1, 0, 0], [-1, -1, 0, 0], [1, -1, 0, 0]];
        this.hash = new Set();
        for(let i = 0; i < origins.length; i++){
            let arr = origins[i];
            for(let p of fastPermutation(arr, arr.length)){
                let identifier = hashArray(p);
                if(!this.hash.has(identifier)){
                    points.push(p);
                }
                this.hash.add(identifier);
            }
        }
        this.points = points;
    }

    /**
     * https://en.wikipedia.org/wiki/Rotations_in_4-dimensional_Euclidean_space
     * 
     * Sets the general rotation matrices of double left-right isoclinic rotations in 4D
     * @param {*} a param in left isoclinic rotation matrix
     * @param {*} b param in left isoclinic rotation matrix
     * @param {*} c param in left isoclinic rotation matrix
     * @param {*} d param in left isoclinic rotation matrix
     * @param {*} p param in right isoclinic rotation matrix
     * @param {*} q param in right isoclinic rotation matrix
     * @param {*} r param in right isoclinic rotation matrix
     * @param {*} s param in right isoclinic rotation matrix
     */
    setlRotationIsoclinic4D(a, b, c, d, p, q, r , s){
        [a, b, c, d] = clamp4(a, b, c , d);
        [p, q, r, s] = clamp4(p, q, r, s);
        const leftIsoclinic = [
            [a, -b,-c,-d],
            [b, a, -d, c],
            [c, d, a, -b],
            [d, -c, b, a],
        ];
        const rightIsoclinic = [
            [p, -q,-r,-s],
            [q, p, s, -r],
            [r, -s, p, q],
            [s, r, -q, p],
        ];

        this.leftIsoclinic = leftIsoclinic;
        this.rightIsoclinic = rightIsoclinic;
        this.isoclinicRotation = multiplyMatrix(leftIsoclinic, rightIsoclinic);
    }

    /**
     * 
     */
    setCayleyRotation4D(){
        //TODO: implement 4d rotation matrix by generating "rotation" eigenvalues using the Cayley method


    }

    /**
     * Rotates the 24-cell's coordinates in place 
     * Rotation type is determined by the object's currently set rotation matrix
     */
    applyRotation(){
        for(let i = 0; i < this.points.length; i++){
            console.log(this.points[i]);
        }
    }

    /**
     * Projects the 24-cell regular 4d polytope into 3 dimensional coordinates
     */
    project3D(){
        //TODO: return the 24 cell's coordinates projected into 3d space
        const coords3d = new Float32Array();

        return coords3d;
    }

    /**
     * Projects the 24-cell regular 4d polytope into a partitioned set of 
     * 3 dimensional coordinates
     */
    projectFaces3D(){
        //TODO: return the 24 cell's coordinates partitioned into "faces"
        const coords3d = new Float32Array();

        return coords3d;
    }
}

export default OctaPlex;

/**
 * Helper function to generate permutations of given array.
 * Uses Heap's Algorithm: https://en.wikipedia.org/wiki/Heap%27s_algorithm
 * @param {*} arr the array to permute
 * @param n the length of the array to permute
 */
export function* fastPermutation(arr, n){
    if(isNaN(n)) throw new Error("permutations expect an input integer, instead got : ", n);
    
    function* generate(arr, n){
        if(n === 1){
            yield arr.slice();
        }
        else{
            yield * generate(arr, n -1);

            for(let i = 0; i < n -1; i++){
                if(n % 2 === 0){
                    swap(arr, i , n-1);
                }
                else{
                    swap(arr, 0, n-1);
                }
                yield * generate(arr, n-1);
            }
        }
    }

    for(let i of generate(arr,4)){
        yield i;
    }
}

/**
 * Helper that generates the permutations according to Heap's Algorithm
 * @param {Array} arr 
 * @param {Number} n 
 * @param {Array} perms 
 */
export function* generate(arr, n){
    if(n === 1){
        //OUTPUT arr
        yield arr.slice();
    }
    else{
        fastPermutation(arr , n -1);

        for(let i = 0; i < n -1; i ++){
            if(n % 2 === 0){
                swap(arr, i, n - 1);
            } else{
                swap(arr, 0, n - 1);
            }
            fastPermutation(arr, n-1);
        }
    }
}

/**
 * Helper function to swap two indices i and j in an array
 * @param {*} arr : the array to perform the swap on
 * @param {Number} i : the first index to swap
 * @param {Number} j : the second index to swap
 */
export function swap(arr, i,j){
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

/**
 * Hashes 4d ternary coord arrays as integers for easy use in sets
 * @param {Array} arr 
 * @returns 
 */
export function hashArray(arr){
    let hashNum = 0;
    let cur = 1;
    let curOffset = Math.pow(2,5);
    for(let i = 0; i < arr.length; i++){
        if(arr[i] >= 0){
            hashNum += arr[i]*cur;
        }else {
            hashNum -= arr[i]*curOffset;
        }
        
        cur *= 2;
        curOffset *=2;
    }
    return hashNum;
}

/**
 * 
 * @param {/**
 * Clamp parameters to satisfy:
 * a^2 + b^2 + c^2 + d^2 = 1
 * 
 * @param {*} a :parameter of the equation
 * @param {*} b :parameter of the equation
 * @param {*} c :parameter of the equation
 * @param {*} d :parameter of the equation
 * @returns {[a,b,c,d]} 
 */
export function clamp4(a, b, c, d){
    const total = Math.sqrt(a * a + b * b + c * c + d * d);

    a /= total; b /= total; c /= total; d /= total;
    return [a,b,c,d];
}

/**
 * Multiply two matrices
 * @param {Array[Array]} mat1 
 * @param {Array[Array]} mat2 
 * @returns Array[Array] multiplied matrix
 */
export function multiplyMatrix(mat1, mat2){
    if(mat1.length !== mat2.length) throw new Error(" Expected matrix dimensions to match ");
    let res = [];
    const len = mat1.length;
    for(let i = 0; i < len; i++){
        let resRow = [];
        for(let j = 0; j < len; j ++){
            let sum = 0;
            for(let k = 0; k < len; k++){
                sum += mat1[i][k] * mat2[k][j];
            }
            resRow.push(sum)
        }
        res.push(resRow);
    }
    return res;
}