import {map} from "./map.js";
export class Bomb{

    putBomb(){
    const player = document.getElementById("Player1");
    let left = player.getAttribute("left");
    let top = player.getAttribute("top");

    const bomb = document.createElement('div');
    bomb.style.position = "absolute";
    bomb.className = 'bomb';
    bomb.setAttribute("id", "bomb1");
    bomb.style.width = widthCase + "px"; // A changer si changment dans scss
    bomb.style.height = widthCase + "px";
    bomb.style.left = left + "px"; 
    bomb.style.top = top + "px"; 
    bomb.style.backgroundImage = 'url("bomb.png")';
    bomb.style.backgroundSize = "cover";
    const divPlayer = document.getElementById("divPlayer");
    divPlayer.appendChild(bomb);
    }

}