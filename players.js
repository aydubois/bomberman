export class Player{
    
    constructor(){
        this.x = 0;
        this.y = 0;
        this.life = 1;

        this.startListening();
    }


    startListening(){
        document.addEventListener('keyup', (event)=>{
            if(event.keyCode == 37) {
                //left
                this.move(-1, 0);
            }
        });
        document.addEventListener('keyup', (event)=>{
            if(event.keyCode == 39){
                //right
                this.move(1, 0);
            }
        });
        document.addEventListener('keyup', (event)=> {
            if(event.keyCode == 40){
                //down
                this.move(0, -1);
            }
        })
        document.addEventListener('keyup', (event)=>{
            if(event.keyCode == 38){
                //up
                this.move(0, 1);
            }
        })
    }
    move(x,y){
        if(x > 0){ // right
            const player = document.querySelector('div[name]');
            let initY = player.getAttribute("row");
            let initX = player.getAttribute("column");
            let finalX = parseInt(initX, 10) + 1;
            
            // search new position of player
            const newCase = document.querySelector(`[column = "${finalX}"][row="${initY}"]`)
            newCase.style.backgroundImage = 'url("player1.png")';
            newCase.style.backgroundSize = "cover";
            newCase.setAttribute("name", "player1");
            
            //remove last position
            player.removeAttribute("name");
            player.style.backgroundImage = "none";
        }

        else if(x < 0){ // left
            const player = document.querySelector('div[name]');
            let initY = player.getAttribute("row");
            let initX = player.getAttribute("column");
            let finalX = parseInt(initX, 10) - 1;
            
            // search new position of player
            const newCase = document.querySelector(`[column = "${finalX}"][row="${initY}"]`)
            newCase.style.backgroundImage = 'url("player1.png")';
            newCase.style.backgroundSize = "cover";
            newCase.setAttribute("name", "player1");
            
            //remove last position
            player.removeAttribute("name");
            player.style.backgroundImage = "none";
        }
        
        else if(y > 0){ //down
            const player = document.querySelector('div[name]');
            let initY = player.getAttribute("row");
            let initX = player.getAttribute("column");
            let finalY = parseInt(initY, 10) - 1;
            
            // search new position of player
            const newCase = document.querySelector(`[column = "${initX}"][row="${finalY}"]`)
            newCase.style.backgroundImage = 'url("player1.png")';
            newCase.style.backgroundSize = "cover";
            newCase.setAttribute("name", "player1");
            
            //remove last position
            player.removeAttribute("name");
            player.style.backgroundImage = "none";
        }

        else if(y < 0){ // up
            const player = document.querySelector('div[name]');
            let initY = player.getAttribute("row");
            let initX = player.getAttribute("column");
            let finalY = parseInt(initY, 10) + 1;
            
            // search new position of player
            const newCase = document.querySelector(`[column = "${initX}"][row="${finalY}"]`)
            newCase.style.backgroundImage = 'url("player1.png")';
            newCase.style.backgroundSize = "cover";
            newCase.setAttribute("name", "player1");
            
            //remove last position
            player.removeAttribute("name");
            player.style.backgroundImage = "none";
        }



        }

    bomb(){
    
    }

    canBomb(){

    }
}