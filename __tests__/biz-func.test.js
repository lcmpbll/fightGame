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
    newSprite.isOnGround = true;
    newSprite.jump();
    expect(newSprite.velocity.y).toEqual(newSprite.velocity.y - newSprite.jumpHeight);
  });
  
  test("Should not subtract the sprites jumpheight from the y velocity if the sprite is not on the ground", () => {
    const veloY = newSprite.velocity.y;
    newSprite.jump();
    expect(newSprite.velocity.y).toEqual(veloY);
  });
  
  test("Should should half the total height of the sprite when the sprite ducks", () => {
    const height = newSprite.headHeight * 0.5;
    newSprite.isOnGround = true;
    newSprite.duck();
    expect(newSprite.height).toEqual(height);
  });
  
  

});
