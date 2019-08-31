

export class Bonus {
    constructor() {
        this.listBonus = {
            life: 1,
            maxBombs: 1,
            delayBomb: 3,
            damageBomb: 1
        }
        this.dead = false

    }

    removeLife() {
        this.listBonus.life--;
        if (this.listBonus.life <= 0) {
            this.dead = true;
            document.getElementById("player1").remove();
            document.getElementById("sentence").textContent = "YOU LOST, TRY AGAIN";
        }

    }



}