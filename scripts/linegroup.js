/*jshint esversion: 6 */


function LineGroup(x,y) {
  this.x1 = x;
  this.y1 = y;
  this.headX = canW/2;
  this.headY = canH/2;
  this.lineW = 2;
  this.lineCol = randColor('rgba');
  this.boxCol = randColor('rgba');
  this.colorTimer = 1800;
  this.colorTimerLastUpdate = undefined;

  this.init = function() {
    this.getNewHeadCoords();
    this.colorTimerLastUpdate = performance.now();
    // console.log('this = ', this);
  };

  this.draw = function() {
    // ctx.save();
    // ctx.translate(this.x1,this.y1);
    ctx.beginPath();
    ctx.lineWidth = this.lineW;
    ctx.strokeStyle = this.lineCol;
    // ctx.fillStyle = this.boxCol;
    ctx.moveTo(this.x1,this.y1);
    ctx.lineTo(this.headX,this.headY);
    // ctx.fillRect(this.x1-2,this.y1-2,4,4);
    ctx.stroke();
    // ctx.restore();
  };

  this.getNewHeadCoords = function() {
    let xVec = (randSign() * getRandomIntInclusive(0,6));
    let yVec = (randSign() * getRandomIntInclusive(0,6));
    let x = this.headX;
    let y = this.headY;

    if ( (x + xVec) > canW ) {
      this.headX = ( canW - Math.abs(xVec) );
      // console.log('right HIT'+" - this.headX = "+this.headX+"  x = "+x+"  xVec = "+xVec);
    } else if  ( (x + xVec) < 0 ) {
      this.headX = ( x + Math.abs(xVec) );
      // console.log('left HIT'+" - this.headX = "+this.headX+"  x = "+x+"  xVec = "+xVec);
    } else {
      this.headX = ( x + xVec );
    }

    if ( (y + yVec) > canH ) {
      this.headY = ( canH - Math.abs(yVec) );
      // console.log('bot HIT'+" - this.headY = "+this.headY+"  y = "+y+"  yVec = "+yVec);
    } else if ( (y + yVec) < 0 ) {
      this.headY = ( y + Math.abs(yVec) );
      // console.log('top HIT'+" - this.headY = "+this.headY+"  y = "+y+"  yVec = "+yVec);
    } else {
      this.headY = ( y + yVec );
    }

  };

  this.update = function() {
    let oldX2 = this.headX;
    let oldY2 = this.headY;
    this.x1 = oldX2;
    this.y1 = oldY2;
    this.getNewHeadCoords();
    this.draw();
  };

}
