

let gameId;
let timer = 60;
let timerId;

export function decreaseTimer () {
  
  if(timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000);
    timer -=1;
    document.querySelector("#timer").innerHTML = timer;
  }
  // if(timer === 0 ){
  //   checkWhoWon({player, enemy, timerId});
  // }
}



export function rectangleCollisionCheck ({rectangle1, rectangle2}) {
  if(rectangle2.isAttacking === false || rectangle1.isAttacking === false){
    if(rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x && 
      rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width && 
      rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
      rectangle1.attackBox.position.y  <= rectangle2.position.y + rectangle2.height && rectangle1.isAttacking ){
     

      return true;
    }
    
  } else {
    if(rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x && 
      rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width && 
      rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
      rectangle1.attackBox.position.y  <= rectangle2.position.y + rectangle2.height && rectangle1.isAttacking &&
      rectangle1.attackBox.position.x <= rectangle2.attackBox.position.x === false && 
      rectangle1.attackBox.position.x- rectangle1.attackBox.width > rectangle2.attackBox.position.x + rectangle2.attackBox.width === false){
      
      
      return true;
    } else {
      
      return false;
    }
  }
}

export function resetGame ({player, enemy}){
  player.reset({
    position : {
      x: 0,
      y: 0
    }, 
    velocity: {
      x: 0,
      y: 0
    },
    lastKey: '',
    dead: false
    
  });
  enemy.reset({
    position : {
      x: 950,
      y: 0 
    },
    velocity: {
      x: 0,
      y: 0
    },
    lastKey: '',
    dead: false,
    
  });
  timer = 60;
  clearTimeout(gameId);
  
  document.querySelector('#display-text').style.display = 'none';
  
}



export function checkWhoWon({player, enemy}) {
  clearTimeout(timerId);
  document.querySelector('#display-text').style.display = 'flex';
  if(player.health.currentHealth === enemy.health.currentHealth){
    document.querySelector('#display-text').innerHTML = "Tie";
    
  } else if ( player.health.currentHealth > enemy.health.currentHealth){
    document.querySelector('#display-text').innerHTML = "Player 1 Wins";
    player.recordWin();
    enemy.switchSprite('death');
  } else {
    document.querySelector('#display-text').innerHTML = "Player 2 Wins";
    enemy.recordWin();
    player.switchSprite('death');
  }
  // gameId = setTimeout(resetGame, 1000);
 
}



