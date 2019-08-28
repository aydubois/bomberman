import {widthCase} from './constants.js';
import {map} from "./map.js";

export class Player{
    
    constructor(){
        this.x = 1;
        this.y = 1;
        this.life = 1;

        this.startListening();
        this.listeningBomb();
    }


    startListening(){
        document.addEventListener('keydown', (event)=>{
            if(event.keyCode == 37) {
                //left
                this.tryMove(-1, 0);
                event.preventDefault();
                event.stopPropagation();
            }
        });
        document.addEventListener('keydown', (event)=>{
            if(event.keyCode == 39){
                //right
                this.tryMove(1, 0);
                event.preventDefault();
                event.stopPropagation();
            }
        });
        document.addEventListener('keydown', (event)=> {
            if(event.keyCode == 40){
                //down
                this.tryMove(0, -1);
                event.preventDefault();
                event.stopPropagation();
            }
        })
        document.addEventListener('keydown', (event)=>{
            if(event.keyCode == 38){
                //up
                this.tryMove(0, 1);
                event.preventDefault();
                event.stopPropagation();
            }
        })
    }

    tryMove(x,y){
        map.move(this, x, y);
    }

    move(x,y){
        this.x = x;
        this.y = y;

        const player = document.getElementById("player1");
        player.style.left = (this.x * widthCase) + "px";
        player.style.top = (this.y * widthCase) + "px";
        }

    listeningBomb(){

        document.addEventListener('keydown', (event)=>{
            if(event.keyCode == 32) {
                this.canBomb();
                event.preventDefault();
                event.stopPropagation();
            }
        });
    }
    putBomb(){
        const player = document.getElementById("player1");
        let left = player.style.left;
        let top = player.style.top;

        const bomb = document.createElement('div');
        bomb.style.position = "absolute";
        bomb.className = 'bomb';
        bomb.setAttribute("id", "bomb1");
        bomb.style.width = widthCase + "px"; // A changer si changment dans scss
        bomb.style.height = widthCase + "px";
        bomb.style.left = parseInt(left, 10) + "px"; 
        bomb.style.top = parseInt(top, 10) + "px"; 
        bomb.style.backgroundImage = 'url("bomb.png")';
        bomb.style.backgroundSize = "cover";
        const divPlayer = document.getElementById("divPlayer");
        divPlayer.appendChild(bomb);


        let x = parseInt(bomb.style.left)/widthCase;
        let y =parseInt(bomb.style.top)/widthCase;
        map.grounds[y][x].top = y;
        map.grounds[y][x].left = x;
        map.grounds[y][x].bomb = true;
    }

    canBomb(){
        const player = document.getElementById("player1");
        let left = parseInt(player.style.left)/widthCase;
        let top = parseInt(player.style.top)/widthCase;

        if(left == map.grounds[top][left].left && top == map.grounds[top][left].top){
            return;
        }
        else{
            this.putBomb();
        }
        
    }
}