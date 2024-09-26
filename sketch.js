/* File: sketch.js */

/* The Essential Vitamin / essentiVit branding generator */

let canv, size, largest, seed = 0;
let palette1, palette2, alph;

let palettes; // This will store the palettes from JSON
let configurations = { configurations: [] }; // Added variable to store configurations

function preload() {
  // Load the palettes JSON file
  palettes = loadJSON("palettes.json", () => {
    console.log("palettes.json loaded successfully");
  }, (err) => {
    console.error("Error loading palettes.json:", err);
  });
}

function setup() {
  // Load configurations from localStorage first
  loadConfigurations(); // New function to load configurations

  // Create the canvas with a default size (we'll adjust it later)
  let defaultSize = '320ml';
  let dimensions = window.canvasSizes[defaultSize];
  canv = createCanvas(dimensions.width, dimensions.height, SVG);
  background(255); // White background to prevent blank screen

  // Ensure that the UI is created before generating the pattern
  createUI(); // Defined in ui.js

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
  let numb = floor(random(3,6)); // Default: let numb = floor(random(3, 20));
  size = width / numb;
  largest = floor(random(1, 3)); // Default: largest = floor(random(1, 10));
  alph = random(120, 220);
  if (random(15) < 1) {
    alph = 255;
  }
  noStroke();

  // Get the selected palette names from the UI dropdowns
  let selectedPalette1Name = UIElements.paletteSelect.value();
  let selectedPalette2Name = UIElements.palette2Select.value();

  // Find the selected palettes by name from the palettes JSON
  let palette1Index = palettes.palettes.findIndex(p => p.name === selectedPalette1Name);
  let palette2Index = palettes.palettes.findIndex(p => p.name === selectedPalette2Name);

  // Set palette1 and palette2 as global variables for saving later
  palette1 = selectedPalette1Name;
  palette2 = selectedPalette2Name;

  // Call the appropriate pattern function based on the selected pattern type
  if (patternType === 'essential') {
    if (typeof window.drawEssentialPattern === 'function') {
      window.drawEssentialPattern(palettes, size, largest, alph, factor, palette1Index, palette2Index);
    } else {
      console.error('drawEssentialPattern is not a function');
    }
  } else if (patternType === 'pet') {
    if (typeof window.drawPetPattern === 'function') {
      window.drawPetPattern(palettes, size, largest, alph, factor, palette1Index, palette2Index);
    } else {
      console.error('drawPetPattern is not a function');
    }
  }
}

function saveArt() {
  // Ensure palette1 and palette2 are valid strings before saving
  let palette1Str = palette1 ? palette1 : 'undefined';
  let palette2Str = palette2 ? palette2 : 'undefined';

  // Save the artwork with the seed and palette names
  save(seed + "_p1_" + palette1Str + "_p2_" + palette2Str + ".svg");
}

// Function to generate a random seed
function generateRandomSeed() {
  let date = new Date();
  seed = date.getTime(); // Generate random seed based on the current time

  // Update the seed input field if it exists
  if (window.UIElements && window.UIElements.seedInput) {
    window.UIElements.seedInput.value(seed);
  }
}

// Load configurations from localStorage
function loadConfigurations() {
  let configsJSON = localStorage.getItem('configurations');
  if (configsJSON) {
    configurations = JSON.parse(configsJSON);
  } else {
    configurations = { configurations: [] };
  }
  // Expose configurations globally
  window.configurations = configurations;
}

// Ensure global access to functions for ui.js
window.generatePattern = generatePattern;
window.saveArt = saveArt;
window.generateRandomSeed = generateRandomSeed;
window.configurations = configurations; // Expose configurations
