/* File: sketch.js */

/* The Essential Vitamin / essentiVit branding generator */

let canv, size, largest, seed = 0;
let palette1, palette2, alph;
let table;

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
  // Create the canvas for SVG generation
  canv = createCanvas(460, 3142, SVG);
  background(255); // White background to prevent blank screen

  // Ensure that the UI is created before generating the pattern
  createUI();  // Moved to ui.js

  // Call generatePattern to draw the initial pattern with default pattern type
  generatePattern('essential');
}

function applySeed() {
  randomSeed(seed);
  noiseSeed(seed);
}

function generatePattern(patternType) {
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

// Ensure global access to functions for ui.js
window.generatePattern = generatePattern;
window.saveArt = saveArt;
