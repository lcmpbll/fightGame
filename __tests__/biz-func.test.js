import Sprite from '../src/js/fighters.js';
import { rectangleCollisionCheck } from '../src/js/utility.js';


describe("Sprite", () => {
  let newSprite;
  let opSprite;
  const playerStartInfo = {
    position : {
      x: 0,
      y: 0
    }, 
    velocity: {
      x: 0,
      y: 0
    },
    lastKey: 'd'
    
  };

  beforeEach(() => {

    newSprite = new Sprite({
      position : {
        x: 0,
        y: 0
      },
      color: 'red',  
      velocity: {
        x: 0,
        y: 0
      },
      speed: 5,
      jumpHeight: 20,
      offset: {
        x: 0,
        y: 0
      }
 
    });

    
  //   const createElement = document.createElement.bind(document);
  //   document.createElement = (tagName) => {
  //     if (tagName === 'canvas') {
  //       return {
  //         getContext: () => ({}),
  //         measureText: () => ({})
  //       };
  //     }
  //     return createElement(tagName);
  //   };
  });
  

  test("should create a new sprite object ", () => {
    expect(typeof newSprite).toEqual("object");
  });
  
  test("should create a new sprite with a position {0,0} ", () => {
    expect(newSprite.position).toEqual({x: 0, y: 0});
  });
  
  test("should create a new sprite with the color red", () => {
    expect(newSprite.color).toEqual('red');
  });
  
  test("should create a new sprite with  a velocity of {0, 0 }", () => {
    expect(newSprite.velocity).toEqual({x: 0, y: 0});
  });
  
  test("should create a new sprite with a speed of 5", () => {
    expect(newSprite.speed).toEqual(5);
  });
  
  test("should create a new sprite with a jumpHeight of 20 ", () => {
    expect(newSprite.jumpHeight).toEqual(20);
  });
  
  test("should create a new sprite with the false isDucked property", () => {
    expect(newSprite.isDucked).toEqual(false);
  });
  
  test("should create a new sprite with headHeight of 150", () => {
    expect(newSprite.headHeight).toEqual(150);
  });
  
  test("should create a new sprite with a width of 50", () => {
    expect(newSprite.width).toEqual(50);
  });
  
  test("should create a new sprite with a last key property", () => {
    expect(newSprite.lastKey).toEqual(undefined);
  });
  
  test("should create a new sprite with false isOnGround propterty", () => {
    expect(newSprite.isOnGround).toEqual(false);
  });
  
  //function tests
  
  test("Should subtract the sprites jumpheight from the y velocity if the sprite is not on the ground", () => {
    const startVelocity = newSprite.velocity.y;
    newSprite.isOnGround = true;
    newSprite.jump();
    
    expect(newSprite.velocity.y).toEqual(startVelocity - newSprite.jumpHeight);
  });
  
  test("Should not subtract the sprites jumpheight from the y velocity if the sprite is not on the ground", () => {
    const veloY = newSprite.velocity.y;
    newSprite.jump();
    expect(newSprite.velocity.y).toEqual(veloY);
  });
  
  test("Should should shorten the sprite by half from the bottom ewhen the sprite short jumps", () => {
    const height = newSprite.headHeight * 0.5;
    newSprite.isOnGround = true;
    newSprite.shortJump();
    expect(newSprite.height).toEqual(height);
  });
  
  test("Should not  half the total height of the sprite when the sprite ducks", () => {
    const height = newSprite.headHeight;
    newSprite.isOnGround = false;
    newSprite.duck();
    expect(newSprite.height).toEqual(height);
  });
  
  test("Should return to standing height after ducking", () => {
    const height = newSprite.headHeight;
    newSprite.isOnGround = true;
    newSprite.duck();
    newSprite.stand();
    expect(newSprite.height).toEqual(height);
  });
  
  test("Should land the sprite on the ground after a shortJump", () => {
    const height = newSprite.headHeight;
    newSprite.isOnGround = true;
    newSprite.shortJump();
    newSprite.shortLand();
    expect(newSprite.height).toEqual(height);
  });
  
  test("Shoud increase velocity by 0.7 when update is run", () => {
    newSprite.position.y = 300;
    newSprite.update();
  
    expect(newSprite.velocity.y).toEqual(0.7);
  });
  
  test("Shoud increase velocity by 0.7 each time update is run", () => {
    newSprite.position.y = 300;
    newSprite.update();
    newSprite.update();
    expect(newSprite.velocity.y).toEqual(1.4);
  });
  
    
  test("Shoud  sprite position y be lower than 373 and update is run isOnGround will be false", () => {
    newSprite.position.y = 373;
    newSprite.update();
    // newSprite.update();
    expect(newSprite.isOnGround).toEqual(false);
  });
  
  test("Shoud  sprite y position be closer than 373 when update is run the sprite should be on the ground ", () => {
    newSprite.position.y = 373;
    newSprite.update();
    newSprite.update();
    expect(newSprite.isOnGround).toEqual(true);
  });
  
  test("Shoud have a property speed that is a number. ", () => {

    expect(typeof newSprite.speed).toEqual("number");
  });
  
  test("Attack should cause is attacking to be true. ", () => {
    newSprite.attack();
    expect(newSprite.isAttacking).toEqual(true);
  });
  
  test("Should have isAttacking be false after 1 second. ", async () => {
    newSprite.attack();
    await new Promise((r) => setTimeout(r, 1000));

    expect(newSprite.isAttacking).toEqual(false);
  });
  
  test("Attack should return 1 if damage is zero. ", () => {
    const damage = 0;

    expect(newSprite.getCurrentHealthFraction(damage)).toEqual(1);
  });
  
  test("Attack should return (150-10)/150. if damage === 10 ", () => {
    const damage = 10;
    
    expect(newSprite.getCurrentHealthFraction(damage)).toEqual((150 -10)/ 150);
  });
  
  
  test("Should set the offSet.x to -50 if the last key was aL", () => {
   
    newSprite.lastKey = 'aL';
    newSprite.switch();
    expect(newSprite.attackBox.offset.x).toEqual(-50);
  });
  
  test("Should set the offSet.x to 0 if the last key was aR", () => {
   
    newSprite.lastKey = 'aR';
    newSprite.switch();
    expect(newSprite.attackBox.offset.x).toEqual(0);
  });
  
  test("Should reset the players Positition", () => {
    newSprite.position = {
      x: 120,
      y: 374
    };
    newSprite.reset(playerStartInfo);
    expect(newSprite.position).toEqual(playerStartInfo.position);
  });
  
  test("Should reset the players Positition", () => {
    newSprite.health.currentHealth = 10;
    newSprite.reset(playerStartInfo);
    expect(newSprite.health.currentHealth).toEqual(newSprite.health.totalHealth);
  });
  
  test("should reduce the current health of the enemy by 10", () => {
    const health = newSprite.health.currentHealth;
    newSprite.takeHit(10);
    expect(newSprite.health.currentHealth).toEqual(health -10);
  });
  
  test("should block the attack if player attack at the correct time", () => {
    opSprite = new Sprite({
      position : {
        x: 0,
        y: 0
      },
      color: 'red',  
      velocity: {
        x: 0,
        y: 0
      },
      speed: 5,
      jumpHeight: 20,
      offset: {
        x: 0,
        y: 0
      }
    });
    rectangleCollisionCheck({rectangle1: newSprite, rectangle2: opSprite});
    expect(opSprite.health.currentHealth).toEqual(opSprite.health.totalHealth);
    
  });
  
  
  
  

});
