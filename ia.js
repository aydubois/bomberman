import {
    randomNum, randomMove
} from "./util.js";
import {
    map
} from "./map.js";

import {
    widthCase, styleCase
} from './constants.js';
import { AttributesIa } from "./bonusIa.js";


export class Ia {

    constructor(number) {

        this.number = number;
        this.bombs = [];
        this.sizeArray = 0;
        this.attributes = new AttributesIa;
        this.ia = document.getElementById(`"player${this.number}"`) // ???? pq null ???
        this.initPosition();
        this.startListening();

    }
    /**
     * start listening to the player's movements
     * left, right, down, up
     */
    initPosition(){
        if(this.number == 1){
            this.x = 1;
            this.y = 1;
        }
        if(this.number == 2){
            this.x = 13;
            this.y = 1;
        }
        if(this.number == 3){
            this.x = 1;
            this.y = 13;
        }
        if(this.number == 4){
            this.x = 13;
            this.y = 13;
        }
    }
    startListening() {
        console.log(this.ia)

        document.addEventListener('keydown', (event) => {
            if (event.keyCode == 37 ||
                event.keyCode == 38 ||
                event.keyCode == 39 ||
                event.keyCode == 40 ||
                event.keyCode == 32) {
                    if(document.getElementById("player2")){
                    let random = randomNum(-1, 2)
                    
                    
                    if (random == 2) {  
                        
                        this.canBomb()
                        let random2 = randomMove()
                        this.tryMove(random2[0], random2[1]);
                    } else {
                        
                        let random2 = randomMove()
                        this.tryMove(random2[0], random2[1])
                    }
                    event.preventDefault();
                    event.stopPropagation();
                    
            }}
        });
    }

    /**
     * @param {*} x movements left/right
     * @param {*} y movements up/down
     */
    tryMove(x, y) {
        map.move(this, x, y);
    }

    /**
     * update position of player && attributes
     */
    move(x, y) {
        this.x = x;
        this.y = y;

        const player = document.getElementById("player2");
        player.style.left = (this.x * widthCase) + "px";
        player.style.top = (this.y * widthCase) + "px";
        if(map.grounds[y][x].flame == true){
            this.tryMove(randomNum(-1, 1),randomNum(-1, 1))
        }
        this.attributes.addLife(x,y);
        this.attributes.addBomb(x,y);
        this.attributes.addDamageBomb(x,y);
        this.attributes.removeLife(x,y)
    }


    /**
     * Puts bomb and updates map.grounds and starts trigger
     */
    putBomb() {

        // search position of player
        let left = this.x * widthCase;
        let top = this.y * widthCase;

        //create bomb
        let id = "bomb" + this.bombs.length;
        const bomb = document.createElement('div');
        bomb.style.position = "absolute";
        bomb.className = 'bomb';
        bomb.setAttribute("id", id);
        bomb.style.width = widthCase + "px"; // A changer si changment dans scss
        bomb.style.height = widthCase + "px";
        bomb.style.left = left + "px";
        bomb.style.top = top + "px";
        bomb.style.backgroundImage = 'url("bomb.png")';
        bomb.style.backgroundSize = "cover";

        const caseBomb = document.querySelector(`[row="${top/widthCase}"][column="${left/widthCase}"]`);
        caseBomb.appendChild(bomb);
        this.attributes.attribut.actuelBomb++;
        this.sizeArray++

        //update map.grounds and coordinate
        let x = this.x;
        let y = this.y;
        let b = {
            x: x,
            y: y,
            bomb: bomb,
            id: id
        }
        map.grounds[y][x].bomb = b;

        this.bombs.push(b);
        //trigger detonate
        this.triggerDetonate(b);

    }

    /**
     * checking if to put bomb is ok
     */
    canBomb() {

        //check not an over bomb 
        if (map.grounds[this.y][this.x].bomb) {
            console.log('probleme')
            return;
        }
        else if (this.attributes.attribut.actuelBomb == this.attributes.attribut.maxBombs){
            console.log('probleme2')
            return;
        
        }
        else {
            console.log('marche')
            this.putBomb();
        }

        //check max bomb
        
    }

    /**
     * Starting trigger for bomb detonation
     * @param {*} bomb Object => last bomb 
     */
    triggerDetonate(bomb) {
        let timeBomb = 1 * 1000;
        let timeout = setTimeout(() => {
            bomb.timeout = null
            this.detonate(bomb)
        }, timeBomb);
        bomb.timeout = timeout
    }

    /**
     * Removes bomb and starts detonations 
     * @param {*} bomb Object => last bomb
     */
    detonate(bomb) {
        //search bomb to detonate and remove attributes
        map.grounds[bomb.y][bomb.x].bomb = null;
        bomb.bomb.remove()
        this.attributes.attribut.actuelBomb--;
        let index = this.bombs.indexOf(bomb);
        if (index != -1) {
            this.bombs.splice(index, 1);
        };
        let x = bomb.x;
        let y = bomb.y;
        this.detonateLeft(x, y)
        this.detonateRight(x, y)
        this.detonateBottom(x, y)
        this.detonateTop(x, y)

    }

