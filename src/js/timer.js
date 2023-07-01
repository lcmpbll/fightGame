class Timer {
  constructor({seconds = 60}){
    this.seconds = seconds,
    this.timeUp = false;
    this.running = true;
    this.timerId;
  }
  
  decreaseTimer(){
    if(this.seconds > 0 && this.timeUp === false){
      this.timerId = setTimeout(this.decreaseTimer, 1000);
      this.seconds -=1;
      
    } else if(this.seconds <= 0) {
      clearTimeout(this.timerId);
      this.timeUp = true;
    }
  }
  
  resetTime() {
    this.seconds = 60;
  }
  
  
}


export default Timer;