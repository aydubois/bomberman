import {
    widthCase
} from './constants.js';
import {
    map
} from "./map.js";
import {
    Bonus
} from "./bonus.js";

export class Player {

    constructor() {
        this.x = 1;
        this.y = 1;
        this.bombs = [];
        this.sizeArray = 0;
        this.bonus = new Bonus;

        this.startListening();
        this.listeningBomb();

    }


    startListening() {
        document.addEventListener('keydown', (event) => {
            if (event.keyCode == 37) {
                //left
                this.tryMove(-1, 0);
                event.preventDefault();
                event.stopPropagation();
            }
        });
        document.addEventListener('keydown', (event) => {
            if (event.keyCode == 39) {
                //right
                this.tryMove(1, 0);
                event.preventDefault();
                event.stopPropagation();
            }
        });
        document.addEventListener('keydown', (event) => {
            if (event.keyCode == 40) {
                //down
                this.tryMove(0, -1);
                event.preventDefault();
                event.stopPropagation();
            }
        })
        document.addEventListener('keydown', (event) => {
            if (event.keyCode == 38) {
                //up
                this.tryMove(0, 1);
                event.preventDefault();
                event.stopPropagation();
            }
        })
    }

    tryMove(x, y) {
        map.move(this, x, y);
    }

    move(x, y) {
        this.x = x;
        this.y = y;

        const player = document.getElementById("player1");
        player.style.left = (this.x * widthCase) + "px";
        player.style.top = (this.y * widthCase) + "px";
    }

    listeningBomb() {

        document.addEventListener('keydown', (event) => {
            if (event.keyCode == 32) {
                this.canBomb();
                event.preventDefault();
                event.stopPropagation();
            }
        });
    }
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

    canBomb() {

        //check not an over bomb 
        if (map.grounds[this.y][this.x].bomb) {
            return;
        } else {
            this.putBomb();
        }
    }

    triggerDetonate(bomb) {
        let timeBomb = 5 * 1000;
        let timeout = setTimeout(() => {
            bomb.timeout = null
            this.detonate(bomb)
        }, timeBomb);
        bomb.timeout = timeout
        


    }

    detonate(bomb) {

        //search bomb to detonate and remove attributes
        map.grounds[bomb.y][bomb.x].bomb = false;
        bomb.bomb.remove()
        let x = bomb.x;
        let y = bomb.y;
        this.detonateLeft(x, y)
        this.detonateRight(x, y)
        this.detonateBottom(x, y)
        this.detonateTop(x, y)
    }

    detonateLeft(x, y) {
        for (let k = 1; k < 3; k++) { //around 3 cases
            if (!map.grounds[y][x - k] || !map.grounds[y] || map.grounds[y][x - k].hardWall == true) {
                return;
            }
            this.flame(x - k, y);
            if (x - k == this.x && y == this.y) {
                this.bonus.removeLife();
            }

            if (map.grounds[y][x - k].softWall == true && map.grounds[y][x - k].hardWall == false) {

                map.grounds[y][x - k].softWall = false;
                break;
            }
        }

    }

    detonateRight(x, y) {
        for (let k = 1; k < 3; k++) {
            if (!map.grounds[y][x + k] || !map.grounds[y] || map.grounds[y][x + k].hardWall == true) {
                return;
            }
            this.flame(x + k, y);
            if (x + k == this.x && y == this.y) {
                this.bonus.removeLife();
            }
            if (map.grounds[y][x + k].softWall == true && map.grounds[y][x + k].hardWall == false) {

                map.grounds[y][x + k].softWall = false;
                break;
            }


        }
    }

    detonateTop(x, y) {
        for (let k = 1; k < 3; k++) {
            if (!map.grounds[y - k] || !map.grounds[y - k][x] || map.grounds[y - k][x].hardWall == true) {
                return;
            }
            this.flame(x, y - k);
            if (x == this.x && y - k == this.y) {
                this.bonus.removeLife();

            }
            if (map.grounds[y - k][x].softWall == true && map.grounds[y - k][x].hardWall == false) {

                map.grounds[y - k][x].softWall = false;
                break;
            }
        }
    }

    detonateBottom(x, y) {
        for (let k = 1; k < 3; k++) {
            if (!map.grounds[y + k] || !map.grounds[y + k][x] || map.grounds[y + k][x].hardWall == true) {
                return;
            }

            this.flame(x, y + k);
            if (x == this.x && y + k == this.y) {
                this.bonus.removeLife();

            }
            if (map.grounds[y + k][x].softWall == true && map.grounds[y + k][x].hardWall == false) {

                map.grounds[y + k][x].softWall = false;
                break;
            }

        }
    }

    flame(xFlame, yFlame) {

        const flame = document.createElement("div");
        flame.style.backgroundImage = 'url("flame.gif")';
        flame.style.backgroundSize = "cover";
        flame.style.opacity = 0.70;
        flame.style.backgroundColor = "#E4CD8E";
        flame.style.position = "absolute";
        flame.style.width = widthCase + "px";
        flame.style.height = widthCase + "px";
        flame.style.left = xFlame * widthCase + "px";
        flame.style.top = yFlame * widthCase + "px";
        const divPlayer = document.getElementById("divPlayer");
        divPlayer.appendChild(flame);

        
        if(map.grounds[yFlame][xFlame].bomb) 
        {

            if(map.grounds[yFlame][xFlame].bomb.timeout) {
                clearTimeout(map.grounds[yFlame][xFlame].bomb.timeout)
                map.grounds[yFlame][xFlame].bomb.timeout = null;
                setTimeout(()=>{
                    this.detonate(map.grounds[yFlame][xFlame].bomb)
                }, 150)
                
            }
        }
        setTimeout(() => {
            map.grounds[yFlame][xFlame].block.style.backgroundImage = "none";
            map.grounds[yFlame][xFlame].block.style.backgroundColor = "#E4CD8E";
            flame.remove();
        }, 1000)

    }
}

/// ajouter bonus à chaque perso