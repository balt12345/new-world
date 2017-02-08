var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;
var centerX = innerWidth / 2;
var centerY = innerHeight / 2;

var maxHeight = innerWidth/3;
var triCount = 50;
var zDepth = 2, rFactor = 1, moving = 1;
var mouseX = 0, mouseY = 0;

window.addEventListener('resize', function(){
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  centerX = innerWidth / 2;
  centerY = innerHeight / 2;
  
  for (var m = 0; m < pyramids.length; m++) {
    pyramids[m].update();
  }
})

function Triangle(x) {
  this.factor = x/triCount;
  this.height = maxHeight * this.factor;
  this.base = this.height * (2/3);
  this.rotation = 0;
  this.rSpeed = this.factor / this.triCount;
  this.x = centerX;
  this.y = centerY - this.height/2;
  this.z = zDepth + this.factor;
  
  this.basePoints = {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
    x3: 0,
    y3: 0
  };
  
  this.reflectGrad = ctx.createRadialGradient(this.x, this.y + this.height / this.z, 0, this.x, this.y + this.height / this.z, this.height * (this.z / zDepth));
  this.reflectGrad.addColorStop(0, '#111');
  this.reflectGrad.addColorStop(0.1, '#888');
  this.reflectGrad.addColorStop(0.11, '#fff');
  this.reflectGrad.addColorStop(0.3, '#444');
  this.reflectGrad.addColorStop(0.45, '#222');
  this.reflectGrad.addColorStop(0.6, '#efefef');
  this.reflectGrad.addColorStop(0.7, '#444');
  this.reflectGrad.addColorStop(0.8, '#fff');
}

Triangle.prototype.rotate = function() {
  if (this.rotation + this.rSpeed * rFactor > 2) {
    this.rotation = 0;
  } else if (this.rotation + this.rSpeed * rFactor < 0) {
    this.rotation = 2;
  }
  this.rotation += 0.015 * rFactor * this.factor;
  
  for (var i = 1; i < 4; i++) {
    this.basePoints['x' + i] = this.x + Math.cos(Math.PI * this.rotation + (6 * i / 3)) * this.base;
    this.basePoints['y' + i] = this.y + this.height + Math.sin(Math.PI * this.rotation + (6 * i / 3)) * this.base / this.z;
  }
  
  this.x = centerX;
  this.y = centerY - this.height/2 - (zDepth * mouseY/innerHeight);
  this.z = zDepth + this.factor;
};

Triangle.prototype.draw = function() {
  ctx.strokeStyle = this.reflectGrad;
  ctx.beginPath();
  for (var j = 1; j < 4; j++) {
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.basePoints['x' + j], this.basePoints['y' + j]);
    ctx.stroke();
    if (j < 3) { 
      ctx.moveTo(this.basePoints['x' + j], this.basePoints['y' + j]);
      ctx.lineTo(this.basePoints['x' + (j + 1)], this.basePoints['y' + (j + 1)]);
      ctx.stroke();
    } else {
      ctx.moveTo(this.basePoints['x' + j], this.basePoints['y' + j]);
      ctx.lineTo(this.basePoints.x1, this.basePoints.y1) ;
      ctx.stroke();
    }
  }
};

Triangle.prototype.update = function(){
  this.x = centerX;
  this.y = centerY - this.height/2 - (zDepth * mouseY/innerHeight);
  this.z = zDepth + this.factor;
  
  this.reflectGrad = ctx.createRadialGradient(this.x, this.y + this.height / this.z, 0, this.x, this.y + this.height / this.z, this.height * (this.z / zDepth));
  this.reflectGrad.addColorStop(0, '#111');
  this.reflectGrad.addColorStop(0.1, '#888');
  this.reflectGrad.addColorStop(0.11, '#fff');
  this.reflectGrad.addColorStop(0.3, '#444');
  this.reflectGrad.addColorStop(0.45, '#222');
  this.reflectGrad.addColorStop(0.6, '#efefef');
  this.reflectGrad.addColorStop(0.7, '#444');
  this.reflectGrad.addColorStop(0.8, '#fff');
};

var pyramids = [];

for (var k = 0; k < triCount; k++) {
  pyramids.push(new Triangle(k));
}

document.addEventListener('mousemove', function(e){
  mouseX = e.clientX;
  mouseY = e.clientY;
  rFactor = Math.round(mouseX - innerWidth/2) / Math.round(innerWidth / 2);
  zDepth = 0.5 + (20 * mouseY / innerHeight);
})

document.addEventListener('click', function(e){
  moving ? moving = 0 : moving = 1;
})

function animate() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  
  for (var l = 0; l < pyramids.length; l++) {
    if (moving) { pyramids[l].rotate(); }
    pyramids[l].draw();
  }
  
  window.requestAnimationFrame(animate);
}

animate();
