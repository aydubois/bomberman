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
        this.number = number;
        this.bombs = [];
        this.sizeArray = 0;
        this.xNext = 0;
        this.yNext = 0;
        this.nbTry = 0;
        this.attributes = new AttributesIa();
        this.initPosition();
        this.positionActuel = [this.x, this.y];
        this.historyPositions = [];
        map.allPositions[1] = this.positionActuel;
        this.nextMouvement = null;
        

        this.intervalStart = null;
        this.intervalBomb = null;
        this.intervalUnblock = null;
        this.intervalDebug = null;
        this.intervalRemoveLife = null;
        this.removeLife()
        this.nbTryDetonate = 0;

        this.debug();
        map.initAll(this)
    }

    initPosition() {
        if (this.number == 1) {
            this.x = 1;
            this.y = 1;
            this.attributes.numberBonus(1);
        }
        if (this.number == 2) {
            this.x = 13;
            this.y = 1;
            this.attributes.numberBonus(2);
        }
        if (this.number == 3) {
            this.x = 1;
            this.y = 13;
            this.attributes.numberBonus(3);
        }
        if (this.number == 4) {
            this.x = 13;
            this.y = 13;
            this.attributes.numberBonus(4);
        }
    }


    startIa() {
        var intervalStart = setInterval(() => {
            if (document.getElementById(`player${this.number}`)) { /// 
                this.searchBonus();

            }
        }, 800);
        this.intervalStart = intervalStart;
        
        
    }
    startBomb() {
        var intervalBomb = setInterval(() => {
            if (document.getElementById(`player${this.number}`)) {
                this.canBomb();
            }
        }, 4000);
        this.intervalBomb = intervalBomb;

    }

    removeLife(){
        var intervalRemoveLife = setInterval(()=>{
            this.attributes.removeLife(this.x, this.y)
        }, 600)
        this.intervalRemoveLife = intervalRemoveLife;
    }
    searchBonus() {


        if (map.grounds[this.y][this.x - 1].bonus &&
            !map.grounds[this.y][this.x - 1].softWall &&
            !map.grounds[this.y][this.x - 1].hardWall &&
            !map.grounds[this.y][this.x - 1].bomb &&
            !map.grounds[this.y][this.x - 1].flame
        ) {

            this.nextMouvement = "W";
            this.setNextmove();
        } else if (map.grounds[this.y][this.x + 1].bonus &&
            !map.grounds[this.y][this.x + 1].softWall &&
            !map.grounds[this.y][this.x + 1].hardWall &&
            !map.grounds[this.y][this.x + 1].bomb &&
            !map.grounds[this.y][this.x + 1].flame) {
            this.nextMouvement = "E";
            this.setNextmove();

        } else if (map.grounds[this.y - 1][this.x].bonus &&
            !map.grounds[this.y - 1][this.x].softWall &&
            !map.grounds[this.y - 1][this.x].hardWall &&
            !map.grounds[this.y - 1][this.x].bomb &&
            !map.grounds[this.y - 1][this.x].flame) {
            this.nextMouvement = "N";
            this.setNextmove();

        } else if (map.grounds[this.y + 1][this.x].bonus &&
            !map.grounds[this.y + 1][this.x].softWall &&
            !map.grounds[this.y + 1][this.x].hardWall &&
            !map.grounds[this.y + 1][this.x].bomb &&
            !map.grounds[this.y + 1][this.x].flame) {
            this.nextMouvement = "S";
            this.setNextmove();

        } else {
            this.searchDirectionTarget();
        }

    }
    searchDirectionTarget() {
        let xposition = this.x;
        let yposition = this.y;
        let player = map.allPositions[0]; // position du player 1 
        let xplayer = player[0];
        let yplayer = player[1];

        let xDirection;
        let yDirection;
        let xDistance;
        let yDistance;

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

        this.setNextmove();


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
        this.verifCaseAround();
    }

    verifCaseAround() {
        if ((map.grounds[this.y + this.yNext][this.x + this.xNext].softWall ||
                map.grounds[this.y + this.yNext][this.x + this.xNext].hardWall ||
                map.grounds[this.y + this.yNext][this.x + this.xNext].bomb) &&
            this.nbTry <= 3) {
            let aA = ["W", "E", "S", "N"];
            aA = aA.filter(e => e != this.nextMouvement)

            let random = aA[Math.floor(Math.random() * aA.length)];
            this.nextMouvement = random;

            this.nbTry++;
            this.setNextmove();
        } else if (this.nbTry > 3) {
            this.yNext = 0;
            this.xNext = 0;
            this.avoidFlame();
        } else {
            this.avoidFlame();
        }
    }

    avoidFlame() {
        if ((map.grounds[this.y + this.yNext][this.x + this.xNext].flame ||
                map.grounds[this.y + this.yNext][this.x + this.xNext].futureFlame) &&
            this.nbTry <= 5) {
            let aA = ["W", "E", "S", "N"];
            aA = aA.filter(e => e != this.nextMouvement)

            let random = aA[Math.floor(Math.random() * aA.length)];
            this.nextMouvement = random;

            this.nbTry++;
            this.setNextmove();
        } else {
            this.move();
        }
    }




    placeMapFlame(x, y) {

        for (let k = 1; k < this.attributes.attribut.damageBomb; k++) { //around 3 cases
            this.futureFlame(x - k, y);
            this.futureFlame(x + k, y);
            this.futureFlame(x, y + k);
            this.futureFlame(x, y - k);


        }
    }
    futureFlame(xFuture, yFuture) {
        if (map.grounds[yFuture] && map.grounds[yFuture][xFuture]) {
            map.grounds[yFuture][xFuture].futureflame = true;
        }
    }





    move() {
        if (!map.grounds[this.y + this.yNext][this.x + this.xNext].softWall &&
            !map.grounds[this.y + this.yNext][this.x + this.xNext].hardWall &&
            !map.grounds[this.y + this.yNext][this.x + this.xNext].bomb
        ) {
            this.x += this.xNext;
            this.y += this.yNext;
            let x = this.x;
            let y = this.y;

            this.nbTry = 0;

            const player = document.getElementById(`player${this.number}`);
            player.style.left = (x * widthCase) + "px";
            player.style.top = (y * widthCase) + "px";

            this.positionActuel[0] = x;
            this.positionActuel[1] = y;
            map.allPositions[1] = this.positionActuel;
            this.historyPositions.push([x, y]);
            this.attributes.addLife(x, y);
            this.attributes.addBomb(x, y);
            this.attributes.addDamageBomb(x, y);
        }
        let sizePosition = this.historyPositions.length;
        if (sizePosition >= 6) {
            this.historyPositions.shift();
        }
    }

    unblock() {
        var intervalUnblock = setInterval(() => {
            let sizePosition = this.historyPositions.length;
            if (this.historyPositions[sizePosition - 1] == this.historyPositions[sizePosition - 3]) {
                clearInterval(this.intervalStart);
                if (this.nextMouvement == "N" || this.nextMouvement == "S") {
                    let aA = ["W", "E"];
                    let random = aA[Math.floor(Math.random() * aA.length)];

                    this.nextMouvement = random;
                    this.setNextmove();
                } else {
                    let aA = ["S", "N"];
                    let random = aA[Math.floor(Math.random() * aA.length)];


                    this.nextMouvement = random;
                    this.setNextmove()
                }
                this.startIa()
            }
        }, 5000)
        this.intervalUnblock = intervalUnblock;

    }

    canBomb() {

        if (map.grounds[this.y][this.x].bomb) {
            return;
        } else if (this.attributes.attribut.actuelBomb == this.attributes.attribut.maxBombs) {
            return;
        } else {

            
            //si possibilité de s'échapper

            //gauche - bas

            if (!map.grounds[this.y][this.x - 1].softWall &&
                !map.grounds[this.y][this.x - 1].hardWall &&
                !map.grounds[this.y][this.x - 1].bomb &&
                !map.grounds[this.y + 1][this.x - 1].softWall &&
                !map.grounds[this.y + 1][this.x - 1].hardWall &&
                !map.grounds[this.y + 1][this.x - 1].bomb) {
                
                    console.log("gauche")
                    console.log("bas")

                    clearInterval(this.intervalStart)
                    clearInterval(this.intervalUnblock)
                    clearInterval(this.intervalBomb)

                    this.putBomb();
                    setTimeout(() => {
                        if(!this.attributes.dead){

                            this.yNext = 0;
                            this.xNext = -1;
                            this.move()
                        }
                    }, 800)
                    setTimeout(() => {
                        if(!this.attributes.dead){

                            this.yNext = 1;
                            this.xNext = 0;
                            this.move();
                        }
                    }, 1600)
                    setTimeout(() => {
                        if(!this.attributes.dead){

                            this.startIa();
                            this.unblock();
                            this.startBomb();
                        }
                    }, 2001)
                } 
            //gauche - haut
            else if (!map.grounds[this.y][this.x - 1].softWall &&
                    !map.grounds[this.y][this.x - 1].hardWall &&
                    !map.grounds[this.y][this.x - 1].bomb &&
                    !map.grounds[this.y - 1][this.x - 1].softWall &&
                    !map.grounds[this.y - 1][this.x - 1].hardWall &&
                    !map.grounds[this.y - 1][this.x - 1].bomb) {

                        console.log("gauche")
                        console.log("haut")

                        clearInterval(this.intervalStart)
                        clearInterval(this.intervalUnblock)
                        clearInterval(this.intervalBomb)

                    this.putBomb();
                    setTimeout(() => {
                        if(!this.attributes.dead){

                            this.yNext = 0;
                            this.xNext = -1;
                            this.move()
                        }
                    }, 800)
                    setTimeout(() => {
                        if(!this.attributes.dead){

                            this.yNext = -1;
                            this.xNext = 0;
                            this.move();
                        }
                    }, 1600)
                    setTimeout(() => {
                        if(!this.attributes.dead){

                            this.startIa();
                            this.unblock();
                            this.startBomb();
                        }
                    }, 2001)

                }
            
            //droite - bas
            else if (!map.grounds[this.y][this.x + 1].softWall &&
                !map.grounds[this.y][this.x + 1].hardWall &&
                !map.grounds[this.y][this.x + 1].bomb &&
                !map.grounds[this.y + 1][this.x +1].softWall &&
                !map.grounds[this.y + 1][this.x +1].hardWall &&
                !map.grounds[this.y + 1][this.x +1].bomb) {

                    console.log("droite")
                    console.log("bas")
                    
                    clearInterval(this.intervalStart)
                    clearInterval(this.intervalUnblock)
                    clearInterval(this.intervalBomb)

                        this.putBomb();
                        setTimeout(() => {
                            if(!this.attributes.dead){

                                this.yNext = 0;
                                this.xNext = 1;
                                this.move()
                            }
                        }, 800)
                        setTimeout(() => {
                            if(!this.attributes.dead){

                                this.yNext = 1;
                                this.xNext = 0;
                                this.move();
                            }
                        }, 1600)
                        setTimeout(() => {
                            if(!this.attributes.dead){

                                this.startIa();
                                this.unblock();
                                this.startBomb();
                            }
                        }, 2001)
                    } 
            //droite - haut       
            else if (!map.grounds[this.y][this.x + 1].softWall &&
                    !map.grounds[this.y][this.x + 1].hardWall &&
                    !map.grounds[this.y][this.x + 1].bomb &&
                    !map.grounds[this.y - 1][this.x +1].softWall &&
                    !map.grounds[this.y - 1][this.x +1].hardWall &&
                    !map.grounds[this.y - 1][this.x +1].bomb) {

                        console.log("droite")
                        console.log("haut")

                            clearInterval(this.intervalStart)
                            clearInterval(this.intervalUnblock)
                            clearInterval(this.intervalBomb)

                            this.putBomb();
                            setTimeout(()=>{
                                if(!this.attributes.dead){

                                    this.yNext = 0;
                                    this.xNext = 1;
                                    this.move()
                                }
                            }, 800)
                            setTimeout(()=>{
                                if(!this.attributes.dead){

                                    this.yNext = -1;
                                    this.xNext = 0;
                                    this.move();
                                }
                            },1600)
                            setTimeout(()=>{
                                if(!this.attributes.dead){

                                    this.startIa();
                                    this.unblock();
                                    this.startBomb();
                                }
                            }, 2001)
                }
            
            //haut - gauche
            else if (!map.grounds[this.y - 1][this.x].softWall &&
                    !map.grounds[this.y - 1][this.x].hardWall &&
                    !map.grounds[this.y - 1][this.x].bomb &&
                    !map.grounds[this.y - 1][this.x - 1].softWall  &&
                    !map.grounds[this.y - 1][this.x - 1].hardWall &&
                    !map.grounds[this.y - 1][this.x - 1].bomb){

                        console.log("haut")
                        console.log("gauche")
                            
                        clearInterval(this.intervalStart)
                        clearInterval(this.intervalUnblock)
                        clearInterval(this.intervalBomb)

                            this.putBomb();
                            setTimeout(()=>{
                                if(!this.attributes.dead){

                                    this.yNext = -1;
                                    this.xNext = 0;
                                    this.move()
                                }
                            }, 800)
                            setTimeout(()=>{
                                if(!this.attributes.dead){

                                    this.yNext = 0;
                                    this.xNext = -1;
                                    this.move();
                                }
                            },1600)
                            setTimeout(()=>{
                                if(!this.attributes.dead){

                                    this.startIa();
                                    this.unblock();
                                    this.startBomb();
                                }
                            }, 2001)
                        }
            //haut - droite        
            else if(!map.grounds[this.y - 1][this.x].softWall &&
                    !map.grounds[this.y - 1][this.x].hardWall &&
                    !map.grounds[this.y - 1][this.x].bomb &&
                    !map.grounds[this.y -1][this.x + 1].softWall    &&
                    !map.grounds[this.y -1][this.x + 1].hardWall &&
                    !map.grounds[this.y -1][this.x + 1].bomb) {

                        console.log("haut")
                        console.log("droite")
                        
                        clearInterval(this.intervalStart)
                        clearInterval(this.intervalUnblock)
                        clearInterval(this.intervalBomb)
                            this.putBomb();
                            setTimeout(()=>{
                                if(!this.attributes.dead){

                                    this.yNext = -1;
                                    this.xNext = 0;
                                    this.move()
                                }
                            }, 800)
                            setTimeout(()=>{
                                if(!this.attributes.dead){

                                    this.yNext = 0;
                                    this.xNext = 1;
                                    this.move();
                                }
                            },1600)
                            setTimeout(()=>{
                                if(!this.attributes.dead){

                                    this.startIa();
                                    this.unblock();
                                    this.startBomb();
                                }
                            }, 2001)
                }
            //bas - gauche
            else if (!map.grounds[this.y + 1][this.x].softWall &&
                !map.grounds[this.y + 1][this.x].hardWall &&
                !map.grounds[this.y + 1][this.x].bomb &&
                !map.grounds[this.y +1][this.x - 1].softWall  &&
                !map.grounds[this.y +1][this.x - 1].hardWall &&
                !map.grounds[this.y +1][this.x - 1].bomb){

                    console.log("bas")
                    console.log("gauche")

                        clearInterval(this.intervalStart)
                        clearInterval(this.intervalUnblock)
                        clearInterval(this.intervalBomb)

                            this.putBomb();
                            setTimeout(()=>{
                                if(!this.attributes.dead){

                                    this.yNext = 1;
                                    this.xNext = 0;
                                    this.move()
                                }
                            }, 800)
                            setTimeout(()=>{
                                if(!this.attributes.dead){

                                    this.yNext = 0;
                                    this.xNext = -1;
                                    this.move();
                                }
                            },1600)
                            setTimeout(()=>{                                
                                if(!this.attributes.dead){

                                    this.startIa();
                                    this.unblock();
                                    this.startBomb();
                                }
                            }, 2001)
                        }
            //bas - droite
            else if(!map.grounds[this.y + 1][this.x].softWall &&
                    !map.grounds[this.y + 1][this.x].hardWall &&
                    !map.grounds[this.y + 1][this.x].bomb &&
                    !map.grounds[this.y +1][this.x + 1].softWall  &&
                    !map.grounds[this.y +1][this.x + 1].hardWall &&
                    !map.grounds[this.y +1][this.x + 1].bomb) {

                        console.log("bas")
                        console.log("droite")

                            clearInterval(this.intervalStart)
                    clearInterval(this.intervalUnblock)
                    clearInterval(this.intervalBomb)
                            this.putBomb();
                            setTimeout(()=>{
                                if(!this.attributes.dead){

                                    this.yNext = 1;
                                    this.xNext = 0;
                                    this.move()
                                }
                            }, 800)
                            setTimeout(()=>{
                                if(!this.attributes.dead){
                                    
                                    this.yNext = 0;
                                    this.xNext = 1;
                                    this.move();
                                }
                            },1600)
                            setTimeout(()=>{
                                if(!this.attributes.dead){

                                    this.startIa();
                                    this.unblock();
                                    this.startBomb();
                                }
                            }, 2001)
                
            }
        }
    }


    putBomb() {
        // search this position 
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
        this.placeMapFlame(x, y);

    }

    /**
     * Starting trigger for bomb detonation
     * @param {*} bomb Object => last bomb 
     */
    triggerDetonate(bomb) {
        let timeBomb = 1 * 2000;
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
        this.detonateHere(x, y)


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
            if (!map.grounds[y][x - k] || !map.grounds[y] || map.grounds[y][x - k].hardWall) {
                return;
            }
            this.flame(x - k, y);
            if (x - k == this.x && y == this.y) {
                return;
            }

            if (map.grounds[y][x - k].softWall && !map.grounds[y][x - k].hardWall) {

                map.grounds[y][x - k].softWall = false;
                if (map.grounds[y][x - k].bonus) {
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
            if (!map.grounds[y][x + k] || !map.grounds[y] || map.grounds[y][x + k].hardWall) {
                return;
            }
            this.flame(x + k, y);
            if (x + k == this.x && y == this.y) {
                return;
            }
            if (map.grounds[y][x + k].softWall && !map.grounds[y][x + k].hardWall) {

                map.grounds[y][x + k].softWall = false;
                if (map.grounds[y][x + k].bonus) {
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
            if (!map.grounds[y - k] || !map.grounds[y - k][x] || map.grounds[y - k][x].hardWall) {
                return;
            }
            this.flame(x, y - k);
            if (x == this.x && y - k == this.y) {
                return;
            }
            if (map.grounds[y - k][x].softWall && !map.grounds[y - k][x].hardWall) {

                map.grounds[y - k][x].softWall = false;
                if (map.grounds[y - k][x].bonus) {
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
            if (!map.grounds[y + k] || !map.grounds[y + k][x] || map.grounds[y + k][x].hardWall) {
                return;
            }

            this.flame(x, y + k);
            if (x == this.x && y + k == this.y) {
                return;
            }
            if (map.grounds[y + k][x].softWall && !map.grounds[y + k][x].hardWall) {

                map.grounds[y + k][x].softWall = false;
                if (map.grounds[y + k][x].bonus) {
                    let bonusSelect = document.querySelector(`.bonus[x="${x}"][y="${y+k}"]`);
                    bonusSelect.style.zIndex = 1;
                }
                break;
            }

        }
    }
    detonateHere(x, y) {

        this.flame(x, y);
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

        setTimeout(() => {
            map.grounds[yFlame][xFlame].block.style.backgroundImage = "none";
            map.grounds[yFlame][xFlame].block.style.backgroundColor = "#E4CD8E";
            map.grounds[yFlame][xFlame].flame = false;
            flame.remove();
        }, 800)
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
        if(map.grounds[yFlame][xFlame].bomb && !mineBomb && this.nbTryDetonate !=1){
            map.bombOthers(xFlame, yFlame, idBomb, this)
            this.nbTryDetonate = 1
        }*/
    }

    stopIA() {
        setInterval(() => {
            if (this.attributes.attribut.life == 0) {
                clearInterval(this.intervalStart);
                clearInterval(this.intervalBomb);
                clearInterval(this.intervalRemoveLife);
                clearInterval(this.intervalUnblock);
                clearInterval(this.intervalDebug);
            }
        }, 1000)
    }


    debug() {
        var intervalDebug = setInterval(() => {
            /*console.log("Tableau de bombes : " + this.bombs)
            console.log("Nombre d'essais de mvmts : " + this.nbTry)
            console.log("Prochains mouvements (x,y) : " + this.xNext + " , " + this.yNext)
            console.log("Prochain mouvement envisagé : " + this.nextMouvement)
            console.log("Position actuelle (x,y) : " + this.positionActuel)
            console.log("Historique des positions : " + this.historyPositions)
            console.log(" ")*/

        }, 1000)
        this.intervalDebug = intervalDebug;

    }


}