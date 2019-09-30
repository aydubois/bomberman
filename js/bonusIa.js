import {
    map
} from "./map.js";


export class AttributesIa {
    constructor() {
        this.attribut = {
            life: 3,
            actuelBomb: 0,
            maxBombs: 1,
            delayBomb: 3,
            damageBomb: 3,
            number: 0
        }
        this.dead = false;



    }

    numberBonus(nb) {
        this.attribut.number = nb;
        this.initLife();
    }
    initLife() {
        document.getElementById(`life_ai_${this.attribut.number-1}`).textContent = this.attribut.life;
    }

    removeLife(x, y) {
        if (map.grounds[y][x].flame == true) {
            this.attribut.life--;
            document.getElementById("sentence").textContent = "Le joueur " + this.attribut.number + " a perdu une vie";

            if (this.attribut.life <= 0) {
                this.dead = true;
                document.getElementById(`player${this.attribut.number}`).remove();
                document.getElementById("sentence").textContent = "le joueur " + this.attribut.number + " est mort";
            }
            this.initLife();
        }
    }

    addLife(x, y) {
        if (map.grounds[y][x].bonus == true && map.grounds[y][x].bonusName == "life") {
            this.attribut.life++;
            document.querySelector(`.bonus[x="${x}"][y="${y}"]`).remove();
            map.grounds[y][x].bonus = false;
            map.grounds[y][x].bonusName = null;
            document.getElementById("sentence").textContent = "Le joueur " + this.attribut.number + " a gagné une vie";

            setTimeout(() => {
                document.getElementById("sentence").textContent = " ";
            }, 2000);
            this.initLife();
        }
    }

    addBomb(x, y) {
        if (map.grounds[y][x].bonus == true && map.grounds[y][x].bonusName == "bomb") {
            this.attribut.maxBombs++;
            document.querySelector(`.bonus[x="${x}"][y="${y}"]`).remove();
            map.grounds[y][x].bonus = false;
            map.grounds[y][x].bonusName = null;

            document.getElementById("sentence").textContent = "Le joueur " + this.attribut.number + " peut poser une bombe supplémentaire";
            setTimeout(() => {
                document.getElementById("sentence").textContent = " ";
            }, 2000);

        }
    }

    addDamageBomb(x, y) {
        if (map.grounds[y][x].bonus == true && map.grounds[y][x].bonusName == "damage") {
            this.attribut.damageBomb++;
            document.querySelector(`.bonus[x="${x}"][y="${y}"]`).remove();
            map.grounds[y][x].bonus = false;
            map.grounds[y][x].bonusName = null;

            document.getElementById("sentence").textContent = "Les bombes du joueur " + this.attribut.number + " font plus de dégâts";
            setTimeout(() => {
                document.getElementById("sentence").textContent = " ";
            }, 2000);

        }
    }




}