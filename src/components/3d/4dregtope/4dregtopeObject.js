/**
 * Class that represents the data & math behind 
 * the last 4d regular polytope (no analogous polyope of its kind in lower dimensions)
 * i.e. 24 cell : 
 */
class RegularPolytope4D{
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
        const positiveOrigin = [];
        const negativeOrigin = [];

        this.points = fastPermutation(positiveOrigin).concat(fastPermutation(negativeOrigin));
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

export default RegularPolytope4D;

/**
 * Helper function to generate permutations of given array
 * @param {*} arr the array to permute
 */
function fastPermutation(arr){
    //TODO: implement fast permutation helper method to generate the vertex coords of polytope
    const perms = arr;
    return perms;
}