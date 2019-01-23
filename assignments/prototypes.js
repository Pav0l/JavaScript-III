/*
  Object oriented design is commonly used in video games.  For this part of the assignment you will be implementing 
  several constructor functions with their correct inheritance hierarchy.

  In this file you will be creating three constructor functions: GameObject, CharacterStats, Humanoid.  

  At the bottom of this file are 3 objects that all end up inheriting from Humanoid. 
   Use the objects at the bottom of the page to test your constructor functions.
  
  Each constructor function has unique properties and methods that are defined in their block comments below:
*/
  
/*
  === GameObject ===
  * createdAt
  * dimensions (These represent the character's size in the video game)
  * destroy() // prototype method -> returns the string: 'Object was removed from the game.'
*/

function GameObject(args) {
  this.createdAt = args.createdAt;
  this.dimensions = args.dimensions;
}
GameObject.prototype.destroy = function() {
  return `${this.name} was removed from the game.`
}

/*
  === CharacterStats ===
  * healthPoints
  * name
  * takeDamage() // prototype method -> returns the string '<object name> took damage.'
  * should inherit destroy() from GameObject's prototype
*/

function CharacterStats(args) {
  GameObject.call(this, args);
  this.healthPoints = args.healthPoints;
  this.name = args.name;
}
CharacterStats.prototype = Object.create(GameObject.prototype);
CharacterStats.prototype.takeDamage = function() {
  return `${this.name} took damage.`
}

/*
  === Humanoid (Having an appearance or character resembling that of a human.) ===
  * team
  * weapons
  * language
  * greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
  * should inherit destroy() from GameObject through CharacterStats
  * should inherit takeDamage() from CharacterStats
*/

function Humanoid(args) {
  CharacterStats.call(this, args);
  this.team = args.team;
  this.weapons = args.weapons;
  this.language = args.language;
}
Humanoid.prototype = Object.create(CharacterStats.prototype);
Humanoid.prototype.greet = function () {
  return `${this.name} offers a greeting in ${this.language}`
}

/*
  * Inheritance chain: GameObject -> CharacterStats -> Humanoid
  * Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
  * Instances of CharacterStats should have all of the same properties as GameObject.
*/

// Test you work by un-commenting these 3 objects and the list of console logs below:


const mage = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 1,
    height: 1,
  },
  healthPoints: 5,
  name: 'Bruce',
  team: 'Mage Guild',
  weapons: [
    'Staff of Shamalama',
  ],
  language: 'Common Tongue',
});

const swordsman = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 2,
    height: 2,
  },
  healthPoints: 15,
  name: 'Sir Mustachio',
  team: 'The Round Table',
  weapons: [
    'Giant Sword',
    'Shield',
  ],
  language: 'Common Tongue',
});

const archer = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 1,
    width: 2,
    height: 4,
  },
  healthPoints: 10,
  name: 'Lilith',
  team: 'Forest Kingdom',
  weapons: [
    'Bow',
    'Dagger',
  ],
  language: 'Elvish',
});

console.log(mage.createdAt); // Today's date
console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
console.log(swordsman.healthPoints); // 15
console.log(mage.name); // Bruce
console.log(swordsman.team); // The Round Table
console.log(mage.weapons); // Staff of Shamalama
console.log(archer.language); // Elvish
console.log(archer.greet()); // Lilith offers a greeting in Elvish.
console.log(mage.takeDamage()); // Bruce took damage.
console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.


  // Stretch task: 
  // * Create Villain and Hero constructor functions that inherit from the Humanoid constructor function.  
  // * Give the Hero and Villains different methods that could be used to remove health points from objects 
  // which could result in destruction if health gets to 0 or drops below 0;
  // * Create two new objects, one a villain and one a hero and fight it out with methods!

function Villain(args) {
  Humanoid.call(this, args);
}
Villain.prototype = Object.create(Humanoid.prototype);
Villain.prototype.curse = function (atckTarget) {
  console.log(`${this.name} casted his curse on you!`)
  return atckTarget.healthPoints -= 1;
}

function Hero (args) {
  Humanoid.call(this, args);
}
Hero.prototype = Object.create(Humanoid.prototype);
Hero.prototype.blast = function (atckTarget) {
  console.log(`${this.name} attacked with his spell!`);
  return atckTarget.healthPoints -= 1;
}

const villainChar = new Villain({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 3,
    height: 5,
  },
  healthPoints: 15,
  name: 'Lich King',
  team: 'Scourge',
  weapons: [
    'Frostmourne',
  ],
  language: 'Necromancer',
});

const heroChar = new Hero({
  createdAt: new Date(),
  dimensions: {
    length: 3,
    width: 5,
    height: 2,
  },
  healthPoints: 15,
  name: 'Anduin Wrynn',
  team: 'Alliance',
  weapons: [
    'Sword',
  ],
  language: 'Human',
});

const battle = function(char1, char2, hp = 15) {
  let isAlive = true;
  char1.healthPoints = hp;
  char2.healthPoints = hp;
  while (isAlive) {
    console.log('New round begins:')
    isAlive = char1.healthPoints > 1 && char2.healthPoints > 1;
    let rng = Math.random();
    rng > 0.5 ? char1.curse(char2) : char2.blast(char1);
    console.log(`${char1.name} has ${char1.healthPoints}HP left.${char2.name} has ${char2.healthPoints}HP left.`)
  }
  char1.healthPoints > 1 ? console.log(`${char1.name.toUpperCase()} has WON the battle!`) : console.log(`${char2.name.toUpperCase()} has WON the battle!`);
};
battle(villainChar, heroChar);