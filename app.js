new Vue({
  el: "#app",
  data: {
    toggle: false,
    monsterHealth: 100,
    playerHealth: 100,
    numberOfSpecialAttacks: 2,
    numberOfHeals: 2,
    logs: []
  },
  methods: {
    //* When player clicks "attack" button this function will run:
    startAttacking: function() {
      //* Calculate damage numbers with random numbers. After that assign new healths:
      const damageOnMonster = Math.round(Math.random() * 15);
      const damageOnPlayer = Math.round(Math.random() * 15);

      console.log(damageOnMonster, damageOnPlayer);

      this.playerHealth = this.playerHealth - damageOnPlayer;
      //* Log the move
      this.logs.push({ turn: "m", string: "Monster attack with " + damageOnPlayer });

      this.monsterHealth = this.monsterHealth - damageOnMonster;
      //* Log the move
      this.logs.push({ turn: "p", string: "Player attack with " + damageOnMonster });

      //* Win or loose condition. Whether win or loose inform player and ask for a new game:
      if (this.playerHealth <= 0) {
        if (confirm("You loose. Would you like to play again")) {
          location.reload();
        }
      }
      if (this.monsterHealth <= 0) {
        if (confirm("You win. Would you like to play again")) {
          location.reload();
        }
      }
    },
    //* When player clicks "special attack" button this function will run:
    specialAttacking: function() {
      //* If there are any moves left do special attack. If not inform player:
      if (this.numberOfSpecialAttacks > 0) {
        //* Whether special or not monster will do a damage on player:
        const damageOnPlayer = Math.round(Math.random() * 15);
        this.playerHealth = this.playerHealth - damageOnPlayer;
        //* Log the move
        this.logs.push({ turn: "m", string: "Monster attack with " + damageOnPlayer });

        //* Now player has a chance to do a double damage:
        const CritDamageChance = Math.random();

        //* Crit Damage Change is %40
        if (CritDamageChance > 0.59) {
          const damageOnMonster = 25;
          this.monsterHealth = this.monsterHealth - damageOnMonster;
          //* Log the move
          this.logs.push({
            turn: "p",
            string: "(Critic) Player do a special attack with " + damageOnMonster
          });
        } else {
          //* if double damage doens't occur, player still do slightly increased damage:
          const damageOnMonster = Math.round(Math.random() * 15 * 1.2);
          this.monsterHealth = this.monsterHealth - damageOnMonster;
          //* Log the move
          this.logs.push({
            turn: "p",
            string: "Player do a special attack with " + damageOnMonster
          });
        }

        //* Game would finish with special attack, then consider win or loose condition also here:
        if (this.playerHealth <= 0) {
          if (confirm("You loose. Would you like to play again")) {
            location.reload();
          }
        }
        if (this.monsterHealth <= 0) {
          if (confirm("You win. Would you like to play again")) {
            location.reload();
          }
        }
        this.numberOfSpecialAttacks = this.numberOfSpecialAttacks - 1;
      } else {
        alert("You can't do a special attack. Because none left...");
      }
    },
    //* When player clicks "heal" button, this function will run:
    healplayer: function() {
      //* If there are any moves left heal player. If not inform player:
      if (this.numberOfHeals > 0 && this.playerHealth < 100) {
        //* Even if the player use his heal moves, monster will do attack but slightly decreased:
        const damageOnPlayer = Math.round(Math.random() * 15 * 0.6);
        this.playerHealth = this.playerHealth - damageOnPlayer;
        //* Log the move
        this.logs.push({ turn: "m", string: "Monster attack with " + damageOnPlayer });

        //* Now player has a chance to a double heal:
        const doubleHealChance = Math.round(Math.random());

        //* Crit Heal Change is %50
        if (doubleHealChance) {
          const healNumber = 15;
          this.playerHealth = this.playerHealth + healNumber;
          //* Log the move
          this.logs.push({ turn: "p", string: "(Critic) Player heal yourself with " + healNumber });
        } else {
          //* if double heal doesn't occur, player still do slightly increased heal:
          const healNumber = 7;
          this.playerHealth = this.playerHealth + healNumber;
          //* Log the move
          this.logs.push({ turn: "p", string: "Player heal yourself with " + healNumber });
        }

        //* Game would finish with special attack, then consider win or loose condition also here:
        if (this.playerHealth <= 0) {
          if (confirm("You loose. Would you like to play again")) {
            location.reload();
          }
        }
        if (this.monsterHealth <= 0) {
          if (confirm("You win. Would you like to play again")) {
            location.reload();
          }
        }
        this.numberOfHeals = this.numberOfHeals - 1;

        if (this.playerHealth > 100) {
          this.playerHealth = 100;
        }
      } else {
        alert(
          "You can't heal yourself... Whether there are any moves left or you have full health..."
        );
      }
    },
    finishGame: function() {
      if (confirm("You will loose the game. Are you sure?")) {
        location.reload();
      }
    }
  }
});
