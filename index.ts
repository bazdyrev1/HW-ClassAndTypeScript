interface Ifighter {
  
    
    getWins():number,
    getLosses(): number,
    getName(): string,
    getDamage(): number,
    getHealth(): number,
    getStrenght(): number,
    getAgility(): number,
    addLoss(): void,
    addWin(): void,
    logCombatHistory(): void,
    heal(value: number): void,
    dealDamage(dam: number): void,
    hit(hero: object): void,
    hitProbability(): boolean,
    attack(hero: object): void

}




class Fighter implements Ifighter{
   name: string;
    damage: number;
    hp: number;
    strenght: number;
    agility: number;
    wins: number;
    losses: number;
    startedHp: number;

    constructor(name: string,
        damage: number,
        hp: number,
        strenght: number,
        agility: number,
        wins: number,
        losses: number,
        startedHp: number,
        ) {
        this.name = name;
        this.damage = damage;  
        this.hp = hp;
        this.startedHp = startedHp;
        this.strenght = strenght;
        this.agility =agility;
        this.wins = wins;
        this.losses = losses;
    }

    getWins(){
        return this.wins;
    };

    getLosses(){
        return this.losses;
    };
    getName(){
        return this.name
    };
    getDamage(){
        return this.damage;
    };
    getHealth(){
        return this.hp;
    };
    getStrenght(){
        return this.strenght;
    };
    getAgility(){
        return this.agility;
    };
    addLoss(){
        this.losses = this.getLosses() + 1;
    }
    addWin(){
        this.wins = this.getWins() + 1;
    }
    logCombatHistory() {
        console.log(`Name : ${this.getName()}, Wins: ${this.getWins()}, Losses: ${this.getLosses()} `);
    }   
    heal(value: number){
        this.getHealth() + value > this.startedHp ? this.hp = this.startedHp : this.hp = this.getHealth() + value;
    }
    dealDamage(dam:  number){
        this.getHealth() >= dam ? this.hp = this.getHealth() - dam : this.hp = 0
    }
    hit(hero: Ifighter){
        hero.dealDamage(this.getDamage());
        console.log(`${this.getName()} makes ${this.getDamage()} damage ${hero.getName()}`);
    }
    hitProbability() {
        const hitProbability = 100 - (this.strenght + this.agility);
        const hit = Math.random() <= hitProbability / 100;
        return hit;
    };
    attack(hero: Ifighter) {
        this.hitProbability() ? this.hit(hero) : console.log(`${this.name} attack missed`);
    };
    

}


const myFighter: Ifighter = new Fighter(
   'Maximus',
   25,
   100,
    30,
    25,
    0,
    0,
    100
    
);

const opponentFighter: Ifighter = new Fighter(
   'Commodus',
    25,
    90,
    25,
    20,
    0,
    0,
    100
);

function battle(myFighter: Ifighter, opponentFighter: Ifighter): void {
    if (myFighter.getHealth() === 0
      || opponentFighter.getHealth() === 0) {
      myFighter.getHealth() === 0 ? console.log(`${myFighter.getName()} is dead and can\`t fight.`) : console.log(`${opponentFighter.getName()} is dead and can\`t fight.`);
    } else {
      while (
        myFighter.getHealth() > 0
        && opponentFighter.getHealth() > 0
      ) {
        myFighter.attack(opponentFighter);
        opponentFighter.attack(myFighter);
      }
  
      switch (true) {
        case myFighter.getHealth() > opponentFighter.getHealth():
          console.log(`${myFighter.getName()} has won!`);
          myFighter.addWin();
          opponentFighter.addLoss();
          break;
        case opponentFighter.getHealth() > myFighter.getHealth():
          console.log(`${opponentFighter.getName()} has won!`);
          opponentFighter.addWin();
          myFighter.addLoss();
          break;
        default:
          myFighter.addLoss();
          opponentFighter.addLoss();
          console.log('There are no winners! Both opponents fell in battle!');
          break;
      }
    }
  }

console.log(myFighter);
console.log(opponentFighter);
console.log(battle(myFighter, opponentFighter))

export{}