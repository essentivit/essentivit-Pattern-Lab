/* The Essential Vitamin / essentiVit branding generator */

let canv, col, col2, col3, col4, dec1, dec2, pos, n, size;
let factor, largest, r1, g1, b1, sF, seed;
let seedInput, saveButton, generateButton, instructionsLabel;
let palette1, palette2, alph;
let table;

function preload() {
  table = loadTable("colors.csv", "csv", "header");
}

function setup() {
  // Create the canvas for SVG generation
  canv = createCanvas(460, 3142, SVG);
  background(255); // White background to prevent blank screen

  // Ensure that the UI is created before generating the pattern
  createUI();

  // Call generatePattern to draw the initial pattern
  generatePattern();
}

function applySeed() {
  randomSeed(seed);
  noiseSeed(seed);
}

function generateRandomSeed() {
  let date = new Date();
  seed = date.getTime(); // Generate random seed based on the current time
  seedInput.value(seed); // Update the input field with the new random seed
}

function createUI() {
  // Remove any existing buttons or UI elements
  let existingElements = selectAll("input, button, label, p");
  existingElements.forEach(el => el.remove());

  // UI Instructions
  instructionsLabel = createP(
    "Instructions:<br>1. Enter a seed value or leave blank for random.<br>" +
    "2. Press 'Generate' to create the pattern.<br>" +
    "3. Press 'Save SVG' to save the current pattern.<br>" +
    "Note: Deleting the seed will generate a new random seed."
  );
  instructionsLabel.position(10, 40);

  // Seed input
  let seedLabel = createElement("label", "Seed: ");
  seedLabel.position(10, 10);
  seedInput = createInput(seed ? seed.toString() : "");
  seedInput.position(60, 10);

  // Generate Button
  generateButton = createButton("Generate");
  generateButton.position(250, 10);
  generateButton.mousePressed(() => {
    if (seedInput.value() === "") {
      // If the input is empty, generate a new random seed
      generateRandomSeed();
    } else {
      // If the seed is entered manually, use that seed
      seed = int(seedInput.value());
    }
    generatePattern(); // Regenerate the pattern with the new or provided seed
  });

  // Save Button
  saveButton = createButton("Save SVG");
  saveButton.position(350, 10);
  saveButton.mousePressed(() => saveArt()); // Save the canvas as SVG
}

function generatePattern() {
  // Clear the canvas
  clear();
  background(255); // White background

  // Check the seed input field and apply the logic
  if (!seedInput || seedInput.value() === "") {
    generateRandomSeed(); // Generate a random seed if no seed input
  } else {
    seed = int(seedInput.value()); // Use the manually entered seed
  }

  // Set the random seed for the canvas
  applySeed();

  factor = 0;

  let numb = floor(random(3, 20));
  size = width / numb;
  largest = floor(random(1, 10));
  alph = random(120, 220);
  if (random(15) < 1) {
    alph = 255;
  }
  noStroke();

  drawPattern();
}

function drawPattern() {
  let numPalettes = table.getRowCount();
  palette1 = floor(random(numPalettes));
  palette2 = floor(random(numPalettes));
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
  for (let i = width; i > -size * largest; i -= size) {
    for (let j = height; j > -size * largest; j -= size) {
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
  save(seed + "_p1_" + palette1 + "_p2_" + palette2 + ".svg");
}

function fract(x) {
  return x - floor(x);
}
