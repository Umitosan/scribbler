/*jshint esversion: 6 */


function Game(updateDur) {
  this.timeGap = 0;
  this.lastUpdate = 0;
  this.lastDirKeyX = undefined;
  this.lastDirKeyY = undefined;
  this.updateDuration = updateDur; // milliseconds duration between update()
  this.paused = false;
  this.bg = new Image();
  this.boxy = undefined;
  this.pausedTxt = undefined;
  this.mode = 'init';
  this.lineGroup1 = undefined;
  this.updateSpeed = 100;

  this.init = function() {
    this.bg.src = 'bg1.png';
    this.boxy = new Box(20,20,myColors.red,10,1);
    this.boxy.init();
    this.lineGroup1 = new LineGroup(canW/2,canH/2);
    this.lineGroup1.init();
    this.lastUpdate = performance.now();
  };

  this.pauseIt = function() {
    myGame.paused = true;
    // this.pausedTxt.show = true;
  };
  this.unpauseIt = function() {
    myGame.paused = false;
    // this.pausedTxt.show = false;
    // this prevents pac from updating many times after UNpausing
    this.lastUpdate = performance.now();
    this.timeGap = 0;
  };

  this.drawBG = function() { // display background over canvas
    ctx.imageSmoothingEnabled = false;  // turns off AntiAliasing
    ctx.drawImage(this.bg,0,0,CANVAS.width,CANVAS.height);
  };

  this.draw = function() {  // draw everything!
    this.boxy.draw();
    // this.lineGroup1.draw();
  }; // end draw

  this.update = function() {
      if (this.paused === false) { // performance based update: myGame.update() runs every myGame.updateDuration milliseconds
            this.timeGap = performance.now() - this.lastUpdate;

            if ( this.timeGap >= this.updateDuration ) { // this update is restricted to updateDuration
              let timesToUpdate = this.timeGap / this.updateDuration;
              for (let i=1; i < timesToUpdate; i++) { // update children objects
                // if (timesToUpdate > 2) {
                //   console.log('timesToUpdate = ', timesToUpdate);
                // }
                // general update area
                for (let k = 0; k < this.updateSpeed; k++) {
                  this.lineGroup1.update();
                }
                // console.log('performance.now() - this.lineGroup1.colorTimerLastUpdate) = ', ( performance.now() - this.lineGroup1.colorTimerLastUpdate) );
                if ( (performance.now() - this.lineGroup1.colorTimerLastUpdate) > this.lineGroup1.colorTimer) {
                  // console.log('color change');
                  this.lineGroup1.colorTimerLastUpdate = performance.now();
                  this.lineGroup1.lineCol = randColor('rgba');
                  this.lineGroup1.boxCol = randColor('rgba');
                  // this.lineGroup1.lineW = getRandomIntInclusive(1,3);
                }
                this.boxy.update();
              }
              this.lastUpdate = performance.now();
            } // end if

            // if (this.mode === "draw") { // run this every update cycle regardless of timing
            //   // general draw area
            // } else {
            //   // mode is none
            // }

      } else if (this.paused === true) {
        // PAUSED! do nothin
      } else {
        console.log('game pause issue');
      }

  }; // end update

} // end myGame
