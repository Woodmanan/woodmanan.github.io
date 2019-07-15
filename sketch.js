function setup() {
  createCanvas(displayWidth, 800);
}

function draw() {
  background(0);
  if (mouseIsPressed) {
    fill(0);
  } else {
    fill(255);
  }
  ellipse(mouseX, mouseY, 80, 80);
}