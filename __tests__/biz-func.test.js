import Sprite from '../src/js/sprite.js';


describe("Sprite", () => {
  let newSprite;

  beforeEach(() => {

    newSprite = new Sprite({
      position : {
        x: 0,
        y: 0
      }
 
    });
  });
  
  // position : {
  //   x: 0,
  //   y: 0 },
  // color: 'red',
  // velocity: {
  //   x: 0,
  //   y: 0
  // },
  // speed: 5,
  // jumpHeight: 20,


  test("should create a new sprite with a position {0,0} ", () => {
    expect(newSprite.position).toEqual({x: 0, y: 0});
  });

});
