// import $ from 'jquery';
import { c, canvas, spriteNames } from './index.js';
import Sprite from './sprite.js';

const gravity = .7;
const groundLevel = 374.4999999999999;

class Fighter extends Sprite {
  
  constructor({position, color, velocity, speed, jumpHeight, health = 150, imageSrc, scale = 1, frames = 1, frameHold = 10, imgOffset = {x: 0, y: 0}, sprites = {}, attackBox = {offset: {}, width: 100, height: 150}}) {
    super({
      position,
      imageSrc,
      scale,
      frames,
      frameHold,
      imgOffset,
      
    });
    
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
      offset: attackBox.offset,
      width: attackBox.width,
      height: attackBox.height,
    
    };

    this.isAttacking = false;
    this.health = {
      currentHealth: health,
      totalHealth: health
    },
    this.frontEdge = this.width;
    this.damage = 10;
    this.gamesWon = 0;
    this.framesElapsed = 0;
    this.currentFrame = 0;
    this.sprites = sprites;
    for(const sprite in this.sprites){
      sprites[sprite].image = new Image();
      sprites[sprite].image.src = sprites[sprite].imageSrc;
      
    }
    
    
  }
  
  // draw () {
  //   c.fillStyle = this.color;
  //   c.fillRect(this.position.x, this.position.y, this.width, this.height);
    
  //   // attack box
  //   if(this.isAttacking){
  //     c.fillStyle = 'yellow';
  //     c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
      
  //   }
  // }
  
  update () {
    this.draw();
    this.animateFrames();
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y;
    c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    // y movement

    if (this.position.y + this.headHeight + this.velocity.y >= canvas.height){
      this.velocity.y = 0;
      this.isOnGround = true;
      this.position.y = groundLevel;
    } else {
      this.switchSprite(spriteNames.fall);
      this.velocity.y += gravity;
      this.isOnGround = false;
      // this.image = this.sprites[jump].imageS
      
    }
    
    
    if(this.position.x >= 1024){
      this.velocity.x = 0;
    } else if (this.position.x + this.velocity.x <= 0){
      this.velocity.x =  0;
    }
  }
  
  jump () {

    if(this.isOnGround === true && this.isDucked === false){
      this.switchSprite(spriteNames.fall);
      this.velocity.y = this.velocity.y - this.jumpHeight;

     
    }
  }
  
  
  shortJump () {
    if(this.isOnGround === true && this.isDucked === false){
      this.switchSprite(spriteNames.jump);
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
    // if(this.lastKey === 'd' || this.lastKey === 'aR'){
      
    //   this.attackBox.offset.x *= -1;
      
    // } else {
    //   // this.attackBox.offset.x *= -1; 
    // }
  
  }
  
  takeHit(damage){
    console.log(damage);
    this.health.current -= damage;
    this.switchSprite(spriteNames.takeHit);
  }
  
  attack () {
    if(this.isAttacking === false){
      this.isAttacking = true;
      this.switchSprite(spriteNames.attack1);
      // setTimeout(()=> {
      //   this.isAttacking = false;
        
      // }, 1000);
    }
    // this.attackCheck(target);
  }

  getCurrentHealthFraction (damage) {
    this.health.currentHealth -= damage;
    return this.health.currentHealth / this.health.totalHealth;
  }
  
  recordWin () {
    this.gamesWon ++;
  }
  
  reset(resetPositions) {

    this.health.currentHealth = this.health.totalHealth;
    this.position.x = resetPositions.position.x;
    this.position.y = resetPositions.position.y;
    // this.attackBox.offset = this.resetPosition.face;
    
    this.velocity.x = resetPositions.velocity.x;
    this.velocity.y = resetPositions.velocity.y;
    // this.switch();
    // this.update(); 
  }
  
  switchSprite(sprite){
    
    let switched = false;
    if(this.image === this.sprites.attack1.image && this.currentFrames < this.sprites.attack1.frames -1) return;
    
    switch(sprite) {
    case spriteNames.idle:
      if(this.image !== this.sprites.idle.image){
        
        this.image = this.sprites.idle.image;
        this.frames = this.sprites.idle.frames;
        switched = true;
      }
      break;
    case spriteNames.run:
      if(this.image !== this.sprites.run.image){
        this.image = this.sprites.run.image;
        this.frames = this.sprites.run.frames;
        switched = true;
      }
      break;
    case spriteNames.attack1: 
      if(this.image !== this.sprites.attack1.image){
        this.image = this.sprites.attack1.image;
        this.frames = this.sprites.attack1.frames;
        switched = true;
      }
      break;
    case spriteNames.attack2: 
      if(this.image !== this.sprites.attack2.image){
        this.image = this.sprites.attack2.image;
        this.frames = this.sprites.attack2.frames;
        switched = true;
      }
      break;
    case spriteNames.jump: 
      if(this.image !== this.sprites.jump.image){
        this.image = this.sprites.jump.image;
        this.frames = this.sprites.jump.frames;
        switched = true;
      }
      break;
    case spriteNames.fall: 
      if(this.image !== this.sprites.fall.image){
        this.image = this.sprites.fall.image;
        this.frames = this.sprites.fall.frames;
        switched = true;
      }
      break;
    case spriteNames.takeHit: 
      if(this.image !== this.sprites.takeHit.image){
        this.image = this.sprites.takeHit.image;
        this.frames = this.sprites.takeHit.frames;
        switched = true;
      }
      break;
    case spriteNames.death: 
      if(this.image !== this.sprites.death.image){
        this.image = this.sprites.death.image;
        this.frames = this.sprites.death.frames;
        switched = true;
      }
      break;
    }
    if(switched === true){
      this.currentFrame = 0;
      this.framesElapsed = 0;
    }
  }
  

}






export default Fighter;
