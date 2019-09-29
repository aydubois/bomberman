import {
    map
} from "./map.js";
import {
    Player
} from "./players.js";
import {
    Ia
} from "../js/ia2.js";

map.initSet(15, 15);

class GameStarter {
    constructor() {
        this.ia1 = null;
        this.ia2 = null;
        this.ia3 = null;
        this.init();
    }
    
    init(){
        let startButton = document.getElementById("start");
        startButton.addEventListener("click", ()=>{
            if(!document.getElementById("divPlayer")){
                document.location.reload(true)
            }
            if(this.starter == null || this.starter.finished == true){
                
                this.initAllPlayers();}
                this.endGame();
                this.debug();
        })
    }
    initAllPlayers() {


        let player1 = new Player();  
        let ia1 = new Ia(2);
        ia1.startIa();
        ia1.startBomb();
        ia1.unblock();
        ia1.stopIA();
        
        this.ia1 = ia1;

        
        if (nbEnemy >= 2) {
            let ia2 = new Ia(3);
            ia2.startIa();
            ia2.startBomb();
            ia2.unblock();
            ia2.stopIA();

            this.ia2 = ia2;
        
        }
        if (nbEnemy == 3) {
            let ia3 = new Ia(4);
            ia3.startIa();
            ia3.startBomb();
            ia3.unblock();
            ia3.stopIA();

            this.ia3 = ia3;
        
        }
    }
    

    endGame(){
        
        if(nbEnemy == 3 && this.ia2.attributes.attribut.life == 0 && this.ia1.attributes.attribut.life == 0 && this.ia3.attributes.attribut.life == 0){
            document.getElementById("start").textContent = "Remise à zéro";
            let end = document.createElement("div");
            end.setAttribute("id", "end");
            end.textContent = "You WIN"
            document.getElementById("main_wrapper").replaceChild(end, game);
            document.getElementById("main_wrapper").removeChild(divPlayer);
            ia1 = null;
            ia2 = null;
            ia3 = null;

        } else if(nbEnemy == 2 && !this.ia1.attributes.attribut.life == 0 && this.ia2.attributes.attribut.life == 0){
            document.getElementById("start").textContent = "Remise à zéro";
            let end = document.createElement("div");
            end.setAttribute("id", "end");
            end.textContent = "You WIN"
            document.getElementById("main_wrapper").replaceChild(end, game);
            document.getElementById("main_wrapper").removeChild(divPlayer);
            ia1 = null;
            ia2 = null;
        } 
        else  if(nbEnemy == 1 && this.ia1.attributes.attribut.life == 0){
            document.getElementById("start").textContent = "Remise à zéro";
            let end = document.createElement("div");
            end.setAttribute("id", "end");
            end.textContent = "You WIN"
            document.getElementById("main_wrapper").replaceChild(end, game);
            document.getElementById("main_wrapper").removeChild(divPlayer);
            this.ia1 = null;
        }
    }

    debug(){
        setInterval(()=>{
        console.log('ia1 :' + this.ia1)
        console.log('nb life ia1 : ' + this.ia1.attributes.attribut.life )
        
        }, 1000);
    }
}
let gameStart = new GameStarter();