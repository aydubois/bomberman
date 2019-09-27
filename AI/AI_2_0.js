import {
    map
} from "../js/map.js";
import {
    searchTarget
} from "./searchDirectionTarget.js";
import {
    verification2Around
} from "./verificationAround.js";
import {
    widthCase,
} from '../js/constants.js';

export class AI {
    constructor(number) {
        this.number = number;
        this.initPosition();
        this.startIa();
    }

    /**
     * Initial position of AI
     */
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

    /**
     * Begin the AI when a game is starting
     * Give an interval between 2 movements
     */
    startIa() {
        setInterval(()=>{
            if(document.getElementById(`player${this.number}`)){   
                this.searchDirectionTarget();
        }}, 1000);
    }

    /**
     * Research the target and take a direction towards him
     */
    searchDirectionTarget() {
        let x = this.x;
        let y = this.y;
        let xTarget = map.allPositions[0][0];
        let yTarget = map.allPositions[0][1];

        let direction = searchTarget(xTarget, yTarget, x, y);
        let directionAI;
        switch (direction) {
            case "LEFT":
                directionAI = map.grounds[y][x -1];
                break;
            case "RIGHT":
                directionAI = map.grounds[y][x+1];
                break;
            case "UP":
                directionAI = map.grounds[y - 1][x];
                break;
            case "DOWN":
                directionAI = map.grounds[y + 1][x];
                break;
            case "NO MOVE":
                directionAI = map.grounds[y][x]; 
                break;
        }

        this.verificationCase(direction, directionAI);
    }

    /**
     * Check the possible actions
     * priority on movements
     */
    verificationCase(directionAI) {

        // If there are no obstacles, AI is moving
        if(!directionAI.flame && !directionAI.hardWall && !directionAI.softWall){
            this.x = directionAI.x;
            this.y = directionAI.y;

            const player = document.getElementById("player2");
        player.style.left = (this.x * widthCase) + "px";
        player.style.top = (this.y * widthCase) + "px";
        }

        verification2Around(this.x, this.y, directionAI);
    }
}