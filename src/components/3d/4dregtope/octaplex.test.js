import {fastPermutation, hashArray, swap, clamp4, multiplyMatrix} from "./Octaplex.js";
import OctaPlex from "./Octaplex.js";

test("swap helper function tests", () => {
    let arr = [1,2,3,4,5,6,7];
    swap(arr, 0, 6);
    expect(arr[0]).toBe(7);
    expect(arr[6]).toBe(1);

    swap(arr, 0, 3);
    expect(arr[0]).toBe(4);
    expect(arr[3]).toBe(7);
});

test("hashArray helper function tests", () => {
    //Assumes 4d arrays as input
    let arr = [1, 1, 1, 1];
    expect(hashArray(arr)).toBe(1+2+4+8);
    arr = [-1, 0, 0, 0];
    expect(hashArray(arr)).toBe(32);
    arr = [1, 1, 1, -1];
    expect(hashArray(arr)).toBe(32*2*2*2 + 1 + 2 + 4);
    arr = [1,-1,-1,1];
    expect(hashArray(arr)).toBe(1 + 8 + 32*2 + 32*4);
});

test("permutation helper function tests", () => {
    let arr = [1,1,0,0];
    let res = new Set();
    const points = [];
    for(let i of fastPermutation(arr,4)){
        let identifier = hashArray(i);
        if(!res.has(identifier)){
            points.push(i);
        }
        res.add(identifier);
    }
    expect(points.length).toBe(6);
    expect(points).toContainEqual([1,1,0,0]);
    expect(points).toContainEqual([1,0,1,0]);
    expect(points).toContainEqual([0,1,1,0]);
    expect(points).toContainEqual([0,1,0,1]);
    expect(points).toContainEqual([0,0,1,1]);
    expect(points).toContainEqual([1,0,0,1]);

    arr = [-1, -1, 0, 0];
    for(let i of fastPermutation(arr, 4)){
        let identifier = hashArray(i);
        if(!res.has(identifier)){
            points.push(i)
        }
        res.add(identifier);
    }

    expect(points.length).toBe(12);
    expect(points).toContainEqual([-1,-1,0,0]);
    expect(points).toContainEqual([-1,0,-1,0]);
    expect(points).toContainEqual([0,-1,-1,0]);
    expect(points).toContainEqual([0,-1,0,-1]);
    expect(points).toContainEqual([0,0,-1,-1]);
    expect(points).toContainEqual([-1,0,0,-1]);

    arr = [1, -1, 0, 0];
    for(let i of fastPermutation(arr,4)){
        let identifier = hashArray(i);
        if(!res.has(identifier)){
            points.push(i);
        }
        res.add(identifier);
    }

    expect(points.length).toBe(24);
    expect(points).toContainEqual([1,-1,0,0]);
    expect(points).toContainEqual([1,0,-1,0]);
    expect(points).toContainEqual([0,1,-1,0]);
    expect(points).toContainEqual([0,1,0,-1]);
    expect(points).toContainEqual([0,0,1,-1]);
    expect(points).toContainEqual([1,0,0,-1]);
    expect(points).toContainEqual([-1,1,0,0]);
    expect(points).toContainEqual([-1,0,1,0]);
    expect(points).toContainEqual([0,-1,1,0]);
    expect(points).toContainEqual([0,-1,0,1]);
    expect(points).toContainEqual([0,0,-1,1]);
    expect(points).toContainEqual([-1,0,0,1]);
    
});

test("clamp4 helper function tests", () => {
    let a = 1; let b = 2; let c = 3; let d = 4;
    expect(a*a + b*b + c*c + d*d < 1 + 0.005 && a*a + b*b + c*c + d*d > 1 -0.005).toBe(false);
    [a,b,c,d] = clamp4(a, b, c, d);
    let res = a * a + b* b + c * c + d * d;
    expect(res > 1 - 0.005 && res < 1 + 0.005).toBe(true);


    a = -5; b = 7; c = 20; d = -15;
    res = a * a + b* b + c * c + d * d;
    expect(res > 1 - 0.005 && res < 1 + 0.005).toBe(false);

    [a, b, c, d] = clamp4(a, b, c ,d);
    res = a * a + b* b + c * c + d * d;
    expect(res > 1 - 0.005 && res < 1 + 0.005).toBe(true);
});

