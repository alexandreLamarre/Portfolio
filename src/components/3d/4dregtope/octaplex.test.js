import { fastPermutation, swap} from "./4dregtopeObject";

test("permutation function tests", () => {
    const arr = [1,1,0,0];
    const perms = fastPermutation(arr, 4);
    
    expect(perms).toContain([1,1,0,0]);

})