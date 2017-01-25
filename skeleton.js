function rotatePoint(pX, pY, cX, cY, rot) {
  const x = cX + (pX-cX)*Math.cos(rot) - (pY-cY)*Math.sin(rot);
  const y = cY + (pX-cX)*Math.sin(rot) + (pY-cY)*Math.cos(rot);
  return {
    x: x,
    y: y
  };
}

function getTri(x,y,size,rot) {
  const angles = [0,(2/3*Math.PI),(4/3*Math.PI)]
  const r = size/2;
  let points = {};
  let _x,_y,_calc;
  for (let i = 0; i < angles.length; i++) {
    _x = r*cos(angles[i]) + x;
    _y = r*sin(angles[i]) + y;
    _calc = rotatePoint(_x, _y, x, y, rot);
    points['x'+(i+1)] = _calc.x;
    points['y'+(i+1)] = _calc.y;
  }
  return points;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(RGB, 120);
  textFont("Monospace");
  textSize(12);
  background(0,0,0,120);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  colorMode(RGB, 120);
  background(0,0,0,120);
}

function draw() {
  background(0,0,0,5);
  stroke(255, 120)
  fill(255, 0);
  let _tri = getTri(
    windowWidth/2,
    windowHeight/2,
    sin(radians(frameCount))*250,
    (radians(frameCount)*2)
  );
  triangle(_tri.x1, _tri.y1,
           _tri.x2, _tri.y2,
           _tri.x3, _tri.y3);
  let _tri2 = getTri(
    windowWidth/2,
    windowHeight/2,
    sin(radians(frameCount-120))*500,
    (radians(frameCount-50)*2)
  );
  triangle(_tri2.x1, _tri2.y1,
           _tri2.x2, _tri2.y2,
           _tri2.x3, _tri2.y3);
  let _tri3 = getTri(
    windowWidth/2,
    windowHeight/2,
    sin(radians(frameCount-240))*1000,
    (radians(frameCount-100)*2)
  );
  triangle(_tri3.x1, _tri3.y1,
           _tri3.x2, _tri3.y2,
           _tri3.x3, _tri3.y3);
}

