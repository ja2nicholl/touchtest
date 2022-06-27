let canvas;
let ctx;
let lastPoint = {};

function onPointerMove(ev) {
  if (lastPoint[ev.pointerId]) {
    ctx.beginPath();
    ctx.moveTo(lastPoint[ev.pointerId].x, lastPoint[ev.pointerId].y);
    ctx.lineTo(ev.offsetX, ev.offsetY);
    ctx.stroke();
  }
  lastPoint[ev.pointerId] = {x: ev.offsetX, y: ev.offsetY};
}

function setup() {
  canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  ctx = canvas.getContext('2d');
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'blue';

  canvas.addEventListener('pointerdown', (ev) => {
    canvas.setPointerCapture(ev.pointerId);
    lastPoint[ev.pointerId] = {x: ev.offsetX, y: ev.offsetY};
    canvas.addEventListener('pointermove', onPointerMove);
  });
  canvas.addEventListener('pointerup', (ev) => {
    if (lastPoint[ev.pointerId]) {
      ctx.beginPath();
      ctx.moveTo(lastPoint[ev.pointerId].x, lastPoint[ev.pointerId].y);
      ctx.lineTo(ev.offsetX, ev.offsetY);
      ctx.stroke();
      delete lastPoint[ev.pointerId];
    }
    if (Object.keys(lastPoint).length === 0) {
      canvas.removeEventListener('pointermove', onPointerMove);
    }
  });
  canvas.addEventListener('pointercancel', (ev) => {
    canvas.removeEventListener('pointermove', onPointerMove);
  });
}

setup();