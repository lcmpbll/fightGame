// import $ from 'jquery';
import { c }from './index.js';

class Sprite {
  constructor(position, color) {
    this.position = position;
    this.color = color;
  }
  
  draw () {
    c.fillStyle = this.color;
    c.fillRect(this.position.x, this.position.y, 50, 150);
  }

}






export default Sprite;
