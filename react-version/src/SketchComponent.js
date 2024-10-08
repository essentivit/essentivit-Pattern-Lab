// SketchComponent.js
import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import p5 from 'p5';
import palettes from './palettes.json';
import { drawEssentialPattern, drawPetPattern } from './patterns';

const canvasSizes = {
  '320ml': { width: 460, height: 3142 },
  '150ml': { width: 319, height: 1651 },
  // Add other sizes as needed
};

const SketchComponent = forwardRef(
  (
    { seed, patternType, canvasSize, palette1Index, palette2Index },
    ref
  ) => {
    const sketchRef = useRef();
    const p5InstanceRef = useRef();

    useEffect(() => {
      const Sketch = (s) => {
        s.setup = () => {
          const { width, height } = canvasSizes[canvasSize];
          s.createCanvas(width, height, s.SVG);
          s.noLoop();
          s.randomSeed(seed);
          s.noiseSeed(seed);

          let size = 20; // Adjust as needed
          let largest = 5; // Adjust as needed
          let alph = 255; // Adjust as needed
          let factor = 0;  // Adjust as needed

          s.clear();

          if (patternType === 'essential') {
            drawEssentialPattern(
              s,
              palettes,
              size,
              largest,
              alph,
              factor,
              palette1Index,
              palette2Index
            );
          } else if (patternType === 'pet') {
            drawPetPattern(
              s,
              palettes,
              size,
              largest,
              alph,
              factor,
              palette1Index,
              palette2Index
            );
          }
        };

        s.draw = () => {
          // Drawing is handled in setup
        };
      };

      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
      }

      p5InstanceRef.current = new p5(Sketch, sketchRef.current);

      return () => {
        if (p5InstanceRef.current) {
          p5InstanceRef.current.remove();
        }
      };
    }, [seed, patternType, canvasSize, palette1Index, palette2Index]);

    useImperativeHandle(ref, () => ({
      saveArt: () => {
        if (p5InstanceRef.current) {
          p5InstanceRef.current.save('artwork.svg');
        }
      },
    }));

    return <div ref={sketchRef}></div>;
  }
);

export default SketchComponent;
