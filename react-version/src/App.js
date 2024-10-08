// App.js
import React, { useState, useRef, useEffect } from 'react';
import SketchComponent from './SketchComponent';
import palettes from './palettes.json';

const canvasSizes = {
  '320ml': { width: 460, height: 3142 },
  '150ml': { width: 319, height: 1651 },
  // Add other sizes as needed
};

const App = () => {
  // State variables
  const [seed, setSeed] = useState(Date.now());
  const [seedInput, setSeedInput] = useState('');
  const [seedHistory, setSeedHistory] = useState([]);
  const [patternType, setPatternType] = useState('essential');
  const [canvasSize, setCanvasSize] = useState('320ml');
  const [palette1Index, setPalette1Index] = useState(0);
  const [palette2Index, setPalette2Index] = useState(1);
  const [configurations, setConfigurations] = useState([]);
  const [selectedConfigId, setSelectedConfigId] = useState('');

  const sketchRef = useRef();

  // Effect to load configurations from localStorage on mount
  useEffect(() => {
    const storedConfigs = localStorage.getItem('configurations');
    if (storedConfigs) {
      setConfigurations(JSON.parse(storedConfigs));
    }
  }, []);

  // Function to update seed history
  const updateSeedHistory = (newSeed) => {
    setSeedHistory((prevHistory) => {
      const updatedHistory = [newSeed, ...prevHistory];
      return updatedHistory.slice(0, 5); // Keep last 5 seeds
    });
  };

  // Handle Generate button click
  const handleGenerate = () => {
    let newSeed = seedInput ? parseInt(seedInput) : Date.now();
    if (!seedInput) {
      setSeedInput(newSeed.toString());
    }
    setSeed(newSeed);
    updateSeedHistory(newSeed);
  };

  // Handle Save SVG button click
  const handleSave = () => {
    if (sketchRef.current) {
      sketchRef.current.saveArt();
    }
  };

  // Handle Save Configuration
  const handleSaveConfiguration = () => {
    const description = prompt('Enter a description for this configuration:');
    if (!description || !description.trim()) {
      alert('Description cannot be empty.');
      return;
    }
    const newConfig = {
      id: Date.now(),
      seed,
      palette1Index,
      palette2Index,
      patternType,
      canvasSize,
      description: description.trim(),
      timestamp: new Date().toISOString(),
    };
    const updatedConfigs = [...configurations, newConfig];
    setConfigurations(updatedConfigs);
    localStorage.setItem('configurations', JSON.stringify(updatedConfigs));
    alert('Configuration saved successfully.');
  };

  // Handle Configuration Selection
  const handleConfigurationSelect = (e) => {
    const configId = e.target.value;
    setSelectedConfigId(configId);
    if (configId) {
      const config = configurations.find((c) => c.id.toString() === configId);
      if (config) {
        setSeed(config.seed);
        setSeedInput(config.seed.toString());
        setPatternType(config.patternType);
        setCanvasSize(config.canvasSize);
        setPalette1Index(config.palette1Index);
        setPalette2Index(config.palette2Index);
      }
    }
  };

  return (
    <div style={{ fontFamily: 'Roboto, sans-serif', backgroundColor: '#f0f2f5', padding: '20px' }}>
      {/* UI Container */}
      <div
        style={{
          backgroundColor: '#ffffff',
          padding: '30px',
          boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
          borderRadius: '12px',
          width: '100%',
          maxWidth: '500px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        {/* Logo */}
        <img
          src="https://essentivit.com/wp-content/uploads/2023/04/essentivit-logo-transparent.png"
          alt="EssentiVit Logo"
          style={{ width: '120px', margin: '0 auto 15px auto' }}
        />

        {/* Instructions */}
        <p style={{ fontSize: '16px', color: '#4a4a4a', lineHeight: '1.8', marginBottom: '25px' }}>
          Instructions:<br />
          1. Enter a seed value or leave blank for random.<br />
          Note: Deleting the seed will generate a new random seed.
        </p>

        {/* Seed Input */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: '600', fontSize: '14px' }}>Seed: </label>
          <input
            type="text"
            value={seedInput}
            onChange={(e) => setSeedInput(e.target.value)}
            style={{
              padding: '12px',
              marginLeft: '10px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              width: '80%',
            }}
          />
        </div>

        {/* Seed History Display */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: '600', fontSize: '14px' }}>Last 5 Seeds: </label>
          <pre
            style={{
              padding: '12px',
              marginLeft: '10px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              backgroundColor: '#f9f9f9',
              width: '80%',
              height: '100px',
              overflowY: 'auto',
              textAlign: 'left',
              fontFamily: 'monospace',
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
            }}
          >
            {seedHistory.join('\n')}
          </pre>
        </div>

        {/* Pattern Select */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: '600', fontSize: '14px' }}>Pattern: </label>
          <select
            value={patternType}
            onChange={(e) => setPatternType(e.target.value)}
            style={{
              padding: '12px',
              marginLeft: '10px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              width: '80%',
            }}
          >
            <option value="essential">Standard</option>
            <option value="pet">Pet</option>
          </select>
        </div>

        {/* Canvas Size Select */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: '600', fontSize: '14px' }}>Canvas Size: </label>
          <select
            value={canvasSize}
            onChange={(e) => setCanvasSize(e.target.value)}
            style={{
              padding: '12px',
              marginLeft: '10px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              width: '80%',
            }}
          >
            {Object.keys(canvasSizes).map((sizeLabel) => (
              <option key={sizeLabel} value={sizeLabel}>
                {sizeLabel}
              </option>
            ))}
          </select>
        </div>

        {/* Palette 1 Select */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: '600', fontSize: '14px' }}>Palette 1: </label>
          <select
            value={palette1Index}
            onChange={(e) => setPalette1Index(parseInt(e.target.value))}
            style={{
              padding: '12px',
              marginLeft: '10px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              width: '80%',
            }}
          >
            {palettes.palettes.map((palette, index) => (
              <option key={palette.id} value={index}>
                {palette.name}
              </option>
            ))}
          </select>
          {/* Palette 1 Swatches */}
          <div style={{ marginTop: '10px' }}>
            {palettes.palettes[palette1Index].colors.map((color, idx) => (
              <div
                key={idx}
                style={{
                  display: 'inline-block',
                  width: '20px',
                  height: '20px',
                  backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
                  marginRight: '5px',
                  border: '1px solid #ccc',
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Palette 2 Select */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: '600', fontSize: '14px' }}>Palette 2: </label>
          <select
            value={palette2Index}
            onChange={(e) => setPalette2Index(parseInt(e.target.value))}
            style={{
              padding: '12px',
              marginLeft: '10px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              width: '80%',
            }}
          >
            {palettes.palettes.map((palette, index) => (
              <option key={palette.id} value={index}>
                {palette.name}
              </option>
            ))}
          </select>
          {/* Palette 2 Swatches */}
          <div style={{ marginTop: '10px' }}>
            {palettes.palettes[palette2Index].colors.map((color, idx) => (
              <div
                key={idx}
                style={{
                  display: 'inline-block',
                  width: '20px',
                  height: '20px',
                  backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
                  marginRight: '5px',
                  border: '1px solid #ccc',
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Configuration Select */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: '600', fontSize: '14px' }}>Configuration: </label>
          <select
            value={selectedConfigId}
            onChange={handleConfigurationSelect}
            style={{
              padding: '12px',
              marginLeft: '10px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              width: '80%',
            }}
          >
            <option value="">Select a configuration</option>
            {configurations.map((config) => (
              <option key={config.id} value={config.id}>
                {`${config.description} (${config.id})`}
              </option>
            ))}
          </select>
        </div>

        {/* Save Configuration Button */}
        <button
          onClick={handleSaveConfiguration}
          style={{
            padding: '12px 30px',
            backgroundColor: '#FFA500',
            border: 'none',
            borderRadius: '6px',
            color: '#fff',
            fontWeight: '600',
            cursor: 'pointer',
            marginBottom: '20px',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#FF8C00')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#FFA500')}
        >
          Save Configuration
        </button>

        {/* Generate and Save Buttons */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            marginTop: '20px',
          }}
        >
          <button
            onClick={handleGenerate}
            style={{
              padding: '12px 30px',
              backgroundColor: '#4CAF50',
              border: 'none',
              borderRadius: '6px',
              color: '#fff',
              fontWeight: '600',
              cursor: 'pointer',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#45a049')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#4CAF50')}
          >
            Generate
          </button>
          <button
            onClick={handleSave}
            style={{
              padding: '12px 30px',
              backgroundColor: '#007BFF',
              border: 'none',
              borderRadius: '6px',
              color: '#fff',
              fontWeight: '600',
              cursor: 'pointer',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#007BFF')}
          >
            Save SVG
          </button>
        </div>
      </div>

      {/* Sketch Component */}
      <div style={{ marginTop: '220px' }}>
        {/* Adjust marginTop to offset the fixed UI container */}
        <SketchComponent
          ref={sketchRef}
          seed={seed}
          patternType={patternType}
          canvasSize={canvasSize}
          palette1Index={palette1Index}
          palette2Index={palette2Index}
        />
      </div>
    </div>
  );
};

export default App;
