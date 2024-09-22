/* File: sketch.js */

/* The Essential Vitamin / essentiVit branding generator */

let canv, col, col2, col3, col4, dec1, dec2, pos, n, size;
let factor, largest, r1, g1, b1, sF, seed = 0; // Ensure seed is initialized
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
  createUI();  // Moved to ui.js

  // Call generatePattern to draw the initial pattern
  generatePattern();
}

function applySeed() {
  randomSeed(seed);
  noiseSeed(seed);
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

  // Generate palettes and pass them to the pattern function
  let numPalettes = table.getRowCount();
  palette1 = floor(random(numPalettes));
  palette2 = floor(random(numPalettes));

  // Call the function to draw the essential pattern, passing necessary parameters
  window.drawEssentialPattern(table, size, largest, alph, factor, palette1, palette2);
}

function saveArt() {
  save(seed + "_p1_" + palette1 + "_p2_" + palette2 + ".svg");
}

// Ensure global access to functions for ui.js
window.generatePattern = generatePattern;
window.saveArt = saveArt;
