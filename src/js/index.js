import Fighter from './fighters.js';
import backgroundImage from '../assets/scenes/background/background.png';
import shopImage from '../assets/scenes/decorations/shop_anim.png';
import Sprite from '../js/sprite.js';
/// Player Imports
import playerIdle from '../assets/Martial Hero/Sprites/Idle.png';
import playerRun from '../assets/Martial Hero/Sprites/Run.png';
import playerAttack1 from '../assets/Martial Hero/Sprites/Attack1.png';
import playerAttack2 from '../assets/Martial Hero/Sprites/Attack2.png';
import playerDeath from '../assets/Martial Hero/Sprites/Death.png';
import playerJump from '../assets/Martial Hero/Sprites/Jump.png';
import playerHit from '../assets/Martial Hero/Sprites/Take Hit.png';
// import playerHi2 from '../assets/Martial Hero/Sprites/TakeHit2.png';
import playerFall from '../assets/Martial Hero/Sprites/Fall.png';
// import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.css';
import * as u from './utility.js';


export const canvas = document.querySelector('canvas');
export const c = canvas.getContext('2d');
//canvas apppearance
canvas.width = 1024;
canvas.height = 524;
//(x,y)

c.fillRect(0,0,canvas.width, canvas.height);


// background
const background  = new Sprite({
  position: {
    x : 0,
    y: 0
  },
  imageSrc: backgroundImage
});

const shop = new Sprite({
  position: {
    x: 560,
    y: 200
  },
  imageSrc: shopImage, 
  scale: 2.5,
  frames : 6
});





// Player and Enemy
const player = new Fighter({
  position : {
    x: 0,
    y: 0 },
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
  },
  imageSrc: playerIdle,
  frames: 8,
  scale: 2.5,
  imgOffset: {
    x: 215,
    y: 157
  },
  sprites : {
    idle : {
      imageSrc: playerIdle,
      frames: 8
    },
    run: {
      imageSrc: playerRun,
      frames: 8
    },
    attack1 : {
      imageSrc: playerAttack1,
      frames: 8
    }
    
  }
  
  
});






const enemy = new Fighter({
  position : {
    x: 950,
    y: 0 },
  color: 'blue',
  velocity: {
    x: 0,
    y: 0
  },
  speed: 4.5,
  jumpHeight: 22,
  offset: {
    x: - 50,
    y: 0
  },
  imageSrc: playerIdle,
  frames: 8,
  scale: 2.5,
  imgOffset: {
    x: 215,
    y: 157
  }
});


const keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  arrowLeft: {
    pressed: false
  },
  arrowRight: {
    pressed: false
  }
};

 




 
u.decreaseTimer();
// animation loop 
function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = 'black';
  c.fillRect(0,0, canvas.width, canvas.height);
  background.update();
  shop.update();
  player.update();
  enemy.update();
  player.image = player.sprites.idle.image;
  if(keys.a.pressed === true && player.lastKey === 'a'){
    player.velocity.x = - player.speed;
    player.image = player.sprites.run.image;
  } else if ( keys.d.pressed === true && player.lastKey === 'd'){
    player.velocity.x = player.speed;
    player.image = player.sprites.run.image;
  } else {
    player.velocity.x = 0;
  }
  
  if(keys.arrowLeft.pressed === true && enemy.lastKey === 'aL'){
    enemy.velocity.x = -enemy.speed;
  }else if (keys.arrowRight.pressed === true && enemy.lastKey === 'aR'){
    enemy.velocity.x = enemy.speed;
  } else enemy.velocity.x = 0;
  
  // detect collision when attacking
  if (u.rectangleCollisionCheck({
    rectangle1: player,
    rectangle2: enemy
  })){
    player.isAttacking = false;
    let currentHealthE = enemy.getCurrentHealthFraction(player.damage) * 100;
    document.querySelector("#enemy-health").style.width =  `${currentHealthE}%`;
   
  }
  
  if(u.rectangleCollisionCheck({
    rectangle1: enemy,
    rectangle2: player
  })){
    enemy.isAttacking = false;
    let currentHealthP = player.getCurrentHealthFraction(enemy.damage) * 100;
    document.querySelector("#player-health").style.width = `${currentHealthP}%`;
    console.log(player.health.currentHealth);
  }
  
  // end game based on health 
  if(enemy.health.currentHealth <= 0 || player.health.currentHealth <= 0){
    u.checkWhoWon({player, enemy});
  }
  
}

animate();


window.addEventListener('keydown', (event) =>{
  console.log(event.key);
  switch (event.key) {
  case 'd':
    keys.d.pressed = true;
    player.lastKey = 'd';
    
    player.switch();
    break;
  case 'a':
    keys.a.pressed = true;
    player.lastKey  = 'a';
    player.switch();
    break;
  case 'w':
    player.jump();
    break;
  case 's': 
    player.duck();
    break;
  case 'c':
    player.shortJump();
    break;
  case 'e':
    player.attack();
    break;
  case 'ArrowRight':
    keys.arrowRight.pressed = true;
    enemy.lastKey = 'aR';
    enemy.switch();
    break;
  case 'ArrowLeft': 
    keys.arrowLeft.pressed = true;
    enemy.lastKey = 'aL';
    enemy.switch();
    break;
  case 'ArrowUp': 
    enemy.jump();
    break;
  case 'ArrowDown':
    enemy.duck();
    break;
  case 'Alt':
    enemy.shortJump();
    break;
  case '/': 
    enemy.attack();
    break;
  } 
});

window.addEventListener('keyup', (event) =>{
  console.log(event.key);
  switch (event.key) {
  case 'd':
    keys.d.pressed = false;
    
    break;
  case 'a':
    keys.a.pressed = false;
    break;
  case 's':
    player.stand();
    break;
  case 'c':
    player.shortLand();
    break;
  case 'ArrowLeft':
    keys.arrowLeft.pressed = false;
    break;
  case 'ArrowRight':
    keys.arrowRight.pressed = false;
    break;
  case 'ArrowDown': 
    enemy.stand();
    break;
  case 'Alt':
    enemy.shortLand();
    break;
  
  }
});





