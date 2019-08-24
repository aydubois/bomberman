let allTime = 60*2;
let intervalId = null;

const timer = document.getElementById('timer');

function stopTimer(){
    clearInterval(intervalId);
    timer.innerHTML = "END GAME";
}
function bip(){
    allTime--;
    if(allTime <= 0 ){
        stopTimer();
    }
    else{
        let minutes = Math.floor(allTime/60);
        let secondes = allTime - (60*minutes);
        timer.innerHTML = minutes + " : " + secondes;
    }
}
function startTimer(){
    intervalId  = setInterval(bip, 1000);
}
