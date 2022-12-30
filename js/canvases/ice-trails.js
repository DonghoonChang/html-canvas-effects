let canvasName = 'ice-trails';
let canvas = document.getElementById(canvasName);
let ctx = null;
let particlesCanBeCreated = true;
let particleTimer = null;
let particlesArray = [];

const canvasDimension = {
  width: undefined,
  height: undefined
}

const settings = {
  particleColor: 'rgba(219, 241, 253, 0.1)',
  particleSizeChange: 0.3,
  particleMaxSize: 20,
  particleQuantity: 20,
  particleCoolTimeInMilliseconds: 50,
}

function init(){
  ctx = canvas?.getContext('2d');
  if(!ctx){
    return false;
  }

  initCanvasSize();
  addEventListeners();

  return true;
}

function startParticleTimeout(){
  particleTimer = setTimeout(function(){
    particlesCanBeCreated = true;
    particleTimer = null;

  }, settings.particleCoolTimeInMilliseconds);
}

function initCanvasSize(){
  canvasDimension.width = window.innerWidth;
  canvasDimension.height = window.innerHeight;

  canvas.width = canvasDimension.width;
  canvas.height = canvasDimension.height;
}

function addEventListeners(){
  window.addEventListener('resize', function() {
    initCanvasSize();
  })


  window.addEventListener('mousemove', function(event){
    if(!particlesCanBeCreated){
      return;
    }

    createParticles(event.x, event.y);
  });
}

class Particle {
  constructor(x, y){
    const { particleMaxSize } = settings;

    this.x = x;
    this.y = y;
    this.size = Math.random() * particleMaxSize;
    this.speedX = Math.random() * 5 - 1.5;
    this.speedY = Math.random() * 5 - 1.5;
  }

  update(){
    this.x += this.speedX;
    this.y += this.speedY;
    this.size += -1 * settings.particleSizeChange;
  }

  draw(){
    let transparency = Math.min(1, settings.particleMaxSize / (this.size * 7));
    ctx.fillStyle = `rgba(219, 241, 253, ${transparency})`;
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.strokeWidth = 0.5;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
}

function createParticles(x, y){
  let array = [];
  for (let i = 0; i < settings.particleQuantity; i++){
    array.push(new Particle(x, y));
  }

  particlesArray.push(array);
  particlesCanBeCreated = false;

  startParticleTimeout();
}

function animate(){
  // ctx.fillStyle = 'rgba(0, 0, 0, 0.002)';
  // ctx.fillRect(0, 0, canvasDimension.width, canvasDimension.height);
  // ctx.clearRect(0, 0, canvasDimension.width, canvasDimension.height);

  particlesArray.forEach(handleParticleArray);
  requestAnimationFrame(animate);
}

function handleParticleArray(array){
  for (let i = 0; i < array.length; i++){
    let particle = array[i];

    if(particle.size < 0){
      array.splice(i, 1);
      i--;
      continue;
    }

    particle.draw();
    particle.update();
  }
}

export default function start(){
  if(!init()){
    return;
  }

  animate();
}

start();
