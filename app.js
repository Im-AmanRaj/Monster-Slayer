function randomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100
        };
    },
    methods: {
        monsterAttack() {
            const attackValue = randomValue(5, 12);
            this.monsterHealth -= attackValue;
            this.playerAttack();
        },
        playerAttack() {
            const attackValue = randomValue(8, 15);
            this.playerHealth -= attackValue; 
        }
    },
    computed: {
        monsterHealthBar() {
            return { width: this.monsterHealth + '%' };
        },
        playerHealthBar() {
            return { width: this.playerHealth + '%' };
        }
    }
});

app.mount('#game');