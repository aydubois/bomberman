export const widthCase = 50;

export function styleCase(block){

    block.style.position = "absolute";
    block.style.width = widthCase + "px"; 
    block.style.height = widthCase + "px";
    block.style.left = widthCase + "px"; 
    block.style.top = widthCase + "px"; 
    block.style.backgroundSize = "cover";
}