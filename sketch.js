/* The Essential Vitamin / essentiVit branding generator */

let canv, col, col2, col3, col4, dec1, dec2, pos, n, size;
let factor, largest, r1, g1, b1, sF, seed;
let seedInput, saveButton, generateButton;

function preload() {
  table = loadTable("colors.csv", "csv", "header");
}

function setup() {
  // Create the canvas for PNG generation
  canv = createCanvas(2000, 2500);

  // Generate or use entered seed
  if (!seedInput || seedInput.value() === "") {
    let date = new Date();
    seed = date.getTime(); // Generate seed based on current time if none provided
  } else {
    seed = int(seedInput.value()); // Use manually entered seed
  }

  randomSeed(seed);
  noiseSeed(seed);
  factor = 0;

  let numb = floor(random(3, 20));
  size = width / numb;
  largest = floor(random(1, 10));
  alph = random(120, 220);
  if (random(15) < 1) {
    alph = 255;
  }
  noStroke();

  // UI elements
  createUI();

  noLoop();
  draw();
}

function createUI() {
  // Remove any existing buttons or UI elements
  let existingElements = selectAll("input, button, label");
  existingElements.forEach(el => el.remove());

  // Seed input
  let seedLabel = createElement("label", "Seed: ");
  seedLabel.position(10, 10);
  seedInput = createInput(seed ? seed.toString() : "");
  seedInput.position(60, 10);

  // Generate Button
  generateButton = createButton("Generate");
  generateButton.position(250, 10);
  generateButton.mousePressed(() => {
    setup(); // Regenerate the canvas and the pattern
  });

  // Save Button
  saveButton = createButton("Save PNG");
  saveButton.position(350, 10);
  saveButton.mousePressed(() => saveArt()); // Save the canvas as PNG
}

function draw() {
  palette1 = floor(random(2));
  palette2 = floor(random(2));
  r0 = (int(table.get(palette1, 0)) + int(table.get(palette2, 0))) / 2;
  g0 = (int(table.get(palette1, 1)) + int(table.get(palette2, 1))) / 2;
  b0 = (int(table.get(palette1, 2)) + int(table.get(palette2, 2))) / 2;
  background(r0, g0, b0);
  drawShapes();
}

function drawShapes() {
  let rez = random(0.003, 0.01);
  factor += 1000;
  sF = 360 / random(2, 40);
  for (i = width; i > -size * largest; i -= size) {
    for (j = height; j > -size * largest; j -= size) {
      let n1 = noise(i * rez + factor, j * rez + factor);
      let n2 = noise(i * rez + factor + 10000, j * rez + factor + 10000);
      let n3 = noise(i * rez + factor + 20000, j * rez + factor + 20000);
      let col3;
      let col1 = map(n1, 0, 1, 0, 360);
      let col2 = map(n2, 0, 1, 0, 360);
      let dec1 = fract(col1 / sF);
      let dec2 = fract(col2 / sF);
      if (dec1 < 0.2) {
        col3 = 0;
      } else if (dec1 < 0.4) {
        col3 = 1;
      } else if (dec1 < 0.6) {
        col3 = 2;
      } else if (dec1 < 0.8) {
        col3 = 3;
      } else {
        col3 = 4;
      }
      if (dec2 < 0.2) {
        col4 = 0;
      } else if (dec2 < 0.4) {
        col4 = 1;
      } else if (dec2 < 0.6) {
        col4 = 2;
      } else if (dec2 < 0.8) {
        col4 = 3;
      } else {
        col4 = 4;
      }
      r1 = table.get(palette1, col3 * 3);
      g1 = table.get(palette1, col3 * 3 + 1);
      b1 = table.get(palette1, col3 * 3 + 2);
      r2 = table.get(palette2, col4 * 3);
      g2 = table.get(palette2, col4 * 3 + 1);
      b2 = table.get(palette2, col4 * 3 + 2);
      let size2 = size * floor(random(1, largest));
      if (n3 < 0.25) {
        fill(r1, g1, b1, alph);
        triangle(i, j, i + size2, j + size2, i, j + size2);
        fill(r2, g2, b2, alph);
        triangle(i, j, i + size2, j + size2, i + size2, j);
      } else if (n3 < 0.5) {
        fill(r1, g1, b1, alph);
        triangle(i + size2, j, i + size2, j + size2, i, j + size2);
        fill(r2, g2, b2, alph);
        triangle(i, j + size2, i, j, i + size2, j);
      } else if (n3 < 0.75) {
        fill(r1, g1, b1, alph);
        triangle(i, j, i + size2, j + size2, i + size2, j);
        fill(r2, g2, b2, alph);
        triangle(i, j, i + size2, j + size2, i, j + size2);
      } else {
        fill(r1, g1, b1, alph);
        triangle(i, j + size2, i, j, i + size2, j);
        fill(r2, g2, b2, alph);
        triangle(i + size2, j, i + size2, j + size2, i, j + size2);
      }
    }
  }
}

function saveArt() {
  saveCanvas(canv, seed + "_p1_" + palette1 + "_p2_" + palette2, "png");
}
