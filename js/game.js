import {
    map
} from "./map.js";
import {
    Player
} from "./players.js";
import {
    Ia
} from "../js/ia4.js";

map.initSet(15, 15);

class GameStarter {
    constructor() {
        this.player1 = null;
        this.ia1 = null;
        this.ia2 = null;
        this.ia3 = null;
        this.intervalEnd = null;
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
                this.interval();
                this.endGame();
        })
    }
    initAllPlayers() {


        let player1 = new Player();
        this.player1 = player1;
    
        let ia1 = new Ia(2);
        ia1.startIa();
        ia1.startBomb();
        ia1.unblock();
        ia1.stopIA();
        
        this.ia1 = ia1;

        
        if (nbEnemy == 2 || nbEnemy == 3) {
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
        let end = document.createElement("div");
        end.setAttribute("id", "end");
        end.textContent = "You WIN";

        let divGame = document.getElementById('game');
        
        if(this.player1.attributes.attribut.life == 0){
            this.ia1 = null;
            this.ia2 = null;
            this.ia3 = null;
            clearInterval(this.intervalEnd)
            return
        }

        if(nbEnemy == 3 && this.ia2.attributes.attribut.life == 0 && this.ia1.attributes.attribut.life == 0 && this.ia3.attributes.attribut.life == 0){
            document.getElementById("start").textContent = "Remise à zéro";
            document.getElementById("main_wrapper").replaceChild(end, divGame);
            document.getElementById("main_wrapper").removeChild(divPlayer);
            this.ia1 = null;
            this.ia2 = null;
            this.ia3 = null;
            clearInterval(this.intervalEnd);

        } else if(nbEnemy == 2 && this.ia1.attributes.attribut.life == 0 && this.ia2.attributes.attribut.life == 0){
            document.getElementById("start").textContent = "Remise à zéro";

            document.getElementById("main_wrapper").replaceChild(end, divGame);
            document.getElementById("main_wrapper").removeChild(divPlayer);
            this.ia1 = null;
            this.ia2 = null;
            clearInterval(this.intervalEnd);
            
        } 
        else  if(nbEnemy == 1 && this.ia1.attributes.attribut.life == 0){
            document.getElementById("start").textContent = "Remise à zéro";

            document.getElementById("main_wrapper").replaceChild(end, divGame);
            document.getElementById("main_wrapper").removeChild(divPlayer);
            this.ia1 = null;
            clearInterval(this.intervalEnd);
        }

    }

    interval(){
        var intervalEndGame = setInterval(()=>{
            this.endGame();
        }, 2000);
        this.intervalEnd = intervalEndGame;
    }
}
let gameStart = new GameStarter();