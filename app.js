function randomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0
        };
    },
    methods: {
        monsterAttack() {
            this.currentRound++;
            const attackValue = randomValue(5, 12);
            this.monsterHealth -= attackValue;
            this.playerAttack();
        },
        playerAttack() {
            const attackValue = randomValue(8, 15);
            this.playerHealth -= attackValue; 
        },
        specialAttack() {
            this.currentRound++;
            const attackValue = randomValue(10, 25);
            this.monsterHealth -= attackValue;
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
            this.playerAttack();
        }
    },
    computed: {
        monsterHealthBar() {
            return { width: this.monsterHealth + '%' };
        },
        playerHealthBar() {
            return { width: this.playerHealth + '%' };
        },
        attackSpecial() {
            return this.currentRound % 3 !== 0;
        }
    }
});

app.mount('#game');