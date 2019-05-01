/*jshint esversion: 6 */


function Box(x,y,color,size,vel) {
  this.x = x;
  this.y = y;
  this.color = color;
  this.size =  size;
  this.xVel = vel;
  this.yVel = vel;
  this.lastColorTime = undefined;
  this.colorChangeTimer = 2000;
  this.leftBound = 0;
  this.rightBound = 122;
  this.upBound = 0;
  this.downBound = 100;

  this.init = function() {
    this.lastColorTime = performance.now();
  };

  this.draw = function() {
    ctx.beginPath();
    ctx.rect(this.x,this.y,this.size,this.size);
    ctx.fillStyle = this.color;
    ctx.fill();
    // ctx.stroke();
  };

  this.update = function() {
    if ((this.xVel > 0) && ((this.x + this.size + this.xVel) > this.rightBound)) {
      this.xVel *= -1;
    }
    if ((this.xVel < 0) && ((this.x + this.xVel) < this.leftBound)) {
      this.xVel *= -1;
    }
    if ((this.yVel > 0) && ((this.y + this.size + this.yVel) > this.downBound)) {
      this.yVel *= -1;
    }
    if ((this.yVel < 0) && ((this.y + this.yVel) < this.upBound)) {
      this.yVel *= -1;
    }
    this.x += this.xVel;
    this.y += this.yVel;
    if ((performance.now() - this.lastColorTime) > this.colorChangeTimer ) {
      this.color = randColor('rgba');
      this.lastColorTime = performance.now();
    }
  };

} // end box
