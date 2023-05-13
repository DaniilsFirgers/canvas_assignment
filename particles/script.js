const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];
let hue = 0;

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const mouse = {
  x: undefined,
  y: undefined,
};

canvas.addEventListener("click", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
  for (let i = 0; i < 10; i++) {
    planetsArray.push(new Particle());
  }
});

canvas.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
  for (let i = 0; i < 2; i++) {
    planetsArray.push(new Particle());
  }
});

class Particle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;

    this.size = Math.random() * 15 + 1;
    this.speedX = Math.random() * -1.5;
    this.speedY = Math.random() * -1.5;
    this.color = `hsl(${hue}, 100%, 50%)`;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.1;
  }

  draw() {
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    context.fill();
  }
}

// function init() {
//   for (let i = 0; i < 100; i++) {
//     particlesArray.push(new Particle());
//   }
// }
// init();

function handleParticles() {
  for (let i = 0; i < planetsArray.length; i++) {
    planetsArray[i].update();
    planetsArray[i].draw();

    for (let j = i; j < planetsArray.length; j++) {
      const dx = planetsArray[i].x - planetsArray[j].x;
      const dy = planetsArray[i].y - planetsArray[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 100) {
        context.beginPath();
        context.strokeStyle = planetsArray[i].color;
        context.lineWidth = planetsArray[i].size;
        context.moveTo(planetsArray[i].x, planetsArray[i].y);
        context.lineTo(planetsArray[j].x, planetsArray[j].y);
        context.stroke();
      }
    }
    if (planetsArray[i] <= 0.3) {
      planetsArray.splice(i, 1);
      i--;
    }
  }
}
console.log(planetsArray);
function animate() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  //   context.fillStyle = "rgba(0,0,0,0.02)";
  //   context.fillRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  hue += 2;
  requestAnimationFrame(animate);
}
animate();
