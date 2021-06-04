import {fastPermutation, hashArray, swap} from "./4dregtopeObject";

test("swap helper function tests", () => {

});

test("hashArray helper function tests", () => {

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
    console.log(points);
    
})