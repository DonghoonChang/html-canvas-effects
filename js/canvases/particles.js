let canvasName = 'particles';
let canvas = document.getElementById(canvasName);
let ctx = null;
let particlesArray = [];

const canvasDimension = {
  width: undefined,
  height: undefined
}

const settings = {
  particleColor: 'white',
  particleSizeChange: 0.5,
  particleMaxSize: 30,
}

function init(){
  ctx = canvas?.getContext('2d');
  if(!ctx){
    return false;
  }

  // Init Animation
  initCanvasSize();
  createParticles();

  window.addEventListener('resize', function() {
    initCanvasSize();
  })

  return true;
}

function initCanvasSize(){
  canvasDimension.width = window.innerWidth;
  canvasDimension.height = window.innerHeight;

  canvas.width = canvasDimension.width;
  canvas.height = canvasDimension.height;
}

class Particle {
  constructor(){
    const { particleMaxSize } = settings;

    this.x = Math.random() * canvasDimension.width;
    this.y = Math.random() * canvasDimension.height;
    this.initSize = Math.random() * particleMaxSize + 1
    this.size = this.initSize;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.sizeDecreasing = true;
  }

  update(){
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.size < 0){
      this.sizeDecreasing = false;
    }

    if(this.size > this.initSize){
      this.sizeDecreasing = true;
    }

    this.size += (this.sizeDecreasing ? -1 : 1) * settings.particleSizeChange;
  }

  draw(){
    ctx.fillStyle = settings.particleColor;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size < 0 ? 0 : this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function createParticles(){
  for (let i = 0; i < 100; i++){
    particlesArray.push(new Particle());
  }
}

function animate(){
  const { width, height } = canvasDimension;
  ctx.clearRect(0, 0, width, height);

  particlesArray.forEach(e => {
    e.update();
    e.draw();
  });

  requestAnimationFrame(animate);
}

export default function start(){
  if(init()){
    animate();
  }
}

start();
