function randomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            logMessages: []
        };
    },
    methods: {
        monsterAttack() {
            this.currentRound++;
            const attackValue = randomValue(5, 12);
            this.monsterHealth -= attackValue;
            this.logData('player', 'attack', attackValue);
            this.playerAttack();
        },
        playerAttack() {
            const attackValue = randomValue(8, 15);
            this.playerHealth -= attackValue; 
            this.logData('monster', 'attack', attackValue);
        },
        specialAttack() {
            this.currentRound++;
            const attackValue = randomValue(10, 25);
            this.monsterHealth -= attackValue;
            this.logData('player', 'special-attack', attackValue);
            this.playerAttack();
        },
        healPlayer() {
            this.currentRound++;
            const healValue = randomValue(8, 15);
            if (this.healPlayer + healValue > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += healValue;
            }
            this.logData('player', 'heal', healValue);
            this.playerAttack();
        },
        newGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.currentRound = 0;
            this.winner = null;
            this.logMessages = [];
        },
        surrender() {
            this.winner = 'monster';
            this.playerHealth = 0;
        },
        logData(who, what, value) {
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            });
        }
    },
    computed: {
        monsterHealthBar() {
            if (this.monsterHealth < 0) {
                return { width: '0%' };
            } else {
                return { width: this.monsterHealth + '%' };
            }
        },
        playerHealthBar() {
            if (this.playerHealth < 0) {
                return { width: '0%' };
            } else {
                return { width: this.playerHealth + '%' };
            }
        },
        attackSpecial() {
            return this.currentRound % 3 !== 0;
        },
        healSpecial() {
            return this.currentRound % 5 !== 0;
        }
    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                this.winner = 'draw';
            } else if (value <= 0) {
                this.winner = 'monster'
            }
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                this.winner = 'draw';
            } else if (value <= 0) {
                this.winner = 'player';
            }
        }
    }
});

app.mount('#game');