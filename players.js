class Player{
    
    constructor(){
        this.x = null;
        this.y = null;
        this.life = 1;
    }


    startListening(){
        
        document.addEventListener('keypress', (event)=>{
            if(event.keyCode == 37) {
                //left
                this.move(-1, 0);
            }
        });
        document.addEventListener('keypress', (event)=>{
            if(event.keyCode == 39){
                //right
                this.move(+1, 0);
            }
        });
        document.addEventListener('keypress', (event)=> {
            if(event.keyCode == 40){
                //down
                this.move(0, -1);
            }
        })
        document.addEventListener('keypress', (event)=>{
            if(event.keyCode == 38){
                //up
                this.move(0, +1);
            }
        })
    }
    move(x,y){

    }

    bomb(){
    
    }

    canBomb(){

    }
}