import {widthCase} from './constants.js';
import {map} from "./map.js";

export class Player{
    
    constructor(){
        this.x = 1;
        this.y = 1;
        this.life = 1;

        this.startListening();
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

    bomb(){
    
    }

    canBomb(){

    }
}