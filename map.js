/* 
Creation of the map
*/
import {randomNum} from './util.js';
import {Timer} from './timer.js';

import {widthCase} from './constants.js';
import {Player} from './players.js';

export class Map{

    constructor(){
        this.grounds = [];
    }

    initSet(rows, columns){
        this.rows = rows;
        this.columns = columns;

        let i=0;
        const game = document.getElementById('game');
        game.style.width = (widthCase * this.columns) + "px";
        game.style.height = (widthCase * this.rows) + "px";
        
        const divPlayer = document.getElementById('divPlayer');
        divPlayer.style.width = (widthCase * this.columns) + "px";
        divPlayer.style.height = (widthCase * this.rows) + "px";

        for(let y=0; y<this.rows; y++){
            this.grounds.push([]);
            for(let x=0; x<this.columns; x++){
                this.grounds[y].push({
                    x:x,
                    y:y,
                    hardWall:false,
                    softWall:false
                });
                const block = document.createElement('div');
                block.className = 'case';
                block.setAttribute('column', x);
                block.setAttribute('row', y);
                block.setAttribute('id', i);

                game.appendChild(block);
                i++;
            }
            
        }
        console.log(this.grounds);
        this.randomSoftWall(40);
        this.hardWall();
        this.start();
        
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

            let y = parseInt(wall.getAttribute("row"), 10);
            let x = parseInt(wall.getAttribute("column"), 10);

            this.grounds[y][x].softWall = true;
        }
    }

    hardWall(){
        const wallHard = document.querySelectorAll(`[row="0"],[row="${this.rows - 1}"],[column="0"],[column="${this.columns - 1}"]`);

        for( let block of wallHard){
            block.style.backgroundImage = 'url("wallHard.jpg")';
            block.style.backgroundSize = "cover";
            block.style.backgroundColor = "black";

            let y = parseInt(block.getAttribute("row"), 10);
            let x = parseInt(block.getAttribute("column"), 10);

            this.grounds[y][x].hardWall = true;
        }
    }

    start(){
        let startButton = document.getElementById("start");
        startButton.addEventListener("click", ()=>{
            this.starter = new Timer();
            this.initPlayer();
        })
    }

    initPlayer(){

        const player = document.createElement('div');
        player.style.position = "absolute";
        player.className = 'player';
        player.setAttribute("id", "player1");
        player.style.width = widthCase + "px"; // A changer si changment dans scss
        player.style.height = widthCase + "px";
        player.style.left =widthCase + "px"; 
        player.style.top = widthCase + "px"; 
        player.style.backgroundImage = 'url("player1.png")';
        player.style.backgroundSize = "cover";
        const divPlayer = document.getElementById("divPlayer");
        divPlayer.appendChild(player);
    }

    move(player, x, y){

        let xFinal = player.x + x;
        let yFinal = player.y - y;

        if(this.grounds[yFinal][xFinal].hardWall == false && this.grounds[yFinal][xFinal].softWall == false){
            player.move(xFinal, yFinal);
        }
    }

}

export const map = new Map(); 
