import {map} from "./map.js";
import { Player } from "./players.js";
import {Ia} from "../js/ia2.js";

map.initSet(15,15);

let player1 = new Player();
let ia1 = new Ia(2);
if(nbEnemy >= 2){
    console.log('2 ia')
    let ia2 = new Ia(3);
}
if(nbEnemy == 3){
    console.log('3 ia')
    let ia3 = new Ia(4);
}
//let ia2 = new Ia(3);
//let ia3 = new Ia(4);

