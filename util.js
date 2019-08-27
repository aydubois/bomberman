function randomNum(min, max){
    let random = Math.random();
    let randomNum = min + Math.floor(random *((max - min) + 1));
    return randomNum;
}

export {randomNum};