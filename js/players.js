import {
    widthCase
} from './constants.js';
import {
    styleCase
} from './util.js';
import {
    map
} from "./map.js";
import {
    Attributes
} from "./bonus.js";

export class Player {

    constructor() {
        this.x = 1;
        this.y = 1;
        this.bombs = [];
        this.sizeArray = 0;
        this.attributes = new Attributes;
        this.position = [this.x, this.y]
        this.nbTryDetonate = 0;
        map.allPositions[0] = this.position;
        this.startListening();
        this.listeningBomb();
        map.initAll(this)

        this.removeLife()
    }
    /**
     * start listening to the player's movements
     * left, right, down, up
     */
    startListening() {
        document.addEventListener('keydown', (event) => {
            if (event.keyCode == 37) {
                //left
                    if(document.getElementById("player1")){
                this.tryMove(-1, 0);
                event.preventDefault();
                event.stopPropagation();}
            }
        });
        document.addEventListener('keydown', (event) => {
            if (event.keyCode == 39) {
                    if(document.getElementById("player1")){
                        //right
                this.tryMove(1, 0);
                event.preventDefault();
                event.stopPropagation();}
            }
        });
        document.addEventListener('keydown', (event) => {
            if (event.keyCode == 40) {
                //down
                if(document.getElementById("player1")){

                this.tryMove(0, -1);
                event.preventDefault();
                event.stopPropagation();}
            }
        })
        document.addEventListener('keydown', (event) => {
            if (event.keyCode == 38) {
                //up
                if(document.getElementById("player1")){

                this.tryMove(0, 1);
                event.preventDefault();
                event.stopPropagation();}
            }
        })
    }

    removeLife(){
        setInterval(()=>{

            this.attributes.removeLife(this.x, this.y)
        }, 600)
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

        const player = document.getElementById("player1");
        player.style.left = (this.x * widthCase) + "px";
        player.style.top = (this.y * widthCase) + "px";
        map.allPositions[0] = [this.x, this.y]
        this.attributes.addLife(x,y);
        this.attributes.addBomb(x,y);
        this.attributes.addDamageBomb(x,y);
        
    }

    /**
     * start listening key for put bomb
     */
    listeningBomb() {
        document.addEventListener('keydown', (event) => {
            if (event.keyCode == 32) {
                if(document.getElementById("player1")){

                this.canBomb();
                event.preventDefault();
                event.stopPropagation();}
            }
        });
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
        bomb.style.backgroundImage = 'url("../pictures/bomb.png")';
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
            return;
        }
        else if (this.attributes.attribut.actuelBomb == this.attributes.attribut.maxBombs){
            return;
        }
        else {
            this.putBomb();
        }

        
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
        map.grounds[bomb.y][bomb.x].bomb = false;
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
        this.detonateHere(x,y)

    }
    
    detonateHere(x,y){

        this.flame(x, y);
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
        flame.style.backgroundImage = 'url("../pictures/flame.gif")';
        flame.style.opacity = 0.70;
        flame.style.backgroundColor = "#E4CD8E";
        styleCase(flame);
        flame.style.left = xFlame * widthCase + "px";
        flame.style.top = yFlame * widthCase + "px";
        flame.style.zIndex = 2;
        const divPlayer = document.getElementById("divPlayer");
        divPlayer.appendChild(flame);
        map.grounds[yFlame][xFlame].flame = true;

        this.flameAndBomb(xFlame, yFlame, map.grounds[yFlame][xFlame].bomb.id);
        /*
        let mineBomb =  this.bombs.find(e => e.id == map.grounds[yFlame][xFlame].bomb.id)
        if (map.grounds[yFlame][xFlame].bomb && mineBomb) {

            if (map.grounds[yFlame][xFlame].bomb.timeout) {
                clearTimeout(map.grounds[yFlame][xFlame].bomb.timeout)
                map.grounds[yFlame][xFlame].bomb.timeout = null;
                setTimeout(() => {
                    this.detonate(map.grounds[yFlame][xFlame].bomb)
                }, 150)

            }
        }
        */
        setTimeout(() => {
            map.grounds[yFlame][xFlame].block.style.backgroundImage = "none";
            map.grounds[yFlame][xFlame].block.style.backgroundColor = "#E4CD8E";
            map.grounds[yFlame][xFlame].flame = false;
            flame.remove();
        }, 1000)

        
    }
    flameAndBomb(xFlame, yFlame, idBomb){
        let mineBomb =  this.bombs.find(e => e.id == idBomb)
        if (map.grounds[yFlame][xFlame].bomb && mineBomb) {

            if (map.grounds[yFlame][xFlame].bomb.timeout) {
                clearTimeout(map.grounds[yFlame][xFlame].bomb.timeout)
                map.grounds[yFlame][xFlame].bomb.timeout = null;
                setTimeout(() => {
                    this.detonate(map.grounds[yFlame][xFlame].bomb)
                }, 150)

            }
        }
        /*
        if(map.grounds[yFlame][xFlame].bomb && !mineBomb && this.nbTryDetonate != 1 ){
            map.bombOthers(xFlame, yFlame, idBomb, this)
        } */
    }
}
