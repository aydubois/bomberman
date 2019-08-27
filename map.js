/* 
Creation of the map
*/
import {randomNum} from './util.js';
import {Player} from './players.js';
export class Map{
    constructor(width, height){
        this.width = width;
        this.height = height;
    }

    initSet(){
        let i=0;
        const game = document.getElementById('game');
        for(let x=0; x<this.width; x++){
            for(let y=0; y<this.height; y++){
                const block = document.createElement('div');
                block.className = 'case';
                block.setAttribute('column', y);
                block.setAttribute('row', x);
                block.setAttribute('id', i);
                game.appendChild(block);
                i++;
            }
        }
        /*  Change map size on css 
        const size = document.getElementsByClassName('case');
        let j=0;
        for(j=0; j<this.height; j++){
            size.style.height = `"${this.height}"`;
        }
        for(j=0; j<this.width; j++){
            size.style.width = `"${this.width}"`;
        } */
        
        this.randomSoftWall(20);
        this.hardWall();
        this.initPlayer();
    }

    randomSoftWall(numberWall){
        let maxBlock = this.width * this.height;
        while(numberWall > 0){
            let id = randomNum(0, (maxBlock - 1));
            const wall = document.getElementById(id);
            wall.style.backgroundImage = 'url("wallSoft.jpg")';
            wall.style.backgroundSize = "cover";
            wall.style.backgroundColor = "black";
            numberWall--;
        }
    }

    hardWall(){
        const wallHard = document.querySelectorAll(`[row="0"],[row="${this.width - 1}"],[column="0"],[column="${this.height - 1}"]`);

        for( let block of wallHard){
            block.style.backgroundImage = 'url("wallHard.jpg")';
            block.style.backgroundSize = "cover";
            block.style.backgroundColor = "black";
        }

    }

    initPlayer(){
        let maxBlock = this.width * this.height;
        for(let i=0; i<(maxBlock-1); i++){
            const block = document.getElementById(i);
            if(!block.style.backgroundImage ){
                block.style.backgroundImage = 'url("player1.png")';
                block.style.backgroundSize = "cover";
                block.setAttribute("name", "player1");
            

                let player1 = new Player();
                break;
            }
        }
    }
}

