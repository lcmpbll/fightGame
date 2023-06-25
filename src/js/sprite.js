// import $ from 'jquery';
import { c, canvas }from './index.js';

const gravity = .2;

class Sprite {
  constructor({position, color, velocity}) {
    this.position = position;
    this.color = color;
    this.velocity = velocity;
    this.height = 150;
    this.width = 50;
  }
  
  draw () {
    c.fillStyle = this.color;
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  
  update () {
    this.draw();
 
    this.position.y += this.velocity.y;
    // 1024 = canvas.height
    if (this.position.y + this.height + this.velocity.y >= canvas.height){
      this.velocity.y = 0;
    } else {
      this.velocity.y += gravity;
      
    }
  }

}






export default Sprite;
