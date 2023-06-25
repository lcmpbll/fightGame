import Sprite from './biz-func.js';
// import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.css';


const canvas = document.querySelector('canvas');
export const c = canvas.getContext('2d');
//canvas apppearance
canvas.width = 1024;
canvas.height = 524;
//(x,y)

c.fillRect(0,0,canvas.width, canvas.height);


// animation loop 
function animate() {
  window.requestAnimationFrame(animate)
 
}

animate()

// Player and Enemy
// could add width and height
const player = new Sprite({
  x: 0,
  y: 0, 
  
}, 'red');


player.draw();


const enemy = new Sprite({
  x: 950,
  y: 0,
},
 'blue');
enemy.draw();
console.log(player);

