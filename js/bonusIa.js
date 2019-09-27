import { map } from "./map.js";


export class AttributesIa {
    constructor() {
        this.attribut = {
            life: 1,
            actuelBomb: 0,
            maxBombs: 1,
            delayBomb: 3,
            damageBomb: 3
        }
        this.dead = false

    }

    removeLife(x,y, number) {
        if(map.grounds[y][x].flame == true){
        this.attribut.life--;
        document.getElementById("sentence").textContent = "Le joueur " + number + " a perdu une vie";

        if (this.attribut.life <= 0) {
            this.dead = true;
            document.getElementById(`player${number}`).remove();
            document.getElementById("sentence").textContent = "le joueur " + number + " est mort";
            

            document.getElementById("start").textContent = "Remise à zéro";
            let end = document.createElement("div");
            end.setAttribute("id", "end");
            end.textContent = "You WIN"
            document.getElementById("main_wrapper").replaceChild(end, game);
            document.getElementById("main_wrapper").removeChild(divPlayer);
        }
    }
        console.log(this.attribut.life)
    }

    addLife(x, y) {
        if(map.grounds[y][x].bonus == true && map.grounds[y][x].bonusName == "life"){
            this.attribut.life++;
            document.querySelector(`.bonus[x="${x}"][y="${y}"]`).remove();
            map.grounds[y][x].bonus = false;
            map.grounds[y][x].bonusName = null;
            document.getElementById("sentence").textContent = "Le joueur 2 a gagné une vie";
    
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

            document.getElementById("sentence").textContent = "Le joueur 2 peut poser une bombe supplémentaire";
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

            document.getElementById("sentence").textContent = "Les bombes du joueur 2 font plus de dégâts";
            setTimeout(()=>{
                document.getElementById("sentence").textContent = " ";
            }, 2000);
        
        }
    }




}