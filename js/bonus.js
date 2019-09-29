import { map } from "./map.js";


export class Attributes {
    constructor() {
        this.attribut = {
            life: 3,
            actuelBomb: 0,
            maxBombs: 1,
            delayBomb: 3,
            damageBomb: 3
        }
        this.dead = false
        this.initLife();

    }

    initLife() {
        document.getElementById("player_life").textContent = this.attribut.life;
    }

    removeLife(x,y) {
        if(map.grounds[y][x].flame == true){
        this.attribut.life--;
        document.getElementById("sentence").textContent = "YOU LOST A LIFE";

        if (this.attribut.life <= 0) {
            this.dead = true;
            document.getElementById("player1").remove();
            document.getElementById("start").textContent = "Remise à zéro";
            let end = document.createElement("div");
            end.setAttribute("id", "end");
            end.textContent = " END OF THE GAME"
            document.getElementById("main_wrapper").replaceChild(end, game);
            document.getElementById("main_wrapper").removeChild(divPlayer);
        }
        this.initLife();
    }
    }

    addLife(x, y) {
        if(map.grounds[y][x].bonus == true && map.grounds[y][x].bonusName == "life"){
            this.attribut.life++;
            document.querySelector(`.bonus[x="${x}"][y="${y}"]`).remove();
            map.grounds[y][x].bonus = false;
            map.grounds[y][x].bonusName = null;
            document.getElementById("sentence").textContent = "YOU WON A LIFE";
            setTimeout(()=>{
                document.getElementById("sentence").textContent = " ";
            }, 2000);

        }
    }

    addBomb(x, y){
        if(map.grounds[y][x].bonus == true && map.grounds[y][x].bonusName == "bomb"){
            this.attribut.maxBombs++;
            document.querySelector(`.bonus[x="${x}"][y="${y}"]`).remove();
            map.grounds[y][x].bonus = false;
            map.grounds[y][x].bonusName = null;

            document.getElementById("sentence").textContent = "YOU WON AN ADDITIONAL BOMB";
            setTimeout(()=>{
                document.getElementById("sentence").textContent = " ";
            }, 2000);
        
        }
    }

    addDamageBomb(x,y){
        if(map.grounds[y][x].bonus == true && map.grounds[y][x].bonusName == "damage"){
            this.attribut.damageBomb++;
            document.querySelector(`.bonus[x="${x}"][y="${y}"]`).remove();
            map.grounds[y][x].bonus = false;
            map.grounds[y][x].bonusName = null;

            document.getElementById("sentence").textContent = "YOUR BOMBS DO MORE DAMAGE";
            setTimeout(()=>{
                document.getElementById("sentence").textContent = " ";
            }, 2000);
        
        }
    }




}