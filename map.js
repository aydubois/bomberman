/* 
Creation of the map
*/
import {randomNum} from './util.js';
import {Player} from './players.js';
export class Map{
    constructor(rows, columns){
        this.rows = rows;
        this.columns = columns;
    }

    initSet(){
        const widthCase = 50;
        let i=0;
        const game = document.getElementById('game');
        game.style.width = (widthCase * this.columns) + "px";
        game.style.height = (widthCase * this.rows) + "px";
        
        const divPlayer = document.getElementById('divPlayer');
        divPlayer.style.width = (widthCase * this.columns) + "px";
        divPlayer.style.height = (widthCase * this.rows) + "px";

        for(let y=0; y<this.rows; y++){
            for(let x=0; x<this.columns; x++){
                const block = document.createElement('div');
                block.className = 'case';
                block.setAttribute('column', x);
                block.setAttribute('row', y);
                block.setAttribute('id', i);

                game.appendChild(block);
                i++;
            }
        }
        
        this.randomSoftWall(20);
        this.hardWall();
        this.initPlayer();
    }

    randomSoftWall(numberWall){
        let maxBlock = this.columns * this.rows;
        while(numberWall > 0){
            let id = randomNum(0, (maxBlock - 1));
            const wall = document.getElementById(id);
            wall.style.backgroundImage = 'url("wallSoft.jpg")';
            wall.style.backgroundSize = "cover";
            wall.style.backgroundColor = "black";
            numberWall--;
        }
    }

    hardWall(){
        const wallHard = document.querySelectorAll(`[row="0"],[row="${this.rows - 1}"],[column="0"],[column="${this.columns - 1}"]`);

        for( let block of wallHard){
            block.style.backgroundImage = 'url("wallHard.jpg")';
            block.style.backgroundSize = "cover";
            block.style.backgroundColor = "black";
        }
    }

    initPlayer(){
        const player = document.createElement('div');
        player.style.position = "absolute";
        player.className = 'player';
        player.style.width = "50px"; // A changer si changment dans scss
        player.style.height = "50px";
        player.style.left = "0";
        player.style.right = "0";
        player.style.backgroundImage = 'url("player1.png")';
        player.style.backgroundSize = "cover";
        const divPlayer = document.getElementById("divPlayer");
        divPlayer.appendChild(player);

        let player1 = new Player();
    }
}

