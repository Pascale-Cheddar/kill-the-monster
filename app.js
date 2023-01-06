function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: [],
    };
  },
  watch: {
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        // draw
        this.winner = 'draw';
      } else if (value <= 0) {
        //lost
        this.winner = 'player';
      }
    },
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        // draw
        this.winner = 'draw';
      } else if (value <= 0) {
        // player lost
        this.winner = 'monster';
      }
    },
  },
  computed: {
    monsterBarStyle() {
      if (this.monsterHealth < 0) {
        return { width: '0%' };
      }
      return { width: this.monsterHealth + '%' };
    },
    playerBarStyle() {
      if (this.playerHealth < 0) {
        return { width: '0%' };
      }
      return { width: this.playerHealth + '%' };
    },
    specialAttackAvailable() {
      return this.currentRound % 3 !== 0;
    },
    healingIsNotAvailable() {
      return this.playerHealth === 100;
    },
  },
  methods: {
    startGameAgain() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.winner = null;
      this.logMessages = [];
    },
    attackMonster() {
      const attackValue = getRandomValue(5, 12);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
      this.addLogMessage('player', 'attack', attackValue);
      this.currentRound++;
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      this.playerHealth -= attackValue;
      this.addLogMessage('monster', 'attack', attackValue);
    },
    specialAttack() {
      const attackValue = getRandomValue(12, 27);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
      this.addLogMessage('player', 'attack', attackValue);
      this.currentRound++;
    },
    healingPortion() {
      let healing = 0;
      if (this.playerHealth < 90) {
        healing = getRandomValue(4, 14);
        this.playerHealth += healing
        this.addLogMessage('player', 'heal', healing);
        
      } else if (this.playerHealth > 90) {
        healing = 2;
        this.playerHealth += healing;
        this.addLogMessage('player', 'heal', healing);
      } 
      if (this.playerHealth > 100) {
        this.playerHealth = 100

      }
      this.currentRound++;
    },
    surrender() {
      this.playerHealth = 0;
    },
    addLogMessage(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
});

app.mount('#game');
