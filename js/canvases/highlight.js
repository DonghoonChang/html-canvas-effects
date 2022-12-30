
let canvasName = 'highlight';
let canvas = document.getElementById(canvasName);
let ctx = null;

const settings = {
  canvasBackgroundColor: 'grey',
  highlightColor: 'yellow'
}

const canvasDimension = {
  width: undefined,
  height: undefined
}

const mouse = {
  x: undefined,
  y: undefined,
}

function init(){
  ctx = canvas?.getContext('2d');
  if(!ctx){
    return false;
  }

  ctx.fillStyle = settings.canvasBackgroundColor;
  ctx.strokeStyle = 'red';
  ctx.lineWidth = 5;

  initCanvasSize();
  addEventListeners();


  return true;
}

function addEventListeners(){
  window.addEventListener('resize', function() {
    initCanvasSize();
  })

  canvas.addEventListener('click', function(event){

    mouse.x = event.x;
    mouse.y = event.y;

    drawHighlight();
  })

  canvas.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;

    drawHighlight();
  })
}

function initCanvasSize(){
  canvasDimension.width = window.innerWidth;
  canvasDimension.height = window.innerHeight;

  canvas.width = canvasDimension.width;
  canvas.height = canvasDimension.height;
}

function drawHighlight() {
  ctx.fillStyle = settings.highlightColor;
  ctx.beginPath();
  ctx.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2);
  ctx.fill();
}

function animate() {
  const { width, height } = canvasDimension;
  ctx.clearRect(0, 0, width, height);
  drawHighlight();
  requestAnimationFrame(animate);
}

function start(){
  if(init()){
    animate();
  };
}

start();
