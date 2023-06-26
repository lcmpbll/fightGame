// import $ from 'jquery';
import { c, canvas } from './index.js';

const gravity = .7;

class Sprite {
  constructor({position, color, velocity, speed, jumpHeight, health = 150, offset}) {
    this.position = position;
    this.color = color;
    this.velocity = velocity;
    this.headHeight = 150;
    this.width = 50;
    this.isOnGround = false;
    this.isDucked = false;
    this.height = 150;
    this.lastKey;
    this.speed = speed;
    this.jumpHeight = jumpHeight;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y
      },
      offset,
      width: 100,
      height: 50,
      color: 'yellow'
    };
    this.isAttacking = false;
    this.health = {
      currentHealth: health,
      totalHealth: health
    },
    this.frontEdge = this.width;
    this.damage = 10;
  }
  
  draw () {
    c.fillStyle = this.color;
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
    
    // attack box
    if(this.isAttacking){
      c.fillStyle = 'yellow';
      c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
      
    }
  }
  
  update () {
    this.draw();
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    // 524 = canvas.height
    if (this.position.y + this.headHeight + this.velocity.y >= canvas.height){
      this.velocity.y = 0;
      this.isOnGround = true;
    } else {
      this.velocity.y += gravity;
      this.isOnGround = false;
      
      
    }
  }
  
  jump () {

    if(this.isOnGround === true){
      this.velocity.y = this.velocity.y - this.jumpHeight;

     
    }
  }
  
  
  shortJump () {
    if(this.isOnGround === true && this.isDucked === false){
      this.isDucked = true;
      this.height = this.headHeight * 0.5;
    }
  }
  
  shortLand () {
    this.isDucked = false;
    this.height = this.headHeight;
  }
  
  //currently more of a leg sweep dodge
  duck () {
    console.log(this.isDucked);
    if(this.isOnGround === true && this.isDucked === false){
      this.isDucked = true;
      this.position.y +=this.headHeight * 0.5;
    }
  }
  
  stand () {
    this.isDucked = false;
    this.position.y -= this.headHeight * 0.5;
  }
  
  switch () {
    console.log('switch');
    if(this.lastKey === 'd' || this.lastKey === 'aR'){
      
      this.attackBox.offset.x = 0;
    } else {
      this.attackBox.offset.x = -50; 
    }
  
  }
  
  
  attack () {
    this.isAttacking = true;
    setTimeout(()=> {
      this.isAttacking = false;
    }, 100);
    // this.attackCheck(target);
  }

  getCurrentHealthPercent (damage) {
    this.health.currentHealth -= damage;
    return this.health.currentHealth / this.health.totalHealth;
  }
  
  

}






export default Sprite;
