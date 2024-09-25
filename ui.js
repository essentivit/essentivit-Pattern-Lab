/* File: ui.js */

// Object to hold UI elements
const UIElements = {
  seedInput: null,
  saveButton: null,
  generateButton: null,
  instructionsLabel: null,
  patternSelect: null,
  uiContainer: null,
};

// Main function to create the UI
function createUI() {
  removeExistingElements();
  styleBody();
  UIElements.uiContainer = createUIContainer();
  adjustBodyPadding();
  createLogo(UIElements.uiContainer);
  createInstructions(UIElements.uiContainer);
  createSeedInput(UIElements.uiContainer);
  createPatternSelect(UIElements.uiContainer);
  createButtons(UIElements.uiContainer);
  fetchAndDisplayVersion(UIElements.uiContainer);
}

// Function to remove existing UI elements
function removeExistingElements() {
  let existingElements = selectAll("input, button, label, p, img");
  existingElements.forEach(el => el.remove());
}

// Function to style the body element
function styleBody() {
  select('body').style('font-family', 'Roboto, sans-serif');
  select('body').style('background-color', '#f0f2f5');
}

// Function to create the main UI container
function createUIContainer() {
  let uiContainer = createDiv().id('ui-container');
  uiContainer.style('background-color', '#ffffff');
  uiContainer.style('padding', '30px');
  uiContainer.style('box-shadow', '0 6px 15px rgba(0, 0, 0, 0.1)');
  uiContainer.style('border-radius', '12px');
  uiContainer.style('width', '100%');
  uiContainer.style('max-width', '500px');
  uiContainer.style('margin', '0 auto');
  uiContainer.style('text-align', 'center');
  uiContainer.style('position', 'fixed');
  uiContainer.style('top', '0');
  uiContainer.style('left', '0');
  uiContainer.style('right', '0');
  uiContainer.style('z-index', '1000');
  return uiContainer;
}

// Function to adjust body padding to accommodate the fixed UI
function adjustBodyPadding() {
  select('body').style('padding-top', '200px');
}

// Function to create and style the logo
function createLogo(parent) {
  let logo = createImg(
    'https://essentivit.com/wp-content/uploads/2023/04/essentivit-logo-transparent.png',
    'EssentiVit Logo'
  );
  logo.style('width', '120px');
  logo.style('display', 'block');
  logo.style('margin', '0 auto 15px auto');
  logo.parent(parent);
}

// Function to create and style the instructions label
function createInstructions(parent) {
  UIElements.instructionsLabel = createP(
    "Instructions:<br>1. Enter a seed value or leave blank for random.<br>" +
    "2. Select a pattern from the dropdown.<br>" +
    "3. Press 'Generate' to create the pattern.<br>" +
    "4. Press 'Save SVG' to save the current pattern.<br>" +
    "Note: Deleting the seed will generate a new random seed."
  );
  UIElements.instructionsLabel.style('font-size', '16px');
  UIElements.instructionsLabel.style('color', '#4a4a4a');
  UIElements.instructionsLabel.style('line-height', '1.8');
  UIElements.instructionsLabel.style('margin-bottom', '25px');
  UIElements.instructionsLabel.parent(parent);
}

// Function to create and style the seed input field
function createSeedInput(parent) {
  let seedContainer = createDiv().style('margin-bottom', '20px');
  seedContainer.parent(parent);

  let seedLabel = createElement("label", "Seed: ");
  seedLabel.style('font-weight', '600');
  seedLabel.style('font-size', '14px');
  seedLabel.parent(seedContainer);

  UIElements.seedInput = createInput(seed ? seed.toString() : "");
  UIElements.seedInput.style('padding', '12px');
  UIElements.seedInput.style('margin-left', '10px');
  UIElements.seedInput.style('border-radius', '6px');
  UIElements.seedInput.style('border', '1px solid #ccc');
  UIElements.seedInput.style('width', '80%');
  UIElements.seedInput.parent(seedContainer);
}

