/* File: ui.js */

// Object to hold UI elements
const UIElements = {
  seedInput: null,
  saveButton: null,
  generateButton: null,
  instructionsLabel: null,
  patternSelect: null,
  uiContainer: null,
  sizeSelect: null,
  configurationsSelect: null, // Added
  saveConfigButton: null,     // Added
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
  createSizeSelect(UIElements.uiContainer);
  createPaletteSelect(UIElements.uiContainer);   // Palette 1 dropdown
  createPalette2Select(UIElements.uiContainer);  // Palette 2 dropdown
  createConfigurationsSelect(UIElements.uiContainer); // Configuration dropdown
  createSaveConfigurationButton(UIElements.uiContainer); // Save configuration button
  createButtons(UIElements.uiContainer);
  fetchAndDisplayVersion(UIElements.uiContainer);

  // Display swatches for the initially selected palettes
  updatePaletteSwatch('palette1', UIElements.paletteSelect.value());
  updatePaletteSwatch('palette2', UIElements.palette2Select.value());
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
    "3. Select the canvas size.<br>" +
    "4. Press 'Generate' to create the pattern.<br>" +
    "5. Press 'Save SVG' to save the current pattern.<br>" +
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

// Function to create and style the size selection dropdown
function createSizeSelect(parent) {
  let sizeContainer = createDiv().style('margin-bottom', '20px');
  sizeContainer.parent(parent);

  let sizeLabel = createElement("label", "Canvas Size: ");
  sizeLabel.style('font-weight', '600');
  sizeLabel.style('font-size', '14px');
  sizeLabel.parent(sizeContainer);

  UIElements.sizeSelect = createSelect();
  UIElements.sizeSelect.style('padding', '12px');
  UIElements.sizeSelect.style('margin-left', '10px');
  UIElements.sizeSelect.style('border-radius', '6px');
  UIElements.sizeSelect.style('border', '1px solid #ccc');
  UIElements.sizeSelect.style('width', '80%');
  UIElements.sizeSelect.parent(sizeContainer);

  // Populate the dropdown options from the configuration object
  for (let sizeLabel in window.canvasSizes) {
    UIElements.sizeSelect.option(sizeLabel);
  }
}

// Function to create and style the palette selection dropdown with swatches
function createPaletteSelect(parent) {
  let paletteContainer = createDiv().style('margin-bottom', '20px');
  paletteContainer.parent(parent);

  let paletteLabel = createElement("label", "Palette 1: ");
  paletteLabel.style('font-weight', '600');
  paletteLabel.style('font-size', '14px');
  paletteLabel.parent(paletteContainer);

  UIElements.paletteSelect = createSelect();
  UIElements.paletteSelect.style('padding', '12px');
  UIElements.paletteSelect.style('margin-left', '10px');
  UIElements.paletteSelect.style('border-radius', '6px');
  UIElements.paletteSelect.style('border', '1px solid #ccc');
  UIElements.paletteSelect.style('width', '80%');
  UIElements.paletteSelect.parent(paletteContainer);

  // Create a div to hold the colour swatches
  UIElements.palette1SwatchContainer = createDiv().style('margin-top', '10px');
  UIElements.palette1SwatchContainer.parent(paletteContainer);

  // Populate the dropdown options from the palettes JSON
  for (let palette of palettes.palettes) {
    UIElements.paletteSelect.option(palette.name);
  }

  // Add an event listener to update swatches when palette is selected
  UIElements.paletteSelect.changed(() => updatePaletteSwatch('palette1', UIElements.paletteSelect.value()));
}

// Function to create and style the second palette selection dropdown with swatches
function createPalette2Select(parent) {
  let palette2Container = createDiv().style('margin-bottom', '20px');
  palette2Container.parent(parent);

  let palette2Label = createElement("label", "Palette 2: ");
  palette2Label.style('font-weight', '600');
  palette2Label.style('font-size', '14px');
  palette2Label.parent(palette2Container);

  UIElements.palette2Select = createSelect();
  UIElements.palette2Select.style('padding', '12px');
  UIElements.palette2Select.style('margin-left', '10px');
  UIElements.palette2Select.style('border-radius', '6px');
  UIElements.palette2Select.style('border', '1px solid #ccc');
  UIElements.palette2Select.style('width', '80%');
  UIElements.palette2Select.parent(palette2Container);

  // Create a div to hold the colour swatches
  UIElements.palette2SwatchContainer = createDiv().style('margin-top', '10px');
  UIElements.palette2SwatchContainer.parent(palette2Container);

  // Populate the dropdown options from the palettes JSON
  for (let palette of palettes.palettes) {
    UIElements.palette2Select.option(palette.name);
  }

  // Add an event listener to update swatches when palette is selected
  UIElements.palette2Select.changed(() => updatePaletteSwatch('palette2', UIElements.palette2Select.value()));
}

// Function to update the colour swatches when a palette is selected
function updatePaletteSwatch(paletteType, selectedPaletteName) {
  let selectedPalette = palettes.palettes.find(p => p.name === selectedPaletteName);
  let swatchContainer = (paletteType === 'palette1') ? UIElements.palette1SwatchContainer : UIElements.palette2SwatchContainer;

  // Clear any existing swatches
  swatchContainer.html('');

  // Create and append colour swatches
  selectedPalette.colors.forEach(color => {
    let swatch = createDiv().style('display', 'inline-block')
                           .style('width', '20px')
                           .style('height', '20px')
                           .style('background-color', `rgb(${color[0]}, ${color[1]}, ${color[2]})`)
                           .style('margin-right', '5px')
                           .style('border', '1px solid #ccc');
    swatch.parent(swatchContainer);
  });
}

// Function to create and style the configuration selection dropdown
function createConfigurationsSelect(parent) {
  let configContainer = createDiv().style('margin-bottom', '20px');
  configContainer.parent(parent);

  let configLabel = createElement("label", "Configuration: ");
  configLabel.style('font-weight', '600');
  configLabel.style('font-size', '14px');
  configLabel.parent(configContainer);

  UIElements.configurationsSelect = createSelect();
  UIElements.configurationsSelect.style('padding', '12px');
  UIElements.configurationsSelect.style('margin-left', '10px');
  UIElements.configurationsSelect.style('border-radius', '6px');
  UIElements.configurationsSelect.style('border', '1px solid #ccc');
  UIElements.configurationsSelect.style('width', '80%');
  UIElements.configurationsSelect.parent(configContainer);

  // Add default option
  UIElements.configurationsSelect.option('Select a configuration', '');

  // Populate the configurations dropdown
  updateConfigurationsDropdown();

  // Event listener for configuration selection
  UIElements.configurationsSelect.changed(() => {
    let selectedConfigId = UIElements.configurationsSelect.value();
    if (selectedConfigId) {
      loadConfiguration(selectedConfigId);
    }
  });
}

// Function to update the configurations dropdown
function updateConfigurationsDropdown() {
  // Clear existing options
  UIElements.configurationsSelect.html('');
  // Add default option
  UIElements.configurationsSelect.option('Select a configuration', '');

  if (window.configurations && window.configurations.configurations.length > 0) {
    for (let config of window.configurations.configurations) {
      let optionLabel = `${config.description} (${config.id})`;
      UIElements.configurationsSelect.option(optionLabel, config.id);
    }
    UIElements.configurationsSelect.removeAttribute('disabled');
  } else {
    UIElements.configurationsSelect.attribute('disabled', true);
  }
}

// Function to create and style the 'Save Configuration' button
function createSaveConfigurationButton(parent) {
  UIElements.saveConfigButton = createButton("Save Configuration");
  UIElements.saveConfigButton.style('padding', '12px 30px');
  UIElements.saveConfigButton.style('background-color', '#FFA500'); // Orange color
  UIElements.saveConfigButton.style('border', 'none');
  UIElements.saveConfigButton.style('border-radius', '6px');
  UIElements.saveConfigButton.style('color', '#fff');
  UIElements.saveConfigButton.style('font-weight', '600');
  UIElements.saveConfigButton.style('cursor', 'pointer');
  UIElements.saveConfigButton.style('transition', 'background-color 0.3s ease');
  UIElements.saveConfigButton.mouseOver(() =>
    UIElements.saveConfigButton.style('background-color', '#FF8C00')
  );
  UIElements.saveConfigButton.mouseOut(() =>
    UIElements.saveConfigButton.style('background-color', '#FFA500')
  );
  UIElements.saveConfigButton.parent(parent);
  UIElements.saveConfigButton.mousePressed(() => handleSaveConfiguration());
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

// Function to handle saving a configuration
function handleSaveConfiguration() {
  // Prompt the user for a description
  let description = prompt("Enter a description for this configuration:");
  if (description === null || description.trim() === "") {
    alert("Description cannot be empty.");
    return;
  }

  // Collect current settings
  let newConfig = {
    id: generateUniqueId(),
    seed: parseInt(UIElements.seedInput.value()),
    palette1: UIElements.paletteSelect.value(),
    palette2: UIElements.palette2Select.value(),
    patternType: UIElements.patternSelect.value() === 'Pet' ? 'pet' : 'essential',
    canvasSize: UIElements.sizeSelect.value(),
    timestamp: new Date().toISOString(),
    description: description.trim()
  };

  // Add to configurations
  if (!window.configurations) window.configurations = { configurations: [] };
  window.configurations.configurations.push(newConfig);

  // Update configurations in localStorage
  localStorage.setItem('configurations', JSON.stringify(window.configurations));

  // Update configurations dropdown
  updateConfigurationsDropdown();

  alert('Configuration saved successfully.');
}

// Function to generate a unique ID for the configuration
function generateUniqueId() {
  return 'config' + Date.now();
}

// Function to load the selected configuration
function loadConfiguration(configId) {
  let config = window.configurations.configurations.find(c => c.id === configId);
  if (config) {
    // Update UI elements
    UIElements.seedInput.value(config.seed.toString());
    UIElements.paletteSelect.value(config.palette1);
    UIElements.palette2Select.value(config.palette2);
    UIElements.patternSelect.value(config.patternType === 'pet' ? 'Pet' : 'Standard');
    UIElements.sizeSelect.value(config.canvasSize);

    // Update swatches
    updatePaletteSwatch('palette1', UIElements.paletteSelect.value());
    updatePaletteSwatch('palette2', UIElements.palette2Select.value());
  } else {
    console.error(`Configuration with id ${configId} not found.`);
  }
}

// Event handler for the generate button
function handleGenerateButtonPress() {
  if (UIElements.seedInput.value() === "") {
    window.generateRandomSeed();
  } else {
    seed = int(UIElements.seedInput.value());
  }

  let selectedPattern = UIElements.patternSelect.value();
  let selectedSize = UIElements.sizeSelect.value();

  // Pass selectedSize to generatePattern
  if (selectedPattern === 'Standard') {
    window.generatePattern('essential', selectedSize);
  } else if (selectedPattern === 'Pet') {
    window.generatePattern('pet', selectedSize);
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

// Expose UIElements and necessary functions globally
window.UIElements = UIElements;
window.updateConfigurationsDropdown = updateConfigurationsDropdown;
