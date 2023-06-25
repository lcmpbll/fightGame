// import $ from 'jquery';
import { c }from './index.js';

class Sprite {
  constructor({position, color, velocity}) {
    this.position = position;
    this.color = color;
    this.velocity = velocity;
  }
  
  draw () {
    c.fillStyle = this.color;
    c.fillRect(this.position.x, this.position.y, 50, 150);
  }
  
  update () {
    this.draw();
    this.position.y += 10;
  }

}






export default Sprite;
