import Sprite from './sprite.js';
// import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.css';


export const canvas = document.querySelector('canvas');
export const c = canvas.getContext('2d');
//canvas apppearance
canvas.width = 1024;
canvas.height = 524;
//(x,y)

c.fillRect(0,0,canvas.width, canvas.height);


// Player and Enemy
// could add width and height
const player = new Sprite({
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
  
});





const enemy = new Sprite({
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


// animation loop 
function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = 'black';
  c.fillRect(0,0, canvas.width, canvas.height);
  player.update();
  enemy.update();
  
  if(keys.a.pressed === true && player.lastKey === 'a'){
    player.velocity.x = - player.speed;
  } else if ( keys.d.pressed === true && player.lastKey === 'd'){
    player.velocity.x = player.speed;
  } else {
    player.velocity.x = 0;
  }
  
  if(keys.arrowLeft.pressed === true && enemy.lastKey === 'aL'){
    enemy.velocity.x = -enemy.speed;
  }else if (keys.arrowRight.pressed === true && enemy.lastKey === 'aR'){
    enemy.velocity.x = enemy.speed;
  } else enemy.velocity.x = 0;
  
}

animate();


window.addEventListener('keydown', (event) =>{
  console.log(event.key);
  switch (event.key) {
  case 'd':
    keys.d.pressed = true;
    player.lastKey = 'd';
    break;
  case 'a':
    keys.a.pressed = true;
    player.lastKey  = 'a';
    break;
  case 'w':
    player.jump();
    break;
  case 's': 
    player.duck();
    break;
  case 'ArrowRight':
    keys.arrowRight.pressed = true;
    enemy.lastKey = 'aR';
    break;
  case 'ArrowLeft': 
    keys.arrowLeft.pressed = true;
    enemy.lastKey = 'aL';
    break;
  case 'ArrowUp': 
    enemy.jump();
    break;
  case 'ArrowDown':
    enemy.duck();
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
  case 'ArrowLeft':
    keys.arrowLeft.pressed = false;
    break;
  case 'ArrowRight':
    keys.arrowRight.pressed = false;
    break;
  case 'ArrowDown': 
    enemy.stand();
    break;
  }
});



console.log(player);

