interface IFighter {
    getWins(): number,
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
    attack(hero: object): void,
}
interface IPropsObj {
    name: string;
    damage: number;
    hp: number;
    strenght: number;
    agility: number;
}

class Fighter implements IFighter {
    name: string;
    damage: number;
    hp: number;
    strenght: number;
    agility: number;
    wins: number;
    losses: number;

    constructor(obj: IPropsObj) {
        this.name = obj.name;
        this.damage = obj.damage;
        this.hp = obj.hp;
        this.strenght = obj.strenght;
        this.agility = obj.agility;
        this.wins = 0;
        this.losses = 0;
    }

    getWins() {
        return this.wins;
    };
    getLosses() {
        return this.losses;
    };
    getName() {
        return this.name
    };
    getDamage() {
        return this.damage;
    };
    getHealth() {
        return this.hp;
    };
    getStrenght() {
        return this.strenght;
    };
    getAgility() {
        return this.agility;
    };
    addLoss() {
        this.losses = this.getLosses() + 1;
    };
    addWin() {
        this.wins = this.getWins() + 1;
    };
    logCombatHistory() {
        console.log(`Name : ${this.getName()}, Wins: ${this.getWins()}, Losses: ${this.getLosses()} `);
    };
    heal(value: number) {
        this.getHealth() + value > this.hp ? this.hp = value : this.hp = this.getHealth() + value;
    };
    dealDamage(dam: number) {
        this.getHealth() >= dam ? this.hp = this.getHealth() - dam : this.hp = 0
    };
    hit(hero: IFighter) {
        hero.dealDamage(this.getDamage());
        console.log(`${this.getName()} makes ${this.getDamage()} damage ${hero.getName()}`);
    };
    hitProbability() {
        const hitProbability = 100 - (this.strenght + this.agility);
        const hit = Math.random() <= hitProbability / 100;
        return hit;
    };
    attack(hero: IFighter) {
        this.hitProbability() ? this.hit(hero) : console.log(`${this.name} attack missed`);
    };
}

const myFighter: IFighter = new Fighter({
    name: 'Maximus',
    damage: 25,
    hp: 100,
    strenght: 30,
    agility: 25,
});

const opponentFighter: IFighter = new Fighter({
    name: 'Commodus',
    damage: 25,
    hp: 90,
    strenght: 25,
    agility: 20,
});

const condition: boolean = myFighter.getHealth() > 0 && opponentFighter.getHealth() > 0;
const isDeadHero: boolean = myFighter.getHealth() === 0;
const isDeadOpponent: boolean = opponentFighter.getHealth() === 0;

function battle(myFighter: IFighter, opponentFighter: IFighter): void {
    if (isDeadHero || isDeadOpponent) {
        myFighter.getHealth() === 0 ? console.log(`${myFighter.getName()} is dead and can\`t fight.`) : console.log(`${opponentFighter.getName()} is dead and can\`t fight.`);
    } else {
        while (condition) {
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

export { }