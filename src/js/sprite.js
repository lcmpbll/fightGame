// import $ from 'jquery';
import { c, canvas } from './index.js';



class Sprite {
  constructor({position,  imageSrc, scale = 1, frames = 1, frameHold = 10}) {
    this.position = position;
    this.height = canvas.height;
    this.width = canvas.width;
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.frames = frames;
    this.currentFrame = 0;
    this.framesElapsed = 0,
    this.framesHold = frameHold;
    
    

  
  
  }
  
  draw () {
    c.drawImage(this.image, this.currentFrame * (this.image.width / this.frames), 0, this.image.width/this.frames , this.image.height, this.position.x, this.position.y, this.image.width/this.frames * this.scale, this.image.height * this.scale);
  }
  
  update () {
    this.draw();
    
    this.framesElapsed ++;
    if(this.frames > 1 && this.framesElapsed % this.framesHold === 0){
      if (this.frames - 1  > this.currentFrame){
        
        this.currentFrame ++;
      } else {
        this.currentFrame = 0;
      }
    } 
  
  }
  

  
  

  

  

}






export default Sprite;