// Function to create and style the pattern selection dropdown
function createPatternSelect(parent) {
  let patternContainer = createDiv().style('margin-bottom', '20px');
  patternContainer.parent(parent);

  let patternLabel = createElement("label", "Pattern: ");
  patternLabel.style('font-weight', '600');
  patternLabel.style('font-size', '14px');
  patternLabel.parent(patternContainer);

  UIElements.patternSelect = createSelect();
  UIElements.patternSelect.option('Standard');
  UIElements.patternSelect.option('Pet');
  UIElements.patternSelect.style('padding', '12px');
  UIElements.patternSelect.style('margin-left', '10px');
  UIElements.patternSelect.style('border-radius', '6px');
  UIElements.patternSelect.style('border', '1px solid #ccc');
  UIElements.patternSelect.style('width', '80%');
  UIElements.patternSelect.parent(patternContainer);
}

// Function to create and style the generate and save buttons
function createButtons(parent) {
  let buttonContainer = createDiv()
    .style('display', 'flex')
    .style('justify-content', 'center');
  buttonContainer.style('gap', '20px');
  buttonContainer.style('margin-top', '20px');
  buttonContainer.parent(parent);

  // Generate Button
  UIElements.generateButton = createButton("Generate");
  UIElements.generateButton.style('padding', '12px 30px');
  UIElements.generateButton.style('background-color', '#4CAF50');
  UIElements.generateButton.style('border', 'none');
  UIElements.generateButton.style('border-radius', '6px');
  UIElements.generateButton.style('color', '#fff');
  UIElements.generateButton.style('font-weight', '600');
  UIElements.generateButton.style('cursor', 'pointer');
  UIElements.generateButton.style('transition', 'background-color 0.3s ease');
  UIElements.generateButton.mouseOver(() =>
    UIElements.generateButton.style('background-color', '#45a049')
  );
  UIElements.generateButton.mouseOut(() =>
    UIElements.generateButton.style('background-color', '#4CAF50')
  );
  UIElements.generateButton.parent(buttonContainer);
  UIElements.generateButton.mousePressed(handleGenerateButtonPress);

  // Save Button
  UIElements.saveButton = createButton("Save SVG");
  UIElements.saveButton.style('padding', '12px 30px');
  UIElements.saveButton.style('background-color', '#007BFF');
  UIElements.saveButton.style('border', 'none');
  UIElements.saveButton.style('border-radius', '6px');
  UIElements.saveButton.style('color', '#fff');
  UIElements.saveButton.style('font-weight', '600');
  UIElements.saveButton.style('cursor', 'pointer');
  UIElements.saveButton.style('transition', 'background-color 0.3s ease');
  UIElements.saveButton.mouseOver(() =>
    UIElements.saveButton.style('background-color', '#0056b3')
  );
  UIElements.saveButton.mouseOut(() =>
    UIElements.saveButton.style('background-color', '#007BFF')
  );
  UIElements.saveButton.parent(buttonContainer);
  UIElements.saveButton.mousePressed(() => window.saveArt());
}

// Event handler for the generate button
function handleGenerateButtonPress() {
  if (UIElements.seedInput.value() === "") {
    window.generateRandomSeed();
  } else {
    seed = int(UIElements.seedInput.value());
  }

  let selectedPattern = UIElements.patternSelect.value();
  if (selectedPattern === 'Standard') {
    window.generatePattern('essential');
  } else if (selectedPattern === 'Pet') {
    window.generatePattern('pet');
  }
}

// Function to fetch and display the version information
function fetchAndDisplayVersion(parent) {
  fetch('/version.json')
    .then(response => response.json())
    .then(data => {
      let versionLabel = createP(`Version: ${data.version}`);
      versionLabel.style('font-size', '14px');
      versionLabel.style('color', '#777');
      versionLabel.style('margin-top', '10px');
      versionLabel.style('font-weight', 'bold');
      versionLabel.parent(parent);
    })
    .catch(err => {
      console.error('Error fetching version:', err);
    });
}

// Expose UIElements globally
window.UIElements = UIElements;
