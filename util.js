import {
    widthCase
} from './constants.js';


export function randomNum(min, max){
    let random = Math.random();
    let randomNum = min + Math.floor(random *((max - min) + 1));
    return randomNum;
};

export function styleCase(block){

    block.style.position = "absolute";
    block.style.width = widthCase + "px"; 
    block.style.height = widthCase + "px";
    block.style.left = widthCase + "px"; 
    block.style.top = widthCase + "px"; 
    block.style.backgroundSize = "cover";
}

export function randomMove(){                    
    let random = randomNum(-1, 1)
    
    let random2;
    if(random == 0){  // si le nb = 0 , le deuxième doit être différent
        let random2 = randomNum(-1,1);
        if(random2 == 0){
            let a = [1, -1];
            random2 = randomNum(a[0],a[1]);
            console.log(random, random2)
            return [random, random2];

        }else{
            console.log(random, random2)
            return [random, random2];}

    }
    else{
        let random2 = 0
        console.log(random, random2)
        return [random, random2];
        
    }
}

    // two numbers