    /**
     * first if : if cases to the left of bomb are nonexistent
     * second : if player is on this case
     * third : if there is softwall 
     * @param {*} x Position x of bomb
     * @param {*} y Position y of bomb
     */
    detonateLeft(x, y) {
        for (let k = 1; k < this.attributes.attribut.damageBomb; k++) { //around 3 cases
            if (!map.grounds[y][x - k] || !map.grounds[y] || map.grounds[y][x - k].hardWall == true) {
                return;
            }
            this.flame(x - k, y);
            if (x - k == this.x && y == this.y) {
                return;
            }

            if (map.grounds[y][x - k].softWall == true && map.grounds[y][x - k].hardWall == false) {

                map.grounds[y][x - k].softWall = false;
                if(map.grounds[y][x - k].bonus == true){
                    let bonusSelect = document.querySelector(`.bonus[x="${x-k}"][y="${y}"]`);
                    bonusSelect.style.zIndex = 1;
                }
                break;
            }
        }

    }

    /**
     * idem in the right
     * @param {*} x Position x of bomb
     * @param {*} y Position y of bomb
     */
    detonateRight(x, y) {
        for (let k = 1; k < this.attributes.attribut.damageBomb; k++) {
            if (!map.grounds[y][x + k] || !map.grounds[y] || map.grounds[y][x + k].hardWall == true) {
                return;
            }
            this.flame(x + k, y);
            if (x + k == this.x && y == this.y) {
                return;
            }
            if (map.grounds[y][x + k].softWall == true && map.grounds[y][x + k].hardWall == false) {

                map.grounds[y][x + k].softWall = false;
                if(map.grounds[y][x + k].bonus == true){
                    let bonusSelect = document.querySelector(`.bonus[x="${x+k}"][y="${y}"]`);
                    bonusSelect.style.zIndex = 1;
                }
                break;
            }


        }
    }
    /**
     * idem in the top
     * @param {*} x Position x of bomb
     * @param {*} y Position y of bomb
     */
    detonateTop(x, y) {
        for (let k = 1; k < this.attributes.attribut.damageBomb; k++) {
            if (!map.grounds[y - k] || !map.grounds[y - k][x] || map.grounds[y - k][x].hardWall == true) {
                return;
            }
            this.flame(x, y - k);
            if (x == this.x && y - k == this.y) {
                return;
            }
            if (map.grounds[y - k][x].softWall == true && map.grounds[y - k][x].hardWall == false) {

                map.grounds[y - k][x].softWall = false;
                if(map.grounds[y-k][x].bonus == true){
                    let bonusSelect = document.querySelector(`.bonus[x="${x}"][y="${y-k}"]`);
                    bonusSelect.style.zIndex = 1;
                }
                break;
            }
        }
    }

    /**
     * idem in the bottom
     * @param {*} x Position x of bomb
     * @param {*} y Position y of bomb
     */
    detonateBottom(x, y) {
        for (let k = 1; k < this.attributes.attribut.damageBomb; k++) {
            if (!map.grounds[y + k] || !map.grounds[y + k][x] || map.grounds[y + k][x].hardWall == true) {
                return;
            }

            this.flame(x, y + k);
            if (x == this.x && y + k == this.y) {
                return;
            }
            if (map.grounds[y + k][x].softWall == true && map.grounds[y + k][x].hardWall == false) {

                map.grounds[y + k][x].softWall = false;
                if(map.grounds[y+k][x].bonus == true){
                    let bonusSelect = document.querySelector(`.bonus[x="${x}"][y="${y+k}"]`);
                    bonusSelect.style.zIndex = 1;
                }
                break;
            }

        }
    }

    /**
     * add element flame
     * setup timer before removing
     * change trigger of bomb if a flame touch it
     * @param {*} xFlame Position x of flame
     * @param {*} yFlame Position y of flame
     */
    flame(xFlame, yFlame) {

        const flame = document.createElement("div");
        flame.style.backgroundImage = 'url("flame.gif")';
        flame.style.opacity = 0.70;
        flame.style.backgroundColor = "#E4CD8E";
        styleCase(flame);
        flame.style.left = xFlame * widthCase + "px";
        flame.style.top = yFlame * widthCase + "px";
        flame.style.zIndex = 2;
        const divPlayer = document.getElementById("divPlayer");
        divPlayer.appendChild(flame);
        map.grounds[yFlame][xFlame].flame = true;


        if (map.grounds[yFlame][xFlame].bomb) {

            if (map.grounds[yFlame][xFlame].bomb.timeout) {
                clearTimeout(map.grounds[yFlame][xFlame].bomb.timeout)
                map.grounds[yFlame][xFlame].bomb.timeout = null;
                setTimeout(() => {
                    this.detonate(map.grounds[yFlame][xFlame].bomb)
                }, 150)

            }
        }
        setTimeout(() => {
            map.grounds[yFlame][xFlame].block.style.backgroundImage = "none";
            map.grounds[yFlame][xFlame].block.style.backgroundColor = "#E4CD8E";
            map.grounds[yFlame][xFlame].flame = false;
            flame.remove();
        }, 1000)

        if(xFlame == this.x && yFlame == this.y){
            this.attributes.removeLife(this.x, this.y);}
    }

}