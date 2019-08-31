import { map } from "./map.js";


export class Attributes {
    constructor() {
        this.attribut = {
            life: 1,
            maxBombs: 1,
            delayBomb: 3,
            damageBomb: 1
        }
        this.dead = false

    }

    removeLife() {
        this.attribut.life--;
        if (this.attribut.life <= 0) {
            this.dead = true;
            document.getElementById("player1").remove();
            document.getElementById("sentence").textContent = "YOU LOST, TRY AGAIN";
        }

    }

    addLife(x, y) {
        if(map.grounds[y][x].bonus == true){
            this.attribut.life++;
            document.querySelector(`.bonus[x="${x}"][y="${y}"]`).remove();
            map.grounds[y][x].bonus == false;
            document.getElementById("sentence").textContent = "YOU WON A LIFE";
            setTimeout(()=>{
                document.getElementById("sentence").textContent = " ";
            }, 2000);
        
        }
    }

    addBomb(){

    }




}