/* File: sketch.js */

/* The Essential Vitamin / essentiVit branding generator */

let canv, size, largest, seed = 0;
let palette1, palette2, alph;

let palettes; // This will store the palettes from JSON

function preload() {
  // Load the palettes JSON file instead of the CSV
  palettes = loadJSON("palettes.json", () => {
    console.log("palettes.json loaded successfully");
  }, (err) => {
    console.error("Error loading palettes.json:", err);
  });
}

function setup() {
  // Create the canvas with a default size (we'll adjust it later)
  let defaultSize = '320ml';
  let dimensions = window.canvasSizes[defaultSize];
  canv = createCanvas(dimensions.width, dimensions.height, SVG);
  background(255); // White background to prevent blank screen

  // Ensure that the UI is created before generating the pattern
  createUI();  // Defined in ui.js

  // Generate a random seed and update the seed input field
  generateRandomSeed();

  // Call generatePattern to draw the initial pattern with default pattern type and size
  generatePattern('essential', defaultSize);
}

function applySeed() {
  randomSeed(seed);
  noiseSeed(seed);
}

function generatePattern(patternType, canvasSize) {
  // Get the dimensions from the configuration object
  let dimensions = window.canvasSizes[canvasSize];
  if (!dimensions) {
    console.error(`Canvas size '${canvasSize}' not found in configuration.`);
    return;
  }

  // Resize the canvas based on the selected size
  resizeCanvas(dimensions.width, dimensions.height);

  // Clear the canvas
  clear();
  background(255); // White background

  // Set the random seed for the canvas
  applySeed();

  let factor = 0;
  let numb = floor(random(3, 20));
  size = width / numb;
  largest = floor(random(1, 10));
  alph = random(120, 220);
  if (random(15) < 1) {
    alph = 255;
  }
  noStroke();

  // Get the number of palettes in the JSON
  let numPalettes = palettes.palettes.length;
  
  // Randomly select two palettes from the JSON data
  palette1 = floor(random(numPalettes));
  palette2 = floor(random(numPalettes));

  // Call the appropriate pattern function based on the selected pattern type
  if (patternType === 'essential') {
    if (typeof window.drawEssentialPattern === 'function') {
      window.drawEssentialPattern(palettes, size, largest, alph, factor, palette1, palette2);
    } else {
      console.error('drawEssentialPattern is not a function');
    }
  } else if (patternType === 'pet') {
    if (typeof window.drawPetPattern === 'function') {
      window.drawPetPattern(palettes, size, largest, alph, factor, palette1, palette2);
    } else {
      console.error('drawPetPattern is not a function');
    }
  }
}

function saveArt() {
  save(seed + "_p1_" + palette1 + "_p2_" + palette2 + ".svg");
}

// Moved generateRandomSeed to sketch.js and exposed it globally
function generateRandomSeed() {
  let date = new Date();
  seed = date.getTime(); // Generate random seed based on the current time

  // Update the seed input field if it exists
  if (window.UIElements && window.UIElements.seedInput) {
    window.UIElements.seedInput.value(seed);
  }
}

// Ensure global access to functions for ui.js
window.generatePattern = generatePattern;
window.saveArt = saveArt;
window.generateRandomSeed = generateRandomSeed;
