import {
    shuffleArray
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
        map.allPositions[this.number - 1] = this.positionActuel;
        this.nextMouvement = null;
        this.verificationCasesAround();
        //this.startBomb();
        //this.unblock();
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



    verificationCasesAround() {
        let top = map.grounds[this.y - 1][this.x]; 
        let bottom = map.grounds[this.y + 1][this.x];
        let left = map.grounds[this.y][this.x - 1];
        let right = map.grounds[this.y][this.x + 1];

        //  si la voie est libre chercher la cible
        if(!top.flame && !bottom.flame && !left.flame && !right.flame ){
            if(!top.hardWall && !bottom.hardWall && !left.hardWall && !right.hardWall){
                if(!top.softWall && !bottom.softWall && !left.softWall && !right.softWall){
                    this.searchDirectionTarget()
                }
            }
        } else{
            if(top.flame || bottom.flame || left.flame || right.flame){
                this.verificationFlame(top, bottom, left, right);
            } else if(top.hardWall || bottom.hardWall || left.hardWall || right.hardWall){
                this.verificationHard(top, bottom, left, right);
            }else if(top.softWall || bottom.softWall || left.softWall || right.softWall){
                this.verificationSoft(top, bottom, left, right);
            } 
        }
    }

    searchDirectionTarget(){
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
        this.move();
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
        
        setTimeout(()=>{
            this.verificationCasesAround()
        }, 500);
    }

    verificationFlame(top, bottom, left, right){
        if(top.flame && bottom.flame && left.flame && right.flame){  // if flame all around == don't move
            this.xNext = 0;
            this.yNext = 0;
            this.move();
        }
        let array =[top, bottom, left, right];
        shuffleArray(array);

        for(direction of directions){
            if(!direction.flame){
                this.xNext = this.x - direction.x;
                this.yNext = this.y - direction.y;
                this.move();
                break;
            }
        }
    }

    verificationHard(top, bottom, left, right){
        let array =[top, bottom, left, right];
        shuffleArray(array);

        for(direction of directions){
            if(!direction.hardWall){
                this.xNext = this.x - direction.x;
                this.yNext = this.y - direction.y;
                this.move();
                break;
            }
        }

    }

    verificationSoft(top, bottom, left, right){
        let array =[top, bottom, left, right];
        shuffleArray(array);

        for(direction of directions){
            if(!direction.softWall){
                this.xNext = this.x - direction.x;
                this.yNext = this.y - direction.y;
                this.move();
                break;
            }
        }
    }

}
