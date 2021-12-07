export const scrollerStart = 0;
export const scrollerEnd = 100;

/**
 * 
 */
export default function scrollerProgress(cur){
    if (cur === 0) cur = 10;

    return Math.min(cur + Math.log(cur), 100); 
}