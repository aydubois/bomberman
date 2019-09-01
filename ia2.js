import {
    randomNum,
    randomMove
} from "./util.js";
import {
    map
} from "./map.js";

import {
    widthCase,
    styleCase
} from './constants.js';
import {
    AttributesIa
} from "./bonusIa.js";


export class Ia {

    constructor(number) {
        this.possible = "yes"
        this.number = number;
        this.bombs = [];
        this.sizeArray = 0;
        this.xNext = 0;
        this.yNext = 0;
        this.initPosition();
        this.attributes = new AttributesIa;
        this.positionActuel = [this.x, this.y];
        this.historyPositions = [this.position];
        map.allPositions[1] = this.positionActuel;
        this.nextMouvement = null;
        this.startIa();
        this.startBomb();
        this.unblock();

    }

    initPosition() {
        if (this.number == 1) {
            this.x = 1;
            this.y = 1;
        }
        if (this.number == 2) {
            this.x = 13;
            this.y = 1;
        }
        if (this.number == 3) {
            this.x = 1;
            this.y = 13;
        }
        if (this.number == 4) {
            this.x = 13;
            this.y = 13;
        }
    }
    

    startIa() {
        setInterval(()=>{
            if(document.getElementById("player2")){
                this.searchDirectionTarget();
        }}, 500);
    }
    startBomb(){
        setInterval(()=>{
        if(document.getElementById("player2")){
            this.putBomb();
    }}, 4000);
    }

    searchDirectionTarget() {
        let xposition = this.positionActuel[0];
        let yposition = this.positionActuel[1];
        let player = map.allPositions[0]; // position du player 1 
        let xplayer = player[0];
        let yplayer = player[1];

        let xDirection;
        let yDirection;
        let xDistance;
        let yDistance;

        if(map.grounds[yposition][yposition].futureflame == false){

        if (xposition > xplayer) {
            xDistance = xposition - xplayer;
            xDirection = "W";
        } else {
            xDistance = xplayer - xposition;
            xDirection = "E";
        }
    
        if (yposition > yplayer) {
            yDistance = yposition - yplayer;
            yDirection = "N";
        } else {
            yDistance = yplayer - yposition;
            yDirection = "S";
        }
    
        if (xDistance > yDistance) {
            this.nextMouvement = xDirection; 
        } else {
            this.nextMouvement = yDirection; 
        }

        this.setNextmove();}

        else{
            if(map.grounds[yposition+1][yposition].futureflame == false){
                yDirection = "S"
            this.nextMouvement = yDirection

            } else if (map.grounds[yposition -1][yposition].futureflame == false){
                yDirection = "N"
            this.nextMouvement = yDirection

            } else if (map.grounds[yposition][yposition+1].futureflame == false){
                xDirection = "E"
            this.nextMouvement = xDirection

            } else { 
                xDirection = "W" 
                this.nextMouvement = xDirection
            }
            
            this.setNextmove();
            
        }
    }

    setNextmove() {
        switch (this.nextMouvement) {
            case "W":
                this.xNext = -1;
                this.yNext = 0;
                break;

            case "E":
                this.xNext = 1;
                this.yNext = 0;
                break;

            case "N":
                this.xNext = 0;
                this.yNext = -1;
                break;

            case "S":
                this.xNext = 0;
                this.yNext = 1;
                break;
        }
        this.avoidWalls();
    }

    
    avoidWalls() {
        if(map.grounds[this.y + this.yNext][this.x + this.xNext].softWall == true || map.grounds[this.y + this.yNext][this.x + this.xNext].hardWall == true ){
            //si il y a un mur mou poser une bombe et sortir du champs de la bombe
            this.possible = "no";
                let aA = ["W", "E", "S", "N"];
                let random = aA[Math.floor(Math.random()*aA.length)];
                this.nextMouvement = random;
                this.setNextmove();
        }else{
        this.possible = "yes"
        this.move();}
    }




    avoidFlame(x,y){

            for (let k = 1; k < this.attributes.attribut.damageBomb; k++) { //around 3 cases
                this.futureFlame(x - k, y);
                this.futureFlame(x + k, y);
                this.futureFlame(x, y +k);
                this.futureFlame(x, y-k);
                this.escapeBomb()
                
            }
        }
    futureFlame(xFuture, yFuture){
            if(map.grounds[yFuture] && map.grounds[yFuture][xFuture]){
            map.grounds[yFuture][xFuture].futureflame = true;
        }
     
    }




    move() {
        this.x += this.xNext;
        this.y += this.yNext;

        const player = document.getElementById("player2");
        player.style.left = (this.x * widthCase) + "px";
        player.style.top = (this.y * widthCase) + "px";


        this.positionActuel[0] = this.x;
        this.positionActuel[1] = this.y;
        map.allPositions[1] = this.position;
        this.historyPositions.push(this.positionActuel);
        
    }
    
    unblock(){
        setInterval(()=>{
            let sizePosition = this.historyPositions.length;
            if(this.historyPositions[sizePosition-1] == this.historyPositions[sizePosition-3] ){
                if(this.nextMouvement == "N" || this.nextMouvement == "S"){
                let aA = ["W", "E"];
                let random = aA[Math.floor(Math.random()*aA.length)];
                this.nextMouvement = random;
                this.setNextmove();
            }}
            else{
                let aA = ["S", "N"];
                let random = aA[Math.floor(Math.random()*aA.length)];
                this.nextMouvement = random;
                this.setNextmove()
            }
        }, 3000)

    }

    putBomb(){
        // search position of player
        let left = this.x * widthCase;
        let top = this.y * widthCase;

        //create bomb
        let id = "bomb" + this.bombs.length;
        const bomb = document.createElement('div');
        bomb.className = 'bomb';
        bomb.setAttribute("id", id);
        styleCase(bomb);
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
     * Starting trigger for bomb detonation
     * @param {*} bomb Object => last bomb 
     */
    triggerDetonate(bomb) {
        let timeBomb = 1 * 3000;
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