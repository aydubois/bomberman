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
    if(random == 0){  // si le nb = 0 , le deuxième doit être différent
        let random2 = randomNum(-1,1);
        if(random2 == 0){
            let aA = [1, -1];
            random2= aA[Math.floor(Math.random()*aA.length)];
            
            console.log("essai nb aleatoir" + random, random2)
            return [random, random2];

        }else{
            return [random, random2];}

    }
    else{
        let random2 = 0
        return [random, random2];
        
    }
}

    // two numbers
