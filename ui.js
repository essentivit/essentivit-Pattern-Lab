/* File: ui.js */

let seedInput, saveButton, generateButton, instructionsLabel, patternSelect;

function createUI() {
  // Remove any existing buttons or UI elements
  let existingElements = selectAll("input, button, label, p, img");
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
  select('body').style('padding-top', '150px');

  // Add the EssentiVit logo to the UI
  let logo = createImg('https://essentivit.com/wp-content/uploads/2023/04/essentivit-logo-transparent.png', 'EssentiVit Logo');
  logo.style('width', '150px');  // Adjust logo size as necessary
  logo.style('display', 'block');
  logo.style('margin', '0 auto 20px auto');  // Center the logo with margin at the bottom
  logo.parent(uiContainer);  // Attach to UI container

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

  // Pattern selection container
  let patternContainer = createDiv().style('margin-bottom', '20px');
  patternContainer.parent(uiContainer);

  // Pattern Label and Dropdown
  let patternLabel = createElement("label", "Pattern: ");
  patternLabel.style('font-weight', 'bold');
  patternLabel.parent(patternContainer);

  patternSelect = createSelect();
  patternSelect.option('Essential Vitamin');
  // Future: Add option for Pet Supplement Pattern
  patternSelect.style('padding', '10px');
  patternSelect.style('margin-left', '10px');
  patternSelect.style('border-radius', '4px');
  patternSelect.style('border', '1px solid #ccc');
  patternSelect.parent(patternContainer);

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

    let selectedPattern = patternSelect.value();
    if (selectedPattern === 'Essential Vitamin') {
      window.generatePattern();  // Currently only supports the essential pattern
    }
    // Future: Add condition for Pet Supplement Pattern
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
  saveButton.mousePressed(() => window.saveArt());  // Function from sketch.js

  // Fetch and display version from version.json
  fetch('/version.json')
    .then(response => response.json())
    .then(data => {
      let versionLabel = createP(`Version: ${data.version}`);
      versionLabel.style('font-size', '14px');
      versionLabel.style('color', '#777');
      versionLabel.style('margin-top', '10px');
      versionLabel.style('font-weight', 'bold');
      versionLabel.parent(uiContainer);
    })
    .catch(err => {
      console.error('Error fetching version:', err);
    });
}

function generateRandomSeed() {
  let date = new Date();
  seed = date.getTime(); // Generate random seed based on the current time
  seedInput.value(seed); // Update the input field with the new random seed
}
