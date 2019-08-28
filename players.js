import {widthCase} from './constants.js';
import {map} from "./map.js";

export class Player{
    
    constructor(){
        this.x = 1;
        this.y = 1;
        this.life = 1;
        this.lastBomb = [];

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
        // search position of player
        const player = document.getElementById("player1");
        let left = parseInt(player.style.left);
        let top = parseInt(player.style.top);
        
        //create bomb
        const bomb = document.createElement('div');
        bomb.style.position = "absolute";
        bomb.className = 'bomb';
        bomb.setAttribute("id", "bomb1");
        bomb.style.width = widthCase + "px"; // A changer si changment dans scss
        bomb.style.height = widthCase + "px";
        bomb.style.left = left + "px"; 
        bomb.style.top = top + "px"; 
        bomb.style.backgroundImage = 'url("bomb.png")';
        bomb.style.backgroundSize = "cover";
        
        const caseBomb = document.querySelector(`[row="${top/widthCase}"][column="${left/widthCase}"]`);
        caseBomb.appendChild(bomb);

        //update map.grounds and coordinate
        let x = parseInt(bomb.style.left)/widthCase;
        let y =parseInt(bomb.style.top)/widthCase;
        map.grounds[y][x].top = y;
        map.grounds[y][x].left = x;
        map.grounds[y][x].bomb = true;
        this.lastBomb.push({
            x:x,
            y:y
        });
        //trigger detonate
        this.triggerDetonate();
    }

    canBomb(){
        const player = document.getElementById("player1");
        let left = parseInt(player.style.left)/widthCase;
        let top = parseInt(player.style.top)/widthCase;

        //check not an over bomb 
        if(left == map.grounds[top][left].left && top == map.grounds[top][left].top){
            return;
        }
        else{
            this.putBomb();
        }
    }

    triggerDetonate(){
        let timeBomb = 5*1000;
        setTimeout( ()=>{this.detonate()}, timeBomb);
    }

    detonate(){ 
        let last = this.lastBomb.length-1;
        let lastX = this.lastBomb[last].x;
        let lastY = this.lastBomb[last].y;
        
        let lastCase = document.getElementById("bomb1");
        lastCase.style.backgroundImage = "none";

        map.grounds[this.lastBomb[last].y][this.lastBomb[last].x].bomb = false;
        map.grounds[this.lastBomb[last].y][this.lastBomb[last].x].top = 0;
        map.grounds[this.lastBomb[last].y][this.lastBomb[last].x].left = 0;
        
        


    }
}