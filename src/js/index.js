import Fighter from './fighters.js';
import backgroundImage from '../assets/scenes/background/background.png';
import shopImage from '../assets/scenes/decorations/shop_anim.png';
import Sprite from '../js/sprite.js';
/// Player Imports
import playerIdle from '../assets/PlayerHero/Idle.png';
import playerFall from '../assets/PlayerHero/Fall.png';
import playerRun from '../assets/PlayerHero/Run.png';
import playerJump from '../assets/PlayerHero/Jump.png';
import playerAttack1 from '../assets/PlayerHero/Attack1.png';
import playerAttack2 from '../assets/PlayerHero/Attack2.png';
import playerDeath from '../assets/PlayerHero/Death.png';
import playerHit from '../assets/PlayerHero/Takehit.png';
// Enemy imports 
import enemyIdle from '../assets/EnemyHero/Sprites/Idling.png';
import enemyRun from '../assets/EnemyHero/Sprites/Running.png';
import enemyJump from '../assets/EnemyHero/Sprites/Jumping.png';
import enemyAttack1 from '../assets/EnemyHero/Sprites/Attacking1.png';
import enemyAttack2 from '../assets/EnemyHero/Sprites/Attacking2.png';
import enemyDeath from '../assets/EnemyHero/Sprites/Dying.png';
import enemyFall from '../assets/EnemyHero/Sprites/Falling.png';
import enemyHit from '../assets/EnemyHero/Sprites/Takehiting.png';



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
  attackBox: {
    offset: {
      x: 100,
      y: 25
    },
    height: 50,
    width: 160
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
      frames: 6
    },
    attack2: {
      imageSrc: playerAttack2,
      frames: 6
    },
    death: {
      imageSrc: playerDeath,
      frames: 6
    },
    fall: {
      imageSrc: playerFall,
      frames: 2
    },
    jump: {
      imageSr: playerJump,
      frames: 2
    },
    takeHit: {
      imageSrc: playerHit,
      frames: 4
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
  attackBox: {
    offset: {
      x: -170,
      y: 30
    },
    height: 50,
    width: 170
  },
  imageSrc: enemyIdle,
  frames: 4,
  scale: 2.5,
  imgOffset: {
    x: 215,
    y: 175
  },
  sprites : {
    idle : {
      imageSrc: enemyIdle,
      frames: 4
    },
    run: {
      imageSrc: enemyRun,
      frames: 8
    },
    attack1 : {
      imageSrc: enemyAttack1,
      frames: 4
    },
    attack2: {
      imageSrc: enemyAttack2,
      frames: 4
    },
    death: {
      imageSrc: enemyDeath,
      frames: 7
    },
    fall: {
      imageSrc: enemyFall,
      frames: 2
    },
    jump: {
      imageSr: enemyJump,
      frames: 2
    },
    takeHit: {
      imageSrc: enemyHit,
      frames: 3
    }
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

export const spriteNames = {
  idle: 'idle',
  run: 'run',
  jump: 'jump',
  attack1: 'attack1',
  attack2: 'attack2',
  death: 'death',
  fall: 'fall',
  takeHit: 'takeHit'
};





u.decreaseTimer();
// animation loop 
function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = 'black';
  c.fillRect(0,0, canvas.width, canvas.height);
  background.update();
  shop.update();
  enemy.update();
  player.update();


  
  // running
  if(keys.a.pressed === true && player.lastKey === 'a'){
    player.velocity.x = - player.speed;
    player.switchSprite(spriteNames.run);
  } else if ( keys.d.pressed === true && player.lastKey === 'd'){
    player.velocity.x = player.speed;
    player.switchSprite(spriteNames.run);
  } else {
    player.velocity.x = 0;
    if(player.isAttacking === false && player.isOnGround === true){
      player.switchSprite(spriteNames.idle);
    }
  }
  
  if(keys.arrowLeft.pressed === true && enemy.lastKey === 'aL'){
    enemy.velocity.x = -enemy.speed;
    enemy.switchSprite(spriteNames.run);
  }else if (keys.arrowRight.pressed === true && enemy.lastKey === 'aR'){
    enemy.velocity.x = enemy.speed;
    enemy.switchSprite(spriteNames.run);
  } else {
    enemy.velocity.x = 0;
    if(enemy.isAttacking === false && enemy.isOnGround === true){
      enemy.switchSprite(spriteNames.idle);
    }
  }
  
  // detect collision when attacking
  if (u.rectangleCollisionCheck({
    rectangle1: player,
    rectangle2: enemy
  }) && player.currentFrame === 4){
    enemy.takeHit(player.damage);
    let currentHealthE = enemy.getCurrentHealthFraction(player.damage) * 100;
    document.querySelector("#enemy-health").style.width =  `${currentHealthE}%`;
   
  }
  
  if(player.isAttacking && player.currentFrame >= 4){
    player.isAttacking = false;
  }
  
  if(u.rectangleCollisionCheck({
    rectangle1: enemy,
    rectangle2: player
  }) && enemy.currentFrame === 2){
    
    player.takeHit(enemy.damage);
    let currentHealthP = player.getCurrentHealthFraction(enemy.damage) * 100;
    document.querySelector("#player-health").style.width = `${currentHealthP}%`;
  } 
  
  if(enemy.isAttacking && enemy.currentFrame >= 2){
    enemy.isAttacking = false;
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





