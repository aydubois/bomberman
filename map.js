/* 
Creation of the map
*/
import {randomNum} from './util.js';
import {Timer} from './timer.js';

import {widthCase} from './constants.js';
import {styleCase} from './constants.js';

export class Map{

    constructor(){
        this.grounds = [];
        this.bonusItems = [
            "life", "bomb"
        ]
    }

    initSet(rows, columns){
        this.rows = rows;
        this.columns = columns;

        let i=0;
        const game = document.getElementById('game');
        game.style.width = (widthCase * this.columns) + "px";
        game.style.height = (widthCase * this.rows) + "px";
        

        for(let y=0; y<this.rows; y++){
            this.grounds.push([]);
            for(let x=0; x<this.columns; x++){
                const block = document.createElement('div');
                this.grounds[y].push({
                    x:x,
                    y:y,
                    hardWall:false,
                    softWall:false,
                    bonus:false,
                    bonusName:null,
                    bomb:false,
                    top:0,
                    left:0,
                    block
                });
                
                block.className = 'case';
                block.setAttribute('column', x);
                block.setAttribute('row', y);
                block.setAttribute('id', i);

                game.appendChild(block);
                i++;
            }
            
        }
        console.log(this.grounds);
        this.randomSoftWall(100);
        this.hardWall();
        this.start();
        this.starter = null;
        
    }
/**
 * 
 * @param {int} numberWall  nombre de mur  
 */
    randomSoftWall(numberWall){
        let maxBlock = this.columns * this.rows;
        while(numberWall > 0){
            let id = randomNum(0, (maxBlock - 1));
            while(id == 16 || id == 17 || id == 31){
                id =randomNum(0, (maxBlock - 1));
            }
            const wall = document.getElementById(id);
            wall.style.backgroundImage = 'url("wallSoft.jpg")';
            wall.style.backgroundSize = "cover";
            wall.style.backgroundColor = "black";
            numberWall--;

            let y = parseInt(wall.getAttribute("row"), 10);
            let x = parseInt(wall.getAttribute("column"), 10);

            this.grounds[y][x].softWall = true;
            
            this.bonus(x, y, id)
        }
    }
    /**
     * If id softWall =  peer  => add bonus
     * @param {*} x Position x softWall
     * @param {*} y Position y softWall
     * @param {*} id id softwall
     */
    bonus(x,y, id){
        if(id%2 == 0){
        let randomItem = randomNum(0, this.bonusItems.length-1);
        let bonus = document.createElement("div");
        bonus.className = "bonus";
        bonus.setAttribute("x", x);
        bonus.setAttribute("y", y);
        bonus.setAttribute("item", this.bonusItems[randomItem])
        styleCase(bonus)
        bonus.style.left = x * widthCase + "px";
        bonus.style.top = y * widthCase + "px";
        bonus.style.backgroundImage = `url("bonus${this.bonusItems[randomItem]}.jpeg")`;
        bonus.style.zIndex = -1;
        document.getElementById("divPlayer").appendChild(bonus);
        this.grounds[y][x].bonus = true;
        this.grounds[y][x].bonusName = this.bonusItems[randomItem];
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
            if(this.starter == null || this.starter.finished == true){
            this.starter = new Timer();
            this.initPlayer();}
        })
    }

    initPlayer(){
        if(!document.getElementById("player1")){
        const player = document.createElement('div');
        player.className = 'player';
        player.setAttribute("id", "player1");
        styleCase(player);
        player.style.backgroundImage = 'url("player1.png")';
        player.style.zIndex = 2;
        const divPlayer = document.getElementById("divPlayer");
        divPlayer.appendChild(player);
    }
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