test("multiply matrix helper function tests", () => {
    const mat1 = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
    const mat2 = [[2, 3, 4], [4, 5, 6], [7, 8, 9]];

    expect(multiplyMatrix(mat1, mat2)[0]).toEqual(mat2[0]);
    expect(multiplyMatrix(mat1, mat2)[1]).toEqual(mat2[1]);
    expect(multiplyMatrix(mat1, mat2)[2]).toEqual(mat2[2]);

    const mat3 = [[17,4], [17,16]];
    const mat4 = [[9, 2], [7, 1]];
    const res = [[181, 38], [265, 50]];
    expect(multiplyMatrix(mat3, mat4)[0]).toEqual(res[0]);
    expect(multiplyMatrix(mat3, mat4)[1]).toEqual(res[1]);

});

test("Octaplex constructor", () =>{
    const octa = new OctaPlex();

    expect(octa.points.length).toBe(24);
    expect(octa.points).toContainEqual([1,1,0,0]);
    expect(octa.points).toContainEqual([1,0,1,0]);
    expect(octa.points).toContainEqual([0,1,1,0]);
    expect(octa.points).toContainEqual([0,1,0,1]);
    expect(octa.points).toContainEqual([0,0,1,1]);
    expect(octa.points).toContainEqual([1,0,0,1]);
    expect(octa.points).toContainEqual([-1,-1,0,0]);
    expect(octa.points).toContainEqual([-1,0,-1,0]);
    expect(octa.points).toContainEqual([0,-1,-1,0]);
    expect(octa.points).toContainEqual([0,-1,0,-1]);
    expect(octa.points).toContainEqual([0,0,-1,-1]);
    expect(octa.points).toContainEqual([-1,0,0,-1]);
    expect(octa.points).toContainEqual([1,-1,0,0]);
    expect(octa.points).toContainEqual([1,0,-1,0]);
    expect(octa.points).toContainEqual([0,1,-1,0]);
    expect(octa.points).toContainEqual([0,1,0,-1]);
    expect(octa.points).toContainEqual([0,0,1,-1]);
    expect(octa.points).toContainEqual([1,0,0,-1]);
    expect(octa.points).toContainEqual([-1,1,0,0]);
    expect(octa.points).toContainEqual([-1,0,1,0]);
    expect(octa.points).toContainEqual([0,-1,1,0]);
    expect(octa.points).toContainEqual([0,-1,0,1]);
    expect(octa.points).toContainEqual([0,0,-1,1]);
    expect(octa.points).toContainEqual([-1,0,0,1]);


    //make sure left & right isoclinic matrices set to identity by default
    expect(octa.leftIsoclinic.length).toBe(4);
    expect(octa.leftIsoclinic).toContainEqual([1, 0, 0, 0]);
    expect(octa.leftIsoclinic).toContainEqual([0, 1, 0, 0]);
    expect(octa.leftIsoclinic).toContainEqual([0, 0, 1, 0]);
    expect(octa.leftIsoclinic).toContainEqual([0, 0, 0, 1]);

    expect(octa.rightIsoclinic.length).toBe(4);
    expect(octa.rightIsoclinic).toContainEqual([1, 0, 0, 0]);
    expect(octa.rightIsoclinic).toContainEqual([0, 1, 0, 0]);
    expect(octa.rightIsoclinic).toContainEqual([0, 0, 1, 0]);
    expect(octa.rightIsoclinic).toContainEqual([0, 0, 0, 1]);
});
