export class Timer {

    constructor() {
        this.timerText = document.getElementById("timer");
        this.timeLeft = null;
        this.wholeTime = 0, 5 * 60;
        this.finished = false;
        this.timer(2*60);
    }

    //displayTimeLeft(wholeTime);

    changeWholeTime(seconds) {
        if ((wholeTime + seconds) > 0) {
            wholeTime += seconds;
        }
    }

    timer(seconds) { //counts time, takes seconds
        let remainTime = Date.now() + (seconds * 1000);
        this.displayTimeLeft(seconds);

        let intervalTimer = setInterval(() => {
            let timeLeft = Math.round((remainTime - Date.now()) / 1000);
            if (timeLeft <= 0 ||!document.getElementById("player1")) {
                clearInterval(intervalTimer);
                this.displayTimeLeft(this.wholeTime);
                this.finished = true;
                return;
            }
            this.displayTimeLeft(timeLeft);
        }, 1000);  
    }



    displayTimeLeft(timeLeft) { //displays time on the input
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        let displayString = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        this.timerText.textContent = displayString;

    }

}