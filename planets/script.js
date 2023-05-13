const canvas = document.getElementById("canvas-physics");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let planetsArray = [];
const numberOfParticls = 6;

let surface = document.getElementById("planet-names");
let surfaceMeasurements = surface.getBoundingClientRect();
let surfaceObject = {
  x: surfaceMeasurements.left,
  y: surfaceMeasurements.top,
  width: surfaceMeasurements.width,
  height: 10,
};

let bouncingObject = {
  start: surfaceMeasurements.left + 30,
  distance: 98,
};

class Particle {
  constructor(x, y, startWeight, bouncingWeight, color) {
    this.x = x;
    this.y = y;
    this.size = 25;
    this.weight = startWeight;
    this.directionX = 1;
    this.bounceTimes = 0;
    this.stopUpdating = false;
    this.bouncingWeight = bouncingWeight;
    this.color = color;
  }
  update() {
    console.log(this.y, surfaceObject.y);
    if (this.bounceTimes >= 5) {
      // stop bouncing and set position to title
      this.y = surfaceObject.y - 13;
      this.weight = 0;
      this.stopUpdating = true;
    } else {
      // how fast it falls
      this.weight += 0.1;
      this.y += this.weight;

      if (
        this.x < surfaceObject.x + surfaceObject.width &&
        this.x + this.size > surfaceObject.x &&
        this.y < surfaceObject.y + surfaceObject.height &&
        this.y + this.size > surfaceObject.y &&
        this.bounceTimes < 5
      ) {
        this.y -= 1;
        console.log(this.bouncingWeight);
        this.weight *= -this.bouncingWeight;
        this.bounceTimes += 1;
      }
    }
  }

  draw() {
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
    context.fill();
    context.closePath();
  }
}

function init() {
  planetsArray = [];
  for (let i = 0; i < numberOfParticls; i++) {
    const x = bouncingObject.start + bouncingObject.distance * i;

    let weight = 0;
    let bouncingWeight = 0;
    let color = "";

    switch (i) {
      case 0:
        weight = 0.75;
        color = "grey";
        bouncingWeight = 0.15;
        break;
      case 1:
        weight = 1.25;
        color = "brown";
        bouncingWeight = 0.3;
        break;
      case 2:
        weight = 1.45;
        color = "blue";
        bouncingWeight = 0.375;
        break;
      case 3:
        weight = 3.25;
        color = "orange";
        bouncingWeight = 0.1125;
        break;
      case 4:
        weight = 1.65;
        color = "Almond";
        bouncingWeight = 0.4;
        break;
      case 5:
        weight = 1.25;
        color = "LightBlue";
        bouncingWeight = 0.3;
        break;
      default:
        weight = 1.25;
        color = "LightBlue";
        bouncingWeight = 0.3;
        break;
    }

    const y = canvas.height / 6;

    planetsArray.push(new Particle(x, y, weight, bouncingWeight, color));
  }
}
init();
function animate() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "rgba(255, 255, 255, 1)";
  context.fillRect(0, 0, canvas.height, canvas.width);
  for (let i = 0; i < planetsArray.length; i++) {
    if (!planetsArray[i].stopUpdating) {
      planetsArray[i].update();
    }
    planetsArray[i].draw();
  }

  requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  surfaceMeasurements = surface.getBoundingClientRect();
  surfaceObject = {
    x: surfaceMeasurements.left,
    y: surfaceMeasurements.top,
    width: surfaceMeasurements.width,
    height: 10,
  };
  bouncingObject = {
    x: surfaceMeasurements.left,
    distance: 70,
  };
  console.log(surfaceObject.width);
  init();
});
