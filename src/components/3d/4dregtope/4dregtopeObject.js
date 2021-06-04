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
        this.rotation = new Float32Array(16);
        
        //TODO: set coords and rotation appropriately
        // (default rotation should be identity)

        const points = [];
        const origins = [[1, 1, 0, 0], [-1, -1, 0, 0], [1, -1, 0, 0]];
        this.hash = new Set();
        for(let arr in origins){
            for(let p of fastPermutation(arr)){
                let identifier = hashArray(p);
                if(!this.hash.has(identifier)){
                    points.push(p);
                }
                this.hash.add(identifier);
            }
        }
        
    }

    /**
     * Gets the general rotation matrix of a 4d object
     * based on input params
     */
    setGeneralRotation4D(){
        //TODO: return a general 4d rotation matrix with appropriate input params.
    }

    /**
     * Rotates the 24-cell's coordinates in place 
     * Rotation type is determined by the object's currently set rotation matrix
     */
    applyRotation(){
        //TODO: rotate the 24 cell's coordinates in place 
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
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

/**
 * Hashes 4d coord arrays as integers for easy use in sets
 * @param {Array} arr 
 * @returns 
 */
export function hashArray(arr){
    let hashNum = 0;
    let cur = 1;
    let curOffset = Math.pow(2,5);
    for(let i = 0; i < arr.length; i++){
        if(arr[i] > 0){
            hashNum += arr[i]*cur;
        }else {
            hashNum += arr[i]*curOffset;
        }
        
        cur *= 2;
        curOffset *=2;
    }
    return hashNum;
}