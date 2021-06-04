import {fastPermutation, hashArray, swap} from "./Octaplex.js";

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

