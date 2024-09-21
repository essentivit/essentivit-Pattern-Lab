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

  // Add modern styles to body
  select('body').style('font-family', 'Roboto, sans-serif');
  select('body').style('background-color', '#f5f5f5');

  // UI Container
  let uiContainer = createDiv().id('ui-container');
  uiContainer.style('background-color', '#ffffff');
  uiContainer.style('padding', '20px');
  uiContainer.style('box-shadow', '0 4px 8px rgba(0, 0, 0, 0.1)');
  uiContainer.style('border-radius', '8px');
  uiContainer.style('width', '100%');
  uiContainer.style('max-width', '600px');
  uiContainer.style('margin', '0 auto');  // Center horizontally
  uiContainer.style('text-align', 'center');
  uiContainer.style('position', 'fixed'); // Keep the UI fixed at the top
  uiContainer.style('top', '0');          // Stick to the top of the page
  uiContainer.style('left', '0');
  uiContainer.style('right', '0');
  uiContainer.style('z-index', '1000');   // Ensure it's on top of other elements

  // Add some margin for the content below, so it doesn't overlap with the fixed UI
  select('body').style('padding-top', '100px');

  // UI Instructions
  instructionsLabel = createP(
    "Instructions:<br>1. Enter a seed value or leave blank for random.<br>" +
    "2. Press 'Generate' to create the pattern.<br>" +
    "3. Press 'Save SVG' to save the current pattern.<br>" +
    "Note: Deleting the seed will generate a new random seed."
  );
  instructionsLabel.style('font-size', '14px');
  instructionsLabel.style('color', '#333');
  instructionsLabel.style('line-height', '1.6');
  instructionsLabel.parent(uiContainer);

  // Seed input container
  let seedContainer = createDiv().style('margin-bottom', '20px');
  seedContainer.parent(uiContainer);

  // Seed Label and Input
  let seedLabel = createElement("label", "Seed: ");
  seedLabel.style('font-weight', 'bold');
  seedLabel.parent(seedContainer);
  
  seedInput = createInput(seed ? seed.toString() : "");
  seedInput.style('padding', '10px');
  seedInput.style('margin-left', '10px');
  seedInput.style('border-radius', '4px');
  seedInput.style('border', '1px solid #ccc');
  seedInput.parent(seedContainer);

  // Button container
  let buttonContainer = createDiv().style('display', 'flex').style('justify-content', 'center');
  buttonContainer.style('gap', '15px');
  buttonContainer.parent(uiContainer);

  // Generate Button
  generateButton = createButton("Generate");
  generateButton.style('padding', '10px 20px');
  generateButton.style('background-color', '#4CAF50');
  generateButton.style('border', 'none');
  generateButton.style('border-radius', '5px');
  generateButton.style('color', '#fff');
  generateButton.style('cursor', 'pointer');
  generateButton.style('transition', 'background-color 0.3s');
  generateButton.mouseOver(() => generateButton.style('background-color', '#45a049'));
  generateButton.mouseOut(() => generateButton.style('background-color', '#4CAF50'));
  generateButton.parent(buttonContainer);
  generateButton.mousePressed(() => {
    if (seedInput.value() === "") {
      generateRandomSeed();
    } else {
      seed = int(seedInput.value());
    }
    generatePattern();
  });

  // Save Button
  saveButton = createButton("Save SVG");
  saveButton.style('padding', '10px 20px');
  saveButton.style('background-color', '#007BFF');
  saveButton.style('border', 'none');
  saveButton.style('border-radius', '5px');
  saveButton.style('color', '#fff');
  saveButton.style('cursor', 'pointer');
  saveButton.style('transition', 'background-color 0.3s');
  saveButton.mouseOver(() => saveButton.style('background-color', '#0056b3'));
  saveButton.mouseOut(() => saveButton.style('background-color', '#007BFF'));
  saveButton.parent(buttonContainer);
  saveButton.mousePressed(() => saveArt());

  // Version label displayed under the buttons
  let versionLabel = createP("Version: v1.0.0");
  versionLabel.style('font-size', '14px');
  versionLabel.style('color', '#777');
  versionLabel.style('margin-top', '10px');
  versionLabel.style('font-weight', 'bold');
  versionLabel.parent(uiContainer);
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
