/* 
Creation of the map
*/
const game = document.getElementById('game');

let widthGame = 15;
let heightGame = 15;
let numberBlock = widthGame * heightGame;
let i=1;
while (numberBlock >0) {
    const block = document.createElement('div');
    block.className='case';
    block.setAttribute('id', i);
    block.setAttribute('row', Math.ceil(i/widthGame) );
    block.setAttribute('column', NumColumn(i));
    game.appendChild(block);
    i++;
    numberBlock--;
}

function NumColumn(i){
    let result = i%widthGame;
    if(result == 0){
        return 15;
    }
    else{
    return result;}
}

/* 
Creation of the decoration
*/

// Set up soft walls
function randomNum(min, max){
    let random = Math.random();
    let randomNum = min + Math.floor(random *((max - min) + 1));
    return randomNum;
}

function randomBlock(numberWall){
    while(numberWall > 0){
        let id = randomNum(1,(widthGame*heightGame))
        const wall = document.getElementById(id);
        if(!wall) {
            console.log(id)
        }
        wall.style.backgroundImage = 'url("wallSoft.jpg")';
        wall.style.backgroundSize = "cover";
        wall.style.backgroundColor = "black";
        numberWall--;
    }
}

randomBlock(100);

// Set up hard walls

const wallHard = document.querySelectorAll(`[row="1"],[row="${widthGame}"],[column="1"],[column="${heightGame}"]`);

for( let block of wallHard){
    block.style.backgroundImage = 'url("wallHard.jpg")';
    block.style.backgroundSize = "cover";
    block.style.backgroundColor = "black";
}

