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
        this.life = 1;
        this.bombs = [];
        this.sizeArray = 0;

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
        const player = document.getElementById("player1");
        let left = parseInt(player.style.left);
        let top = parseInt(player.style.top);

        //create bomb
        const bomb = document.createElement('div');
        bomb.style.position = "absolute";
        bomb.className = 'bomb';
        bomb.setAttribute("id", "bomb" + this.sizeArray);
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
        let x = parseInt(bomb.style.left) / widthCase;
        let y = parseInt(bomb.style.top) / widthCase;
        map.grounds[y][x].top = y;
        map.grounds[y][x].left = x;
        map.grounds[y][x].bomb = true;
        let id = bomb.getAttribute("id");

        this.bombs.push({
            x: x,
            y: y,
            id: id
        });
        //trigger detonate
        this.triggerDetonate(id, x, y);

    }

    canBomb() {
        const player = document.getElementById("player1");
        let left = parseInt(player.style.left) / widthCase;
        let top = parseInt(player.style.top) / widthCase;

        //check not an over bomb 
        if (left == map.grounds[top][left].left && top == map.grounds[top][left].top) {
            return;
        } else {
            this.putBomb();
        }
    }

    triggerDetonate(id, x, y) {
        let timeBomb = 5 * 1000;
        setTimeout(() => {
            this.detonate(id, x, y)
        }, timeBomb);


    }

    detonate(id, x, y) {

        let i = this.bombs.length;

        //search bomb to detonate and remove attributes
        for (let j = 0; j < i; j++) {
            if (Object.values(this.bombs[j][2] == id)) {
                console.log("yes");
                let lastCase = document.getElementById(id);
                lastCase.style.backgroundImage = "none";

                let lastX = this.bombs[j].x;
                let lastY = this.bombs[j].y;
                map.grounds[y][x].bomb = false;
                map.grounds[y][x].top = 0;
                map.grounds[y][x].left = 0;

                /// search wall and remove it
                for (let k = 1; k < 3; k++) { //around 3 cases
                    if (!map.grounds[y][x - k]) {
                        return;
                    } else if (map.grounds[y][x - k].softWall == true && map.grounds[y][x - k].hardWall == false) {
                        let left = document.querySelector(`[row="${y}"][column="${x-k}"]`);

                        left.style.backgroundImage = "none";
                        map.grounds[y][x - k].softWall = false;
                    }



                    if (!map.grounds[y][x + k]) {
                        return;
                    } else if (map.grounds[y][x + k].softWall == true && map.grounds[y][x + k].hardWall == false) {
                        let right = document.querySelector(`[row="${y}"][column="${x+k}"]`);
                        right.style.backgroundImage = "none";
                        map.grounds[y][x + k].softWall = false;
                    }



                    if (!map.grounds[y - k][x]) {
                        return;
                    } else if (map.grounds[y - k][x].softWall == true && map.grounds[y - k][x].hardWall == false) {
                        let top = document.querySelector(`[row="${y-k}"][column="${x}"]`);
                        top.style.backgroundImage = "none";
                        map.grounds[y - k][x].softWall = false;
                    }


                    if (!map.grounds[y + k][x]) {
                        return;
                    } else if (map.grounds[y + k][x].softWall == true && map.grounds[y + k][x].hardWall == false) {
                        let bottom = document.querySelector(`[row="${y+k}"][column="${x}"]`);
                        bottom.style.backgroundImage = "none";
                        map.grounds[y + k][x].softWall = false;
                    }
                }
                console.log(map.grounds) // !!!!!probleme de delai si plusieurs bombes 


            } else {
                console.log(no)
            }
        }


    }
}

//// supprimer wall quand détonation
/// ajouter bonus à chaque perso