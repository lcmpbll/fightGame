import Sprite from '../src/js/sprite.js';


describe("Sprite", () => {
  let newSprite;

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
  
  test("Should should not  half the total height of the sprite when the sprite ducks", () => {
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

});
