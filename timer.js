let allTime = 60 * 2 


const timer = document.getElementById('timer');


if (allTime > 0) {

    let interval = setInterval(function () {
        timer.innerHTML = --allTime;
    }, 1000) 
}
else {
        timer.innerHTML = "END GAME";
    }